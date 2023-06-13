import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgProgress } from 'ngx-progressbar';
import { BehaviorSubject, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ClrLoadingState } from '@clr/angular';

import { User } from '@model/response-data.model';
import { SystemService } from '@here/services/system.service';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './edit-user-modal.component.html'
})
export class EditUserModalComponent implements OnInit, OnDestroy {

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
  private data$ = new BehaviorSubject<User>({id: '', email: '', isActive: false, firstName: '', lastName: '', roles: []});

  // states
  loadData = true;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  @Input() opened = false;
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSubmit: EventEmitter<User> = new EventEmitter<User>();

  // data
  @Input()
  set user(value: User) {
    this.data$.next(value);
  }
  get user(): User {
    return this.data$.getValue();
  }
  roles: {[x: string]: boolean} = {};
  ObjectKeys = Object.keys;

  onSubmitClicked(): void {
    if (!this.user) { return; }
    const user: User = {
      id: this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      isActive: this.user.isActive,
      roles: Object.keys(this.roles).filter(key => this.roles[key])
    };
    this.onSubmit.emit(user);
  }

  ngOnInit(): void {
    this.data$
      .pipe(takeWhile(() => !this.user, true))
      .subscribe(data => {
        if (data) {
          this.systemService.getRoles().subscribe(response => {
            const roleList = response.map(r => r.name);
            // @ts-ignore
            this.roles = roleList.reduce((acc, curr) => (acc[curr] = false, acc), {});
            this.user.roles.forEach(r => this.roles[r] = true);
          });
        }
      });

  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
