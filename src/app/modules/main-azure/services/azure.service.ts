import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AzureStatusMessage, WebAppInstance, WebAppInstanceStatus, WebApps } from '@model/query.response.model';
import { environment } from '@environment/environment';
import {tap} from 'rxjs/operators';

const baseUrl = environment.api;
const webappUrl = `${environment.api}/azure/webapp`;

@Injectable()
export class AzureService {

  constructor(private http: HttpClient) { }


  getWebapps(): Observable<WebApps[]> {
    return this.http.get<WebApps[]>(`${webappUrl}`);
  }

  getInstances(siteId: string): Observable<WebAppInstance[]> {
    return this.http.get<WebAppInstance[]>(`${webappUrl}/instance`, {
      params: new HttpParams().append('siteId', siteId)
    });
  }

  getInstanceStatus(siteId: string): Observable<WebAppInstanceStatus> {
    return this.http.get<WebAppInstanceStatus>(`${webappUrl}/instance/status`, {
      params: new HttpParams().append('siteId', siteId)
    });
  }

  rebootInstance(params: {farmId: string, workerName: string}): Observable<AzureStatusMessage> {
    return this.http.post<AzureStatusMessage>(`${webappUrl}/instance/reboot`, params);
  }
}
