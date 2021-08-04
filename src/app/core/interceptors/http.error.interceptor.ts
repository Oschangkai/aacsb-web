import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AlertService } from '@service/alert.service';
import { UserService } from '@service/user.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private alert: AlertService,
    private user: UserService,
    private router: Router
  ) { }

  handle400Error = (error: any): Observable<any> => {
    if (error.error && error.error.Message) {
      this.alert.error(error.error.Message);
    }
    return of(null);
  }
  handle401Error = (error: any, req: HttpRequest<any>, next: HttpHandler): Observable<any> => {
    // If error code provided
    if (error.error && error.error.Code) {
      switch (error.error.Code) {
        case 'IDX10223':
          if (!this.user.isLoggedIn) {
            this.router.navigate(['/login'], {
              queryParams: {
                message: 'Login Expired, Please Login Again.',
                path: this.router.url
              }
            });
          }
          return this.user.refreshToken().pipe(
            switchMap(res => {
              const headersConfig: any = {
                Authorization: `Bearer ${res.data.jwToken}`
              };
              const request = req.clone({ setHeaders: headersConfig });
              return next.handle(request);
            })
          );
        case 'NOT_AUTH':
        default:
          this.router.navigate(['/login'], {
            queryParams: {
              message: error.error.Message,
              path: this.router.url
            }
          });
          return of(null);
      }
    }

    // If message provided
    if (error.error && error.error.Message) {
      this.alert.error(`${error.error.Message}`);
    } else {
      this.alert.error(`HTTP error with status code ${error.status} ${error.statusText}.\n${error.url}`);
    }
    return of(null);
  }

  handleError(error: any, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!(error instanceof HttpErrorResponse)) {
      this.alert.error(`${error}`);
      return of(null);
    }

    switch (error.status) {
      case 400:
        return this.handle400Error(error);
      case 401:
        return this.handle401Error(error, req, next);
      case 500:
      case 0:
      default:
        this.alert.error(`HTTP error with status code ${error.status} ${error.statusText}.\n${error.url}`);
    }
    return of(null);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(err => this.handleError(err, req, next))
      );
  }
}

// https://stackoverflow.com/questions/51786002/angular-6-httpinterceptor-when-getting-401-refresh-the-token-and-create-the-sa
// https://danielk.tech/home/angular-retry-an-http-request
