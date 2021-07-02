import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgProgress } from 'ngx-progressbar';
import { Subscription } from 'rxjs';

import { AlertService } from '@service/alert.service';

import { Permission } from '@model/ApplicationPermission.model';
import { AzureStatusMessage, VM } from '@model/query.response.model';
import { AzureService } from '@module/main-azure/services/azure.service';

@Component({
  selector: 'app-vm',
  templateUrl: './vm-page.component.html'
})
export class VmPageComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private alert: AlertService,
    private azureService: AzureService,
    private ngProgress: NgProgress
  ) {
    this.httpStateSubscription = this.ngProgress.ref('http-load').state.subscribe(state => {
      this.loadData = state.active;
    });
  }
  private httpStateSubscription: Subscription;

  // states
  Permission = Permission;
  PowerState = PowerState;
  PowerOperation = PowerOperation;
  loadData = true;
  modalOpened = false;

  // data
  vms: Partial<VM>[] = [{}];
  selected: Partial<VM> = {};
  vmDetail: {[x: string]: VM} = { '': {} as VM };

  onDetailOpen(vm: VM): void {
    // If first loaded, or loaded before
    // not processing this function
    if (vm === null || this.vmDetail[vm.id]) { return; }

    const query = {
      vmName: vm.computerName,
      resourceGroup: vm.resourceGroup,
      subscriptionId: vm.subscriptionId
    };

    this.azureService.getVmDetail(query).subscribe(response => {
      this.vmDetail[vm.id] = response;
    });
  }
  onOperationClicked(operation: PowerOperation, vm: Partial<VM>): void {
    if (vm === null) { return; }

    this.modalOpened = true;
    this.selected = {...vm};
  }
  onAddSubmit(operation: PowerOperation, vm: Partial<VM>): void {
    const query = {
      vmName: vm.computerName ?? '',
      resourceGroup: vm.resourceGroup ?? '',
      subscriptionId: vm.subscriptionId ?? ''
    };
    const next = (response: AzureStatusMessage) => {
      this.modalOpened = false;
      this.alert.info(response.message);
      this.load();
    };
    switch (operation){
      case PowerOperation.Start:
        this.azureService.startVm(query).subscribe(next);
        break;
      case PowerOperation.Deallocate:
        this.azureService.deallocateVm(query).subscribe(next);
        break;
      case PowerOperation.Stop:
        this.azureService.stopVm(query).subscribe(next);
        break;
      case PowerOperation.Reboot:
        this.azureService.rebootVm(query).subscribe(next);
        break;
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ response }) => {
        this.vms = [...response];
      }
    );
  }

  load(): void {
    this.azureService.getVms().subscribe(response => {
      this.vms = [...response];
      this.selected = {};
      this.vmDetail = {};
    });
  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}


enum PowerOperation {
  Deallocate = 'deallocate',
  Reboot = 'reboot',
  Start = 'start',
  Stop = 'stop'
}

enum PowerState {
  Running = 'running',
  Deallocating = 'deallocating',
  Deallocated = 'deallocated',
  Starting = 'starting',
  Stopped = 'stopped',
  Stopping = 'stopping',
  Unknown = 'unknown'
}
