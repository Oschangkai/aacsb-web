import {Inject, Injectable} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import * as store from 'store';

import {environment} from '@environment/environment';


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
    return store.get('token');
  }

  setToken(): void {
    store.set('token', '123');
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
