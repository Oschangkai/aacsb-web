import {Component, OnDestroy, OnInit} from '@angular/core';

import { Permission } from '@model/ApplicationPermission.model';
import {ActivatedRoute} from '@angular/router';
import {NgProgress} from 'ngx-progressbar';
import {Subscription} from 'rxjs';
import {Roles} from '@model/query.response.model';
import {ResponseData} from '@model/response.model';
import {SystemService} from '@module/main-system/service/system.service';

@Component({
  selector: 'app-role-page',
  templateUrl: './role-page.component.html',
  providers: [SystemService]
})
export class RolePageComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
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
  openModal = false;

  // data
  roles: ResponseData<Roles> = { data: [], count: 0 };

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ response }) => {
        this.roles.data = [...response.data];
        this.roles.count = response.count;
      }
    );
  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
