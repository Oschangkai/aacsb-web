import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EnvironmentService } from '@service/environment.service';
import { Department, Discipline, MissingDataTeacherList, NullDisciplineCourseList, SimpleA31TeacherList } from '@model/response-data.model';

@Injectable()
export class ReportDataUtilsService {
  constructor(private http: HttpClient, private environment: EnvironmentService) { }

  reportDataUrl = `${this.environment.api}/v1/reportdata`;

  getDisciplines(): Observable<Discipline[]> {
    return this.http.get<Discipline[]>(`${this.reportDataUrl}/discipline`);
  }

  getAcademicYear(): Observable<number[]> {
    return this.http.get<number[]>(`${this.reportDataUrl}/academic-year`);
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.reportDataUrl}/department`);
  }

  getNullDisciplineCourses(request: {academicYear: string}): Observable<NullDisciplineCourseList[]> {
    return this.http.post<NullDisciplineCourseList[]>(`${this.reportDataUrl}/course/inspect`, request);
  }

  getMissingDataTeachers(request: {academicYear: string, column: 'degree' | 'responsibility' | 'qualification'}): Observable<MissingDataTeacherList[]> {
    return this.http.post<MissingDataTeacherList[]>(`${this.reportDataUrl}/teacher/inspect`, request);
  }

  getSimpleA31TeacherList(request: {academicYear: string}): Observable<SimpleA31TeacherList[]> {
    return this.http.post<SimpleA31TeacherList[]>(`${this.reportDataUrl}/teacher/a31/list`, {...request});
  }

  getA31CourseByTeacher(request: {academicYear: string, teacherName: string}): Observable<NullDisciplineCourseList[]> {
    return this.http.post<NullDisciplineCourseList[]>(`${this.reportDataUrl}/course/a31`, {...request});
  }
}