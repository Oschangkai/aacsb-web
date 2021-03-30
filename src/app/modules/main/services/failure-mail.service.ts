import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponse} from '@model/response.model';
import {FailureMailEvents} from '@model/query.response.model';

@Injectable()
export class FailureMailService {

  constructor(private http: HttpClient) { }

  MANAGEMENT = 'SendGrid/management';

  get(): Observable<BaseResponse<FailureMailEvents>> {
    return this.http.get<BaseResponse<FailureMailEvents>>(`https://localhost:9001/api/v1/${this.MANAGEMENT}/failureMails`);
  }

}
