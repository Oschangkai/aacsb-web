import { Component, OnDestroy, OnInit } from '@angular/core';

import { Permission } from '@model/ApplicationPermission.model';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { Subscription } from 'rxjs';
import { Role, Roles } from '@model/response-data.model';
import { ResponseData } from '@model/response.model';
import { SystemService } from '@here/services/system.service';
import { AlertService } from '@service/alert.service';

@Component({
  selector: 'app-role-page',
  templateUrl: './role-page.component.html'
})
export class RolePageComponent implements OnInit, OnDestroy {

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
  roles: ResponseData<Roles> = { data: [], count: 0 };
  selected: Roles = {id: '', name: ''};
  roleDetail: {[x: string]: Role} = { '': {id: '', name: '', claims: []} };

  onDetailOpen(open: boolean, role: Roles | null): void {
    // If closed, first loaded, or loaded before
    // not processing this function
    if (!open || role === null || this.roleDetail[role.id]) { return; }

    this.systemService.getRoleDetail(role.id).subscribe(response => {
      this.roleDetail[role.id] = response;
    });
  }
  onAddClicked(): void {
    this.modalOpened.add = true;
  }
  onEditClicked(role: Roles | null): void {
    if (role === null) { return; }

    this.modalOpened.edit = true;
    this.selected = {...role};

    this.systemService.getRoleDetail(role.id).subscribe(response => {
      this.roleDetail[role.id] = response;
    });
  }
  onDeleteClicked(role: Roles | null): void {
    if (role === null) { return; }

    this.selected = {...role};
    this.modalOpened.delete = true;
  }
  onAddSubmit(role: Role): void {
    this.systemService.addRole(role).subscribe(response => {
      this.modalOpened.add = false;
      this.load();
    });
  }
  onEditSubmit(role: Role): void {
    this.systemService.editRole(role).subscribe(response => {
      this.modalOpened.edit = false;
      this.load();
    });
  }
  onDeleteSubmit(id: string): void {
    this.systemService.deleteRole(id).subscribe(response => {
      this.modalOpened.delete = false;
      this.load();
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ response }) => {
        this.roles.data = [...response];
        this.roles.count = response.count;
      }
    );
  }

  load(): void {
    this.systemService.getRoles().subscribe(response => {
      this.roles.data = [...response];
      this.roles.count = response.length;
      this.roleDetail = {};
    });
  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
