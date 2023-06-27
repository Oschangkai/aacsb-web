import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

import { ReportDataUtilsService } from "./report-data-utils.service";
import { Discipline, NullDisciplineCourseList } from "@model/response-data.model";

export const getDisciplineResolver: ResolveFn<Observable<Discipline[]>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ReportDataUtilsService).getDisciplines();
    };

export const getAcademicYearResolver: ResolveFn<Observable<number[]>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ReportDataUtilsService).getAcademicYear();
    };

export const getNullDisciplineCoursesResolver: ResolveFn<Observable<NullDisciplineCourseList[]>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ReportDataUtilsService).getNullDisciplineCourses({academicYear: (new Date().getFullYear() - 1912).toString()});
    }