import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { FailureMailEvents } from '@model/query.response.model';
import { FailureMailService } from '@module/main/services/failure-mail.service';
import {BaseResponse} from '@model/response.model';

@Injectable()
export class FailureMailResolver implements Resolve<BaseResponse<FailureMailEvents>> {
  constructor(
    private failureMailService: FailureMailService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.failureMailService.get()
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
