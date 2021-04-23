import {Inject, Injectable, OnDestroy} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

import jwtDecode from 'jwt-decode';
import * as store from 'store';

import {environment} from '@environment/environment';
import {User} from '@model/User.model';
import {distinctUntilChanged} from 'rxjs/operators';
import {ApplicationToken} from '@model/ApplicationToken.model';


const baseUrl = environment.api;
const ACCOUNT = 'Account';
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
    this.subscriptions.push(
      this.currentUserSubject$.subscribe(u => {
        this.currentPermissionSubject$.next(this.getPermission());
        if (u && u.token) {
          this.isLoginSubject$.next(true);
        }
      })
    );
  }

  private subscriptions: Subscription[] = [];

  private currentUserSubject$ = new BehaviorSubject<User>(this.getUser() ?? new User());
  private currentPermissionSubject$ = new BehaviorSubject<string[]>(this.getPermission() ?? []);
  private isLoginSubject$ = new BehaviorSubject<boolean>(this.hasToken());

  public currentUser = this.currentUserSubject$.asObservable().pipe(distinctUntilChanged());
  public currentPermission = this.currentPermissionSubject$.asObservable().pipe(distinctUntilChanged());
  public isLoggedIn = this.isLoginSubject$.asObservable().pipe(distinctUntilChanged());

  private hasToken(): boolean {
    console.log(`hasToken: ${!!this.getUser()}`);
    return !!this.getUser();
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
    const tokenDecoded = jwtDecode<ApplicationToken>(token);

    return tokenDecoded['MAYOBoardroom.Permission'];
  }

  logout(): void {
    store.clearAll();
    this.isLoginSubject$.next(false);
  }

  signInWithMicrosoft(returnUrl?: string): void {
    // https://stackoverflow.com/questions/54694466/google-login-in-angular-7-with-net-core-api
    let url = `${baseUrl}/${ACCOUNT}/login/microsoft?returnUrl=${this.document.location.origin}/login?`;
    if (returnUrl) {
      url += `path=${returnUrl}`;
    } else {
      url += 'path=';
    }
    this.document.location.href = url;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
