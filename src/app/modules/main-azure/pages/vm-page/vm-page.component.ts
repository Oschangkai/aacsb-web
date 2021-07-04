import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgProgress } from 'ngx-progressbar';
import { EMPTY, of, Subscription } from 'rxjs';
import { delay, expand, tap } from 'rxjs/operators';

import { AlertService } from '@service/alert.service';

import { Permission } from '@model/ApplicationPermission.model';
import { AzureStatusMessage, VM } from '@model/query.response.model';
import { PowerOperation, PowerState } from '@model/VMPower.model';
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
  selected: { operation: PowerOperation, vm: Partial<VM> } = {operation: PowerOperation.None, vm: {}};
  vmDetail: {[x: string]: VM} = { '': {} as VM };

  onDetailOpen(vm: VM, force: boolean = false): void {
    // If first loaded, or loaded before
    // not processing this function
    if (vm === null || (this.vmDetail[vm.id] && !force)) { return; }

    const query = {
      vmName: vm.computerName,
      resourceGroup: vm.resourceGroup,
      subscriptionId: vm.subscriptionId
    };

    this.azureService.getVmDetail(query).subscribe(response => {
      this.vmDetail[vm.id] = response;
      const index = this.vms.findIndex(v => v.id === response.vmId);
      this.vms[index].powerState = response.powerState;
    });
  }
  onOperationClicked(operation: PowerOperation): void {
    if (this.selected === null) { return; }

    this.selected.operation = operation;
    this.modalOpened = true;
  }
  onOperationCancelled(): void {
    this.selected = {operation: PowerOperation.None, vm: {}};
    this.modalOpened = false;
  }
  onOperationSubmit(operation: PowerOperation): void {
    const query = {
      vmName: this.selected.vm.computerName ?? '',
      resourceGroup: this.selected.vm.resourceGroup ?? '',
      subscriptionId: this.selected.vm.subscriptionId ?? ''
    };
    const next = (response: AzureStatusMessage) => {
      this.modalOpened = false;
      this.alert.info(response.message);
      of('').pipe(delay(4250)).subscribe(() => this.watch(query));
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
      this.selected = {operation: PowerOperation.None, vm: {}};
      this.vmDetail = {};
    });
  }
  watch(query: {vmName: string, subscriptionId: string, resourceGroup: string}): void {
    const isStable = (vm: Partial<VM>) => {
      const index = this.vms.findIndex(v => v.id === vm.vmId);
      const isStableStatus = vm.powerState === PowerState.Running
      || vm.powerState === PowerState.Stopped
      || vm.powerState === PowerState.Deallocated;
      const statusChanged = this.vms[index].powerState !== vm.powerState;
      return statusChanged && isStableStatus;
    };

    const query$ = this.azureService.getVmDetail(query).pipe(
      tap(response => {
        // Set state on page
        const index = this.vms.findIndex(vm => vm.id === response.vmId);
        this.vms[index].powerState = response.powerState;

        // Show dialog when operation finished
        if (isStable(response)) {
          this.alert.success(`${response.computerName} is ${response.powerState}`);
        }
      }),
      delay(35000)
    );

    const polling$ = query$.pipe(
      expand(response =>
        !isStable(response) ? query$ : EMPTY
      )
    );

    polling$.subscribe();
  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
