import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AzureStatusMessage, VM, WebAppInstance, WebAppInstanceStatus, WebApps } from '@model/query.response.model';
import { environment } from '@environment/environment';

const baseUrl = `${environment.api}/azure`;
const webappUrl = `${baseUrl}/webapp`;
const vmUrl = `${baseUrl}/VM`;

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

  getVms(): Observable<Partial<VM>[]> {
    return this.http.get<Partial<VM>[]>(`${vmUrl}`);
  }

  getVmDetail(params: {vmName: string, subscriptionId: string, resourceGroup: string}): Observable<VM> {
    return this.http.get<VM>(`${vmUrl}/${params.vmName}`, {
      params: new HttpParams()
        .append('subscriptionId', params.subscriptionId)
        .append('resourceGroup', params.resourceGroup)
    });
  }

  startVm(body: {vmName: string, subscriptionId: string, resourceGroup: string}): Observable<AzureStatusMessage> {
    return this.http.post<AzureStatusMessage>(`${vmUrl}/start`, { ...body });
  }

  stopVm(body: {vmName: string, subscriptionId: string, resourceGroup: string}): Observable<AzureStatusMessage> {
    return this.http.post<AzureStatusMessage>(`${vmUrl}/stop`, { ...body });
  }

  rebootVm(body: {vmName: string, subscriptionId: string, resourceGroup: string}): Observable<AzureStatusMessage> {
    return this.http.post<AzureStatusMessage>(`${vmUrl}/reboot`, { ...body });
  }

  deallocateVm(body: {vmName: string, subscriptionId: string, resourceGroup: string}): Observable<AzureStatusMessage> {
    return this.http.post<AzureStatusMessage>(`${vmUrl}/deallocate`, { ...body });
  }
}
