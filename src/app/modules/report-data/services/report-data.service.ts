import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EnvironmentService } from '@service/environment.service';
import { Discipline } from '@model/query.response.model';

@Injectable()
export class ReportDataService {
  constructor(private http: HttpClient, private environment: EnvironmentService) { }

  reportDataUrl = `${this.environment.api}/reportData`;

  getDiscipline(): Observable<Discipline[]> {
    return this.http.get<Discipline[]>(`${this.reportDataUrl}/discipline`);
  }
}