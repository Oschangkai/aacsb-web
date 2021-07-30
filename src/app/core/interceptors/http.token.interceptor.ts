import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from '@service/user.service';
import { environment } from '@environment/environment';

let token: string | null = null;

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {
    this.userService.currentUser.subscribe(u => token = u.token);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    // == Authorize token attachment ==
    const urlPath = req.url.split(environment.api)[1];

    // WhiteList
    const isApiUrl = req.url.startsWith(environment.api);
    // BlackList
    const isLogoutPath = urlPath.includes('/logout');
    const isTokenExchangePath = urlPath.includes('/token');

    if (token && isApiUrl && !isLogoutPath && !isTokenExchangePath) {
      headersConfig.Authorization = `Bearer ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
