import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

import { ReportService } from "./report.service";
import { AacsbTable31, AacsbTable32, Discipline } from "@model/query.response.model";

export const aacsb31TableResolver: ResolveFn<Observable<AacsbTable31[]>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ReportService).getAacsb31Table({semester: (new Date().getFullYear() - 1912).toString()});
    };

export const getDisciplineResolver: ResolveFn<Observable<Discipline[]>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ReportService).getDisciplines();
    };

export const getAcademicYearResolver: ResolveFn<Observable<number[]>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ReportService).getAcademicYear();
    };

export const getAacsb32TableResolver: (type: string) => ResolveFn<Observable<AacsbTable32[]>> = 
    (type : string) => (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ReportService).getAacsb32Table({semester: (new Date().getFullYear() - 1912).toString(), type: type});
    };