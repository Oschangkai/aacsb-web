import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgProgress } from 'ngx-progressbar';
import { Subscription } from 'rxjs';
import { ClrLoadingState } from '@clr/angular';

import { Roles, User } from '@model/query.response.model';

import { SystemService } from '@module/main-system/service/system.service';

@Component({
  selector: 'app-user-add-modal',
  templateUrl: './add-user-modal.component.html'
})
export class AddUserModalComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private ngProgress: NgProgress,
    private systemService: SystemService
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
  @Output() onSubmit: EventEmitter<User> = new EventEmitter<User>();

  // data
  user: User = {id: '', email: '', enabled: false, firstName: '', lastName: '', roles: []};

  roles: {[x: string]: boolean} = {};
  ObjectKeys = Object.keys;

  onSubmitClicked(): void {
    const user: User = {
      id: this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      enabled: this.user.enabled,
      roles: Object.keys(this.roles).filter(key => this.roles[key])
    };
    this.onSubmit.emit(user);
  }

  ngOnInit(): void {
    this.systemService.getRoles().subscribe(response => {
      const roleList = (response.data as Roles[]).map(r => r.name);
      // @ts-ignore
      this.roles = roleList.reduce((acc, curr) => (acc[curr] = false, acc), {});
    });
  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
