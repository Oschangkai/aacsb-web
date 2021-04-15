import {Inject, Injectable} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import * as store from 'store';

import {environment} from '@environment/environment';
import {User} from '@model/User.model';


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
export class UserService {

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document) { }

  getToken(): string {
    return store.get('user.token');
  }
  setToken(token: any): void {
    store.set('user.token', token);
  }

  getId(): string {
    return store.get('user.id');
  }
  setId(id: string): void {
    store.set('user.id', id);
  }

  getUsername(): string {
    return store.get('user.username');
  }
  setUsername(username: string): void {
    store.set('user.username', username);
  }

  getEmail(): string {
    return store.get('user.email');
  }
  setEmail(email: string): void {
    store.set('user.email', email);
  }

  getUser(): User {
    return store.get('user');
  }
  setUser(user: User): void {
    store.set('user', user);
  }

  clear(): void {
    store.clearAll();
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
}
