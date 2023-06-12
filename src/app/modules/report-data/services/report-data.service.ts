import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EnvironmentService } from '@service/environment.service';
import { Department, Discipline, JobEnqueuedResponse } from '@model/query.response.model';
import { CollectCoursesRequest } from '@model/query.model';
import { tap } from 'rxjs/operators';

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
}