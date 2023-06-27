import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { Subscription } from 'rxjs';
import { NgProgress } from 'ngx-progressbar';

import { DeleteCoursesRequest } from '@model/request.model';

@Component({
  selector: 'app-delete-courses-modal',
  templateUrl: './delete-courses-modal.component.html',
  styleUrls: ['./delete-courses-modal.component.scss']
})
export class DeleteCoursesModalComponent {
constructor(
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
  allDepartments = true;
  @Input() opened = false;
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSubmit: EventEmitter<DeleteCoursesRequest> = new EventEmitter<DeleteCoursesRequest>();
  
  // data
  request: DeleteCoursesRequest = {semester: '', importSignatureId: ''};
  ObjectKeys = Object.keys;

  onSubmitClicked(): void {
    const request: DeleteCoursesRequest = {
      semester: this.request.semester,
      importSignatureId: this.request.importSignatureId
    };
    this.onSubmit.emit(request);
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
