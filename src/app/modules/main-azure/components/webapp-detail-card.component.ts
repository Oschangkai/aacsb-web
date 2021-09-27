import { Component, Input, OnInit } from '@angular/core';

import { ClrLoadingState } from '@clr/angular';
import {
  WebAppInstance,
  WebAppInstanceCpuRecord,
  WebAppInstanceMemoryRecord,
  WebAppInstanceStatus,
  WebApps
} from '@model/query.response.model';
import { AzureService } from '@module/main-azure/services/azure.service';
import { AlertService } from '@service/alert.service';

@Component({
  selector: 'app-webapp-detail-card',
  templateUrl: './webapp-detail-card.component.html'
})
export class WebappDetailCardComponent implements OnInit {

  constructor(private azureService: AzureService, private alert: AlertService) {
  }

  // states
  showDetail = false;
  restarting = false;
  modalOpened = false;
  selected: {farmId: string, workerName: string} = {farmId: '', workerName: ''};
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  // data
  @Input() webapp: WebApps = { id: '', regionName: '', resourceGroupName: '', serverFarmId: '' };
  instances: WebAppInstance[] | undefined;
  instanceStatus: WebAppInstanceStatus | undefined;

  getNameById = (id: string) => id.split(/[\s\/]+/).pop();
  getCpu = (machineName: string): WebAppInstanceCpuRecord =>
    this.instanceStatus?.cpu.records.filter(r => r.machineName === machineName)[0]
    || {timestamp: '', machineName: '', overallCPUPercent: 0}
  getMemory = (machineName: string): WebAppInstanceMemoryRecord =>
    this.instanceStatus?.memory.records.filter(r => r.machineName === machineName)[0]
    || {timestamp: '' , percentPhysicalMemoryUsed: 0, privateBytes: 0, machineName: ''}

  ngOnInit(): void {
  }

  onLoadClicked(): void {
    this.showDetail = true;
    this.azureService.getInstances(this.webapp.id).subscribe(i => this.instances = i);
    this.azureService.getInstanceStatus(this.webapp.id).subscribe(s => this.instanceStatus = s);
  }

  onReloadClicked(): void {
    this.instances = undefined;
    this.instanceStatus = undefined;
    this.azureService.getInstances(this.webapp.id).subscribe(i => this.instances = i);
    this.azureService.getInstanceStatus(this.webapp.id).subscribe(s => this.instanceStatus = s);
  }

  onRestartClicked(farmId: string, workerName: string): void {
    this.selected = {farmId, workerName};
    this.modalOpened = true;
  }

  restart(): void {
    this.modalOpened = false;
    this.restarting = true;
    this.azureService.rebootInstance({farmId: this.selected.farmId, workerName: this.selected.workerName})
      .subscribe(response => {
        if (response.code === 'OK') {
          this.alert.success(response.message);
        } else {
          this.alert.error(response.message);
        }
        this.restarting = false;
    });
  }
}
