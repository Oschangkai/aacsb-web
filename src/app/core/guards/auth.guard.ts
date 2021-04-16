import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router, Route } from '@angular/router';

import { UserService } from '@service/user.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  isLogin: boolean;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.isLogin = !!userService.getToken();
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (!this.isLogin) {
      this.router.navigate(['/login'], {queryParams: {message: 'Please Login.', path: url}});
      return false;
    }
    return true;
  }
}
