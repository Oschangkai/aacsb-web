import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgProgress } from 'ngx-progressbar';
import { Subscription } from 'rxjs';

import { AlertService } from '@service/alert.service';
import { SystemService } from '@module/main-system/service/system.service';

import { Permission } from '@model/ApplicationPermission.model';
import { ResponseData } from '@model/response.model';
import { User, Users } from '@model/query.response.model';

@Component({
  selector: 'app-user',
  templateUrl: './user-page.component.html'
})
export class UserPageComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private alert: AlertService,
    private systemService: SystemService,
    private ngProgress: NgProgress
  ) {
    this.httpStateSubscription = this.ngProgress.ref('http-load').state.subscribe(state => {
      this.loadData = state.active;
    });
  }
  private httpStateSubscription: Subscription;

  // states
  Permission = Permission;
  loadData = true;
  modalOpened = {edit: false, delete: false, add: false};

  // data
  users: ResponseData<Users> = { data: [], count: 0 };
  selected: Users = {id: '', email: '', isActive: false, firstName: '', lastName: ''};
  userDetail: {[x: string]: User} = { '': {id: '', email: '', isActive: false, firstName: '', lastName: '', roles: []} };

  onDetailOpen(user: Users): void {
    // If first loaded, or loaded before
    // not processing this function
    if (user === null || this.userDetail[user.id]) { return; }

    this.systemService.getUserDetail(user.id).subscribe(response => {
      this.userDetail[user.id] = response;
    });
  }
  onAddClicked(): void {
    this.modalOpened.add = true;
  }
  onEditClicked(user: Users): void {
    if (user === null) { return; }

    this.modalOpened.edit = true;
    this.selected = {...user};

    this.systemService.getUserDetail(user.id).subscribe(response => {
      this.userDetail[user.id] = response;
    });
  }
  onDeleteClicked(user: Users): void {
    if (user === null) { return; }

    this.selected = {...user};
    this.modalOpened.delete = true;
  }
  onAddSubmit(user: User): void {
    this.systemService.addUser(user).subscribe(response => {
      this.modalOpened.add = false;
      response && response.message && this.alert.success(response.message);
      this.load();
    });
  }
  onEditSubmit(user: User): void {
    this.systemService.editUser(user).subscribe(response => {
      this.modalOpened.edit = false;
      response && response.message && this.alert.success(response.message);
      this.load();
    });
  }
  onDeleteSubmit(id: string): void {
    this.systemService.deleteUser(id).subscribe(response => {
      this.modalOpened.delete = false;
      response && response.message && this.alert.info(response.message);
      this.load();
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ response }) => {
        this.users.data = [...response];
        this.users.count = response.length;
      }
    );
  }

  load(): void {
    this.systemService.getUsers().subscribe(response => {
      this.users.data = [...response];
      this.users.count = response.length;
      this.userDetail = {};
    });
  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
