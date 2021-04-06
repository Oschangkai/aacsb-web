import {Injectable, Injector} from '@angular/core';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AlertService} from '@service/alert.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private alert: AlertService) { }

  handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    this.alert.error(`HTTP error with status code ${error.status} ${error.statusText}.\n${error.message}`);
    return of(null);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }
}
