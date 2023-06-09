import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EnvironmentService } from '@service/environment.service';
import { AacsbTable31, Discipline } from '@model/query.response.model';

@Injectable()
export class ReportService {
  constructor(private http: HttpClient, private environment: EnvironmentService) { }

  reportUrl = `${this.environment.api}/v1/report`;
  reportDataUrl = `${this.environment.api}/v1/reportData`;

  getDisciplines(): Observable<Discipline[]> {
    return this.http.get<Discipline[]>(`${this.reportDataUrl}/discipline`);
  }

  getAcademicYear(): Observable<number[]> {
    return this.http.get<number[]>(`${this.reportDataUrl}/academic-year`);
  }

  getAacsb31Table(params: {semester: string}): Observable<AacsbTable31[]> {
    return this.http.post<AacsbTable31[]>(`${this.reportUrl}/a31`, params);
  }
}