import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

import { ReportService } from "./report.service";
import { AacsbTable31, AacsbTable32, AacsbTable81, Department, Discipline, TeacherResume } from "@model/response-data.model";

export const aacsb31TableResolver: ResolveFn<Observable<AacsbTable31[]>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ReportService).getAacsb31Table({semester: (new Date().getFullYear() - 1912).toString()});
    };

export const getDisciplineResolver: ResolveFn<Observable<Discipline[]>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ReportService).getDisciplines();
    };

export const getDepartmentResolver: ResolveFn<Observable<Department[]>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ReportService).getDepartments();
    };

export const getAcademicYearResolver: ResolveFn<Observable<number[]>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ReportService).getAcademicYear();
    };

export const getAacsb32TableResolver: (type: string) => ResolveFn<Observable<AacsbTable32[]>> = 
    (type : string) => (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ReportService).getAacsb32Table({semester: (new Date().getFullYear() - 1912).toString(), type: type});
    };

export const aacsb81TableResolver: ResolveFn<Observable<AacsbTable81[]>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ReportService).getAacsb81Table({semester: (new Date().getFullYear() - 1912).toString()});
    };

export const teacherResumeResolver: ResolveFn<Observable<TeacherResume[]>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ReportService).getTeacherResume({academicYear: (new Date().getFullYear() - 1912).toString()});
    };