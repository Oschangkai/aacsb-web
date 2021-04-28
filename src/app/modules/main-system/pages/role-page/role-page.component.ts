import {Component, OnDestroy, OnInit} from '@angular/core';

import {Permission, PermissionList} from '@model/ApplicationPermission.model';
import {ActivatedRoute} from '@angular/router';
import {NgProgress} from 'ngx-progressbar';
import {Subscription} from 'rxjs';
import {Role, Roles} from '@model/query.response.model';
import {ResponseData} from '@model/response.model';
import {SystemService} from '@module/main-system/service/system.service';

@Component({
  selector: 'app-role-page',
  templateUrl: './role-page.component.html'
})
export class RolePageComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
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
  roles: ResponseData<Roles> = { data: [], count: 0 };
  selected: Roles = {id: '', name: ''};
  roleDetail: {[x: string]: Role} = { '': {id: '', name: '', claims: []} };

  onDetailOpen(open: boolean, role: Roles | null): void {
    // If closed, first loaded, or loaded before
    // not processing this function
    if (!open || role === null || this.roleDetail[role.id]) { return; }

    this.systemService.getRole(role.id).subscribe(response => {
      this.roleDetail[role.id] = response.data as Role;
    });
  }
  onAddClicked(): void {
    this.modalOpened.add = true;
  }
  onEditClicked(role: Roles | null): void {
    if (role === null) { return; }

    this.modalOpened.edit = true;
    this.selected = {...role};

    this.systemService.getRole(role.id).subscribe(response => {
      this.roleDetail[role.id] = response.data as Role;
    });
  }
  onDeleteClicked(role: Roles | null): void {
    if (role === null) { return; }

    this.selected = {...role};
    this.modalOpened.delete = true;
  }
  onAddSubmit(role: Role): void {
    // TODO: add request
    this.modalOpened.add = false;
    this.load();
  }
  onEditSubmit(role: Role): void {
    // TODO: edit request
    this.modalOpened.edit = false;
    this.load();
  }
  onDeleteSubmit(id: string): void {
    // TODO: delete request
    this.modalOpened.delete = false;
    this.load();
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ response }) => {
        this.roles.data = [...response.data];
        this.roles.count = response.count;
      }
    );
  }

  load(): void {
    this.systemService.getRoles().subscribe(response => {
      this.roles.data = [...response.data as Roles[]];
      this.roles.count = response.count;
    });
  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
