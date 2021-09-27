import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

import jwtDecode from 'jwt-decode';
import * as store from 'store';

import { User } from '@model/User.model';
import { ApplicationToken } from '@model/ApplicationToken.model';
import { ApplicationClaimTypes } from '@model/ApplicationClaimTypes.enum';
import { SimpleResponse } from '@model/response.model';
import { AuthenticateInformation } from '@model/query.response.model';
import { TokenExchangeTypes } from '@model/TokenExchangeTypes.enum';
import { EnvironmentService } from '@service/environment.service';

/**
 * This service was created for:
 *  - handing user state
 *  - control user permissions
 *  - caching user info, type, roles
 *  - etc...
 * @public
 */
@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  constructor(
    private http: HttpClient,
    private router: Router,
    private environment: EnvironmentService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.currentUserSubject$
      .pipe(takeUntil(this.destroy$))
      .subscribe(u => {
        this.currentPermissionSubject$.next(this.getPermission());
        if (u && u.token) {
          this.isLoginSubject$.next(this.hasValidToken());
        }
      });
  }

  accountUrl = `${this.environment.api}/Account`;

  private destroy$: Subject<void> = new Subject<void>();

  private currentUserSubject$ = new BehaviorSubject<User>(this.getUser() ?? new User());
  private currentPermissionSubject$ = new BehaviorSubject<string[]>(this.getPermission() ?? []);
  private isLoginSubject$ = new BehaviorSubject<boolean>(this.hasValidToken());

  public currentUser = this.currentUserSubject$.asObservable().pipe(distinctUntilChanged());
  public currentPermission = this.currentPermissionSubject$.asObservable().pipe(distinctUntilChanged());
  public isLoggedIn = this.isLoginSubject$.asObservable().pipe(distinctUntilChanged());

  private hasValidToken(): boolean {
    return !!this.getUser() &&
      !!this.getUser().token &&
      !!this.getUser().refreshToken &&
      this.getUser().expiredOn > (new Date().getTime() / 1000);
  }

  private getUser(): User {
    return store.get('user');
  }
  setUser(user: User): void {
    store.set('user', user);
    this.currentUserSubject$.next(user);
  }

  private getPermission(): string[] {
    if (!this.getUser()) { return []; }

    const token = this.getUser().token;
    const permission = jwtDecode<ApplicationToken>(token)[ApplicationClaimTypes.Permission];

    if (Array.isArray(permission)) {
      return permission;
    } else if (!permission) {
      return [];
    } else {
      return [permission];
    }
  }

  refreshToken(): Observable<SimpleResponse<AuthenticateInformation>> {
    const body = {
      type: TokenExchangeTypes.RefreshToken,
      token: this.getUser()?.refreshToken
    };
    return this.http
      .post<SimpleResponse<AuthenticateInformation>>(`${this.accountUrl}/token`, { ...body })
      .pipe(
        tap(response => {
          const authInfo = response && response.data;
          if (!authInfo) { return; }
          this.setUser(new User({
            id: authInfo.id,
            username: authInfo.userName,
            email: authInfo.email,
            token: authInfo.jwToken,
            refreshToken: authInfo.refreshToken,
            expiredOn: authInfo.expireOn
          }));
        })
      );
  }

  logout(): void {
    const clearLocal = () => {
      store.clearAll();
      this.isLoginSubject$.next(false);
    };

    if (this.hasValidToken()) {
      this.http.post(`${this.accountUrl}/logout`, {}, {
        params: new HttpParams()
          .append('token', this.getUser().refreshToken)
      }).subscribe(clearLocal);
    } else {
      clearLocal();
    }
  }

  signInWithMicrosoft(returnUrl?: string): void {
    // https://stackoverflow.com/questions/54694466/google-login-in-angular-7-with-net-core-api
    let url = `${this.accountUrl}/login/microsoft?returnUrl=${this.document.location.origin}/login?`;
    if (returnUrl) {
      url += `path=${returnUrl}`;
    } else {
      url += 'path=';
    }
    this.document.location.href = url;
  }

  deleteAllCookies(): void {
    const cookies = document.cookie.split(';');

    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
