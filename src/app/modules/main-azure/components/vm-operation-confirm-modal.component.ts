import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgProgress } from 'ngx-progressbar';
import { Subscription } from 'rxjs';
import { ClrLoadingState } from '@clr/angular';

import { VM } from '@model/query.response.model';
import { PowerOperation } from '@model/VMPower.model';

@Component({
  selector: 'app-vm-operation-confirm-modal',
  templateUrl: './vm-operation-confirm-modal.component.html'
})
export class VmOperationConfirmModalComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private ngProgress: NgProgress
  ) {
    this.httpStateSubscription = this.ngProgress.ref('http-load').state.subscribe(state => {
      this.loadData = state.active;
      this.submitBtnState = state.active ? ClrLoadingState.LOADING : ClrLoadingState.DEFAULT;
    });
  }
  private httpStateSubscription: Subscription;

  // states
  loadData = true;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  @Input() opened = false;
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSubmit: EventEmitter<PowerOperation> = new EventEmitter<PowerOperation>();

  // data
  @Input() selected!: { operation: PowerOperation, vm: Partial<VM> };

  onSubmitClicked(): void {
    this.onSubmit.emit(this.selected.operation);
  }
  onCancelClicked(): void {
    this.onCancel.emit();
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
