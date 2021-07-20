import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '@service/alert.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private alert: AlertService, private router: Router) { }

  handleError(error: any): Observable<any> {
    console.log(error);
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 400:
          if (error.error && error.error.Message) {
            this.alert.error(error.error.Message);
          }
          break;
        case 401:
          // TODO: try use refresh_token to get new token

          // If code defined
          if (error.error && error.error.Code) {
            switch (error.error.Code) {
              case 'NOT_AUTH':
              case 'IDX10223':
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
          break;
        case 500:
        case 0:
        default:
          this.alert.error(`HTTP error with status code ${error.status} ${error.statusText}.\n${error.url}`);
      }
    } else {
      this.alert.error(`${error}`);
    }
    return of(null);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }
}
