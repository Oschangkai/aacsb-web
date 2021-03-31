import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SimpleResponse} from '@model/response.model';
import {FailureMailEvents} from '@model/query.response.model';
import { environment } from '@environment/environment';
import { removeEmptyProperty} from '@utils/converter';

const baseUrl = environment.api;
const MANAGEMENT = 'SendGrid/management';

@Injectable()
export class FailureMailService {

  constructor(private http: HttpClient) { }

  get(): Observable<SimpleResponse<FailureMailEvents>> {
    return this.http
      .get<SimpleResponse<FailureMailEvents>>(`${baseUrl}/${MANAGEMENT}/failureMails`);
  }

  query(query: any): Observable<SimpleResponse<FailureMailEvents>> {
    const params: any = removeEmptyProperty({...query});
    return this.http
      .get<SimpleResponse<FailureMailEvents>>(`${baseUrl}/${MANAGEMENT}/failureMails`, { params });
  }

}
