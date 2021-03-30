import { Injectable } from '@angular/core';
import * as store from 'store';

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

  constructor() { }

  getToken(): string {
    return store.get('token');
  }

  setToken() {
    store.set('token', '123');
  }
}
