import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from '@service/user.service';
import { EnvironmentService } from '@service/environment.service';

let token: string | null = null;

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private environment: EnvironmentService) {
    this.userService.currentUser.subscribe(u => token = u.token);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    // WhiteList
    const isApiUrl = req.url.startsWith(this.environment.api);

    if (!isApiUrl) {
      return next.handle(req);
    }

    // == Authorize token attachment ==
    const urlPath = req.url.split(this.environment.api)[1];

    // BlackList
    const isLogoutPath = urlPath.includes('/logout');
    const isTokenExchangePath = urlPath.includes('/token');

    if (token && !isLogoutPath && !isTokenExchangePath) {
      headersConfig.Authorization = `Bearer ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
