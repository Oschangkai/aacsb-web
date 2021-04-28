import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import {Users} from '@model/query.response.model';
import {SimpleResponse} from '@model/response.model';
import {SystemService} from '@module/main-system/service/system.service';

@Injectable()
export class UserResolver implements Resolve<SimpleResponse<Users>> {
  constructor(
    private systemService: SystemService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.systemService.getUsers();
  }
}