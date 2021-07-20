import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgProgress } from 'ngx-progressbar';
import { BehaviorSubject, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ClrLoadingState } from '@clr/angular';

import { Role } from '@model/query.response.model';

import { PermissionList } from '@model/ApplicationPermission.model';

@Component({
  selector: 'app-role-edit-modal',
  templateUrl: './edit-role-modal.component.html'
})
export class EditRoleModalComponent implements OnInit, OnDestroy {

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
  private data$ = new BehaviorSubject<Role>({id: '', name: '', claims: []});

  // states
  loadData = true;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  @Input() opened = false;
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSubmit: EventEmitter<Role> = new EventEmitter<Role>();

  // data
  @Input()
  set role(value: Role) {
    this.data$.next(value);
  }
  get role(): Role {
    return this.data$.getValue();
  }
  // @ts-ignore
  permissions: {[x: string]: boolean} = PermissionList.reduce((acc, curr) => (acc[curr] = false, acc), {});
  ObjectKeys = Object.keys;

  onSubmitClicked(): void {
    if (!this.role) { return; }
    const role: Role = {
      id: this.role.id,
      name: this.role.name,
      claims: Object.keys(this.permissions).filter(key => this.permissions[key])
    };
    this.onSubmit.emit(role);
  }

  ngOnInit(): void {
    this.data$
      .pipe(takeWhile(() => !this.role, true))
      .subscribe(data => {
        if (data) {
          this.role.claims.forEach(c => this.permissions[c] = true);
        }
      });

  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
