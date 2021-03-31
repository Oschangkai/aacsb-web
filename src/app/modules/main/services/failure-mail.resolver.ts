import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { FailureMailEvents } from '@model/query.response.model';
import { FailureMailService } from '@module/main/services/failure-mail.service';
import {SimpleResponse} from '@model/response.model';

@Injectable()
export class FailureMailResolver implements Resolve<SimpleResponse<FailureMailEvents>> {
  constructor(
    private failureMailService: FailureMailService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.failureMailService.get();
  }
}
