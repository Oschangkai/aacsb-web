import { Inject, Injectable, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import jwtDecode from 'jwt-decode';
import * as store from 'store';

import { environment } from '@environment/environment';

import { User } from '@model/User.model';
import { ApplicationToken } from '@model/ApplicationToken.model';
import { ApplicationClaimTypes } from '@model/ApplicationClaimTypes.enum';

const accountUrl = `${environment.api}/Account`;

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
    @Inject(DOCUMENT) private document: Document
  ) {
    this.currentUserSubject$
      .pipe(takeUntil(this.destroy$))
      .subscribe(u => {
        this.currentPermissionSubject$.next(this.getPermission());
        if (u && u.token) {
          this.isLoginSubject$.next(true);
        }
      });
  }

  private destroy$: Subject<void> = new Subject<void>();

  private currentUserSubject$ = new BehaviorSubject<User>(this.getUser() ?? new User());
  private currentPermissionSubject$ = new BehaviorSubject<string[]>(this.getPermission() ?? []);
  private isLoginSubject$ = new BehaviorSubject<boolean>(this.hasValidToken());

  public currentUser = this.currentUserSubject$.asObservable().pipe(distinctUntilChanged());
  public currentPermission = this.currentPermissionSubject$.asObservable().pipe(distinctUntilChanged());
  public isLoggedIn = this.isLoginSubject$.asObservable().pipe(distinctUntilChanged());

  private hasValidToken(): boolean {
    return this.getUser() && this.getUser().expiredOn > (new Date().getTime() / 1000);
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

    return Array.isArray(permission) ? permission : [permission];
  }

  logout(): void {
    const clearLocal = () => {
      store.clearAll();
      this.isLoginSubject$.next(false);
    };

    if (this.hasValidToken()) {
      this.http.post(`${accountUrl}/logout`, {}, {
        params: new HttpParams()
          .append('token', this.getUser().refreshToken)
      }).subscribe(clearLocal);
    } else {
      clearLocal();
    }
  }

  signInWithMicrosoft(returnUrl?: string): void {
    // https://stackoverflow.com/questions/54694466/google-login-in-angular-7-with-net-core-api
    let url = `${accountUrl}/login/microsoft?returnUrl=${this.document.location.origin}/login?`;
    if (returnUrl) {
      url += `path=${returnUrl}`;
    } else {
      url += 'path=';
    }
    this.document.location.href = url;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
