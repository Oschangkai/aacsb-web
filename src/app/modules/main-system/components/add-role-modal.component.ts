import {Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgProgress} from 'ngx-progressbar';
import {Subscription} from 'rxjs';
import {ClrLoadingState} from '@clr/angular';

import {Role} from '@model/query.response.model';

import {PermissionList} from '@model/ApplicationPermission.model';

@Component({
  selector: 'app-role-add-modal',
  templateUrl: './add-role-modal.component.html'
})
export class AddRoleModalComponent implements OnInit, OnDestroy {

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
  @Output() onSubmit: EventEmitter<Role> = new EventEmitter<Role>();

  // data
  role: Role = {id: '', name: '', claims: []};

  // @ts-ignore
  permissions: {[x: string]: boolean} = PermissionList.reduce((acc, curr) => (acc[curr] = false, acc), {});
  ObjectKeys = Object.keys;

  onSubmitClicked(): void {
    const role: Role = {
      id: this.role.id,
      name: this.role.name,
      claims: Object.keys(this.permissions).filter(key => this.permissions[key])
    };
    this.onSubmit.emit(role);
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
