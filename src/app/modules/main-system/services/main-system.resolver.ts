import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

import { SystemService } from "./system.service";
import { Users } from "@model/query.response.model";

export const userResolver: ResolveFn<Observable<Users[]>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(SystemService).getUsers();
    };

export const roleResolver: ResolveFn<Observable<any>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(SystemService).getRoles();
    };

export const auditLogResolver: ResolveFn<Observable<any>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(SystemService).getAuditLog({ PageNumber: 1, PageSize: 10 });
    };
