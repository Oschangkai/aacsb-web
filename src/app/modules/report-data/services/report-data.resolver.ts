import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

import { ReportDataService } from "./report-data.service";

import { PaginationResponse } from "@model/response.model";
import { CourseList, TeacherList, Department, Discipline } from "@model/response-data.model";

export const CourseResolver: ResolveFn<Observable<PaginationResponse<CourseList>>> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(ReportDataService).getCourses();
  }

export const TeacherResolver: ResolveFn<Observable<PaginationResponse<TeacherList>>> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(ReportDataService).getTeachers();
  }

export const DepartmentResolver: ResolveFn<Observable<Department[]>> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(ReportDataService).getDepartments();
  }

export const DisciplineResolver: ResolveFn<Observable<Discipline[]>> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(ReportDataService).getDiscipline();
  }

export const SemesterResolver: ResolveFn<Observable<number[]>> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(ReportDataService).getSemesters();
  }