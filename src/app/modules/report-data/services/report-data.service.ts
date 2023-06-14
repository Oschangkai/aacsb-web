import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EnvironmentService } from '@service/environment.service';
import { CourseList, Department, Discipline, TeacherList } from '@model/response-data.model';
import { CollectCoursesRequest } from '@model/request.model';
import { JobEnqueuedResponse, PaginationResponse } from '@model/response.model';
import { PaginationFilter } from '@model/request-filter.model';

@Injectable()
export class ReportDataService {
  constructor(private http: HttpClient, private environment: EnvironmentService) { }

  reportDataUrl = `${this.environment.api}/v1/reportdata`;

  getDiscipline(): Observable<Discipline[]> {
    return this.http.get<Discipline[]>(`${this.reportDataUrl}/discipline`);
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.reportDataUrl}/department`);
  }

  collectCourses(request: CollectCoursesRequest): Observable<JobEnqueuedResponse> {
    return this.http.post<JobEnqueuedResponse>(`${this.reportDataUrl}/course/collect`, {...request});
  }

  getSemesters(): Observable<number[]> {
    return this.http.get<number[]>(`${this.reportDataUrl}/semester`);
  }

  getCourses(request: PaginationFilter = {pageNumber: 1, pageSize: 10}): Observable<PaginationResponse<CourseList>> {
    return this.http.post<PaginationResponse<CourseList>>(`${this.reportDataUrl}/course/search`, {...request});
  }

  getTeachers(request: PaginationFilter = {pageNumber: 1, pageSize: 10}): Observable<PaginationResponse<TeacherList>> {
    return this.http.post<PaginationResponse<TeacherList>>(`${this.reportDataUrl}/teacher/search`, {...request});
  }
}