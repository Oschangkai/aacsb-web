import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseData, SimpleResponse } from '@model/response.model';
import { FailureMailEvents } from '@model/query.response.model';
import { EnvironmentService } from '@service/environment.service';

@Injectable()
export class FailureMailService {

  constructor(private http: HttpClient, private environment: EnvironmentService) { }

  MANAGEMENT = `${this.environment.api}/v1/SendGrid/management`;

  get(): Observable<SimpleResponse<FailureMailEvents>> {
    return this.http
      .get<SimpleResponse<FailureMailEvents>>(`${this.MANAGEMENT}/failureMails`, {params: new HttpParams().append('page', '1').append('pageSize', '1000')});
  }

  query(params: HttpParams = new HttpParams()): Observable<SimpleResponse<ResponseData<FailureMailEvents>>> {
    return this.http
      .get<SimpleResponse<ResponseData<FailureMailEvents>>>(`${this.MANAGEMENT}/failureMails`, { params });
  }

  unblock(list: {email: string, category: string}[]): Observable<any> {
    return this.http
      .request('delete', `${this.MANAGEMENT}/failureMails`, { body: [...list] });
  }

}
