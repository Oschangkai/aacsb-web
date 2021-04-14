import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SimpleResponse} from '@model/response.model';
import {FailureMailEvents} from '@model/query.response.model';
import { environment } from '@environment/environment';

const baseUrl = environment.api;
const MANAGEMENT = 'v1/SendGrid/management';

@Injectable()
export class FailureMailService {

  constructor(private http: HttpClient) { }

  get(): Observable<SimpleResponse<FailureMailEvents>> {
    return this.http
      .get<SimpleResponse<FailureMailEvents>>(`${baseUrl}/${MANAGEMENT}/failureMails`, {params: new HttpParams().append('page', '1').append('pageSize', '1000')});
  }

  query(params: HttpParams = new HttpParams()): Observable<SimpleResponse<FailureMailEvents>> {
    return this.http
      .get<SimpleResponse<FailureMailEvents>>(`${baseUrl}/${MANAGEMENT}/failureMails`, { params });
  }

  unblock(list: {email: string, category: string}[]): Observable<any> {
    return this.http
      .request('delete', `${baseUrl}/${MANAGEMENT}/failureMails`, { body: [...list] });
  }

}
