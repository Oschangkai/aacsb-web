import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MessageResponse as IMessageResponse } from '@model/response.model';
import { JobEnqueuedResponse as IJobEnqueuedResponse } from '@model/response.model';
import { AlertService } from '@service/alert.service';
import { tap } from 'rxjs/operators';
import { AlertDuration } from '@model/alert.model';
import { EnvironmentService } from '@service/environment.service';

@Injectable()
export class HttpToastInterceptor implements HttpInterceptor {
  constructor(private alert: AlertService, private environment: EnvironmentService) {
    this.alert = alert;
    this.environment = environment;
  }

  handleToast(req: HttpRequest<any>, event :HttpEvent<any>): void {
    if(!(event instanceof HttpResponse) || !event.body) return;
    
    // MessageResponse
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
    
    // JobEnqueuedResponse
    if (event.body.jobId !== undefined && event.body.jobUrl !== undefined) {
      const res = event.body as IJobEnqueuedResponse;
      this.alert.info(`Job ${res.jobId} enqueued.\n${this.environment.api.replace('/api', res.jobUrl)}`, { duration: AlertDuration.Long });
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap(evt => this.handleToast(req, evt))
      )
  }

}