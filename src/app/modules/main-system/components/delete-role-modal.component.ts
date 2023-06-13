import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgProgress } from 'ngx-progressbar';
import { Subscription } from 'rxjs';
import { ClrLoadingState } from '@clr/angular';

import { Roles } from '@model/response-data.model';

@Component({
  selector: 'app-role-delete-modal',
  templateUrl: './delete-role-modal.component.html'
})
export class DeleteRoleModalComponent implements OnInit, OnDestroy {

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
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSubmit: EventEmitter<string> = new EventEmitter<string>();

  // data
  @Input() selected!: Roles;

  onSubmitClicked(): void {
    this.onSubmit.emit(this.selected.id);
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
