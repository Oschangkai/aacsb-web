import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AzureStatusMessage, VM, WebAppInstance, WebAppInstanceStatus, WebApps } from '@model/query.response.model';
import { EnvironmentService } from '@service/environment.service';

@Injectable()
export class AzureService {

  constructor(private http: HttpClient, private environment: EnvironmentService) { }

  baseUrl = `${this.environment.api}/azure`;
  webappUrl = `${this.baseUrl}/webapp`;
  vmUrl = `${this.baseUrl}/VM`;


  getWebapps(): Observable<WebApps[]> {
    return this.http.get<WebApps[]>(`${this.webappUrl}`);
  }

  getInstances(siteId: string): Observable<WebAppInstance[]> {
    return this.http.get<WebAppInstance[]>(`${this.webappUrl}/instance`, {
      params: new HttpParams().append('siteId', siteId)
    });
  }

  getInstanceStatus(siteId: string): Observable<WebAppInstanceStatus> {
    return this.http.get<WebAppInstanceStatus>(`${this.webappUrl}/instance/status`, {
      params: new HttpParams().append('siteId', siteId)
    });
  }

  rebootInstance(params: {farmId: string, workerName: string}): Observable<AzureStatusMessage> {
    return this.http.post<AzureStatusMessage>(`${this.webappUrl}/instance/reboot`, params);
  }

  getVms(): Observable<Partial<VM>[]> {
    return this.http.get<Partial<VM>[]>(`${this.vmUrl}`);
  }

  getVmDetail(params: {vmName: string, subscriptionId: string, resourceGroup: string}): Observable<VM> {
    return this.http.get<VM>(`${this.vmUrl}/${params.vmName}`, {
      params: new HttpParams()
        .append('subscriptionId', params.subscriptionId)
        .append('resourceGroup', params.resourceGroup)
    });
  }

  startVm(body: {vmName: string, subscriptionId: string, resourceGroup: string}): Observable<AzureStatusMessage> {
    return this.http.post<AzureStatusMessage>(`${this.vmUrl}/start`, { ...body });
  }

  stopVm(body: {vmName: string, subscriptionId: string, resourceGroup: string}): Observable<AzureStatusMessage> {
    return this.http.post<AzureStatusMessage>(`${this.vmUrl}/stop`, { ...body });
  }

  rebootVm(body: {vmName: string, subscriptionId: string, resourceGroup: string}): Observable<AzureStatusMessage> {
    return this.http.post<AzureStatusMessage>(`${this.vmUrl}/reboot`, { ...body });
  }

  deallocateVm(body: {vmName: string, subscriptionId: string, resourceGroup: string}): Observable<AzureStatusMessage> {
    return this.http.post<AzureStatusMessage>(`${this.vmUrl}/deallocate`, { ...body });
  }
}
