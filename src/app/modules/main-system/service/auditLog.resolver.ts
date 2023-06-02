import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuditLog } from '@model/query.response.model';
import { PaginationResponse } from '@model/response.model';
import { SystemService } from '@module/main-system/service/system.service';

@Injectable()
export class AuditLogResolver  {
  constructor(
    private systemService: SystemService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.systemService.getAuditLog({PageNumber: 1, PageSize: 10});
  }
}
