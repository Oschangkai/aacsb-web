import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from '@service/user.service';
import {environment} from '@environment/environment';

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
    const isApiUrl = req.url.startsWith(environment.api);

    if (token && isApiUrl) {
      headersConfig.Authorization = `Bearer ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
