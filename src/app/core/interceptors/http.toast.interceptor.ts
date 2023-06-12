import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MessageResponse as IMessageResponse  } from '@model/response.model';
import { AlertService } from '@service/alert.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpToastInterceptor implements HttpInterceptor {
  constructor(private alert: AlertService) {
    this.alert = alert;
  }

  handleToast(req: HttpRequest<any>, event :HttpEvent<any>): void {
    if(!(event instanceof HttpResponse) || !event.body) return;

    if (event.body.succeeded !== undefined && event.body.message !== undefined) {
      const res = event.body as IMessageResponse;
      if (res.succeeded) {
        if (req.method === 'DELETE') {
          this.alert.info(res.message);
        } else {
          this.alert.success(res.message);
        }
      } else {
        this.alert.error(res.message);
      }
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap(evt => this.handleToast(req, evt))
      )
  }

}