import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { AlertService } from '@service/alert.service';
import { UserService } from '@service/user.service';
import { GlobalStoreService } from '@service/global-store.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private storage: GlobalStoreService,
    private alert: AlertService,
    private user: UserService,
    private router: Router
  ) { }

  handle400Error = (error: any): Observable<any> => {
    return this.handle400SeriesError(error);
  }

  handle500Error = (error: any): Observable<any> => {
    return this.handle400SeriesError(error);
  }
  handle401Error = (error: any, req: HttpRequest<any>, next: HttpHandler): Observable<any> => {

    if(req.url.endsWith('/tokens') && error.error && error.error.messages) {
      this.router.navigate(['/login'], {
        queryParams: {
          message: error.error.messages[0],
          path: this.storage.getRoutingDestination() ?? '/'
        }
      });
    }

    // If error code provided
    if (!req.url.endsWith('/tokens') && error.error && error.error.messages) {
      switch (error.error.exception) {
        case 'Authentication Failed.':
        case 'Login Timeout, Please Login Again.':
          if (!this.user.isLoggedIn) {
            this.router.navigate(['/login'], {
              queryParams: {
                message: error.exception,
                path: this.storage.getRoutingDestination() ?? '/'
              }
            });
          }
          return this.user.refreshToken().pipe(
            switchMap(res => {
              const headersConfig: any = {
                Authorization: `Bearer ${res.token}`,
                tenant: req.headers.get('tenant')
              };
              const request = req.clone({ setHeaders: headersConfig });
              return next.handle(request);
            })
          );
        default:
          return this.handle400SeriesError(error);
      }
    }

    return this.handle400SeriesError(error);
  }
  handle400SeriesError = (error: any): Observable<any> => {
    // If message provided
    let errorMessage = "";
    // TODO: error.errors
    // "errors": {
    //     "Token": [
    //         "'Token' must not be empty."
    //     ]
    // }
    if (error.error.errorId) {
      errorMessage += `Error ID: ${error.error.errorId}\n`;
    }
    if (error.error.requestUrl) {
      errorMessage += `Endpoint: ${error.error.requestUrl}\n`;
    }
    if (error.error.messages) {
      error.error.messages.forEach((message: string) => {
        this.alert.error(`${errorMessage}Message: ${message}`);
      })
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
        return this.handle500Error(error);
      case 0:
      default:
        if (error.error && error.error.Message) {
          this.alert.error(`${error.error.Message}`);
        } else {
          this.alert.error(`HTTP error with status code ${error.status} ${error.statusText}.\n${error.url}`);
        }
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
