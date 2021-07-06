import { Component, OnDestroy, OnInit } from '@angular/core';

import { Permission } from '@model/ApplicationPermission.model';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { Subscription } from 'rxjs';
import { AuditLog } from '@model/query.response.model';
import { PaginationResponse } from '@model/response.model';
import { SystemService } from '@module/main-system/service/system.service';
import { AlertService } from '@service/alert.service';
import { AuditLogQuery } from '@model/query.model';
import { FormControl, FormGroup } from '@angular/forms';
import {removeEmptyProperty} from '@utils/converter';
import {ClrLoadingState} from '@clr/angular';

@Component({
  selector: 'app-audit-log-page',
  templateUrl: './audit-log-page.component.html'
})
export class AuditLogPageComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private alert: AlertService,
    private systemService: SystemService,
    private ngProgress: NgProgress
  ) {
    this.httpStateSubscription = this.ngProgress.ref('http-load').state.subscribe(state => {
      this.loadData = state.active;
      this.submitBtnState = state.active ? ClrLoadingState.LOADING : ClrLoadingState.DEFAULT;
    });
  }
  private httpStateSubscription: Subscription;

  // states
  Permission = Permission;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  loadData = true;

  // data
  filterForm: FormGroup = new FormGroup({
    StartDateTime: new FormControl(),
    EndDateTime: new FormControl(),
    Operator: new FormControl()
  });
  filter: Partial<AuditLogQuery> = { ...this.filterForm.value, PageNumber: 1, PageSize: 10 };
  logs: PaginationResponse<AuditLog[]> = { data: [] as AuditLog[], count: 0, pageNumber: 1, pageSize: 10, succeeded: false, message: '' };

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ response }) => {
        this.logs = {...response};
        this.logs.count = response.data.length;
      }
    );
  }
  submit(): void {
    this.filter = { ...this.filterForm.value, PageNumber: 1, PageSize: 10 };
    this.load();
  }

  load(): void {
    let params: any = {...this.filter};
    params.StartDateTime = params.StartDateTime ? new Date(params.StartDateTime).toISOString() : null;
    params.EndDateTime = params.EndDateTime ? new Date(params.EndDateTime).toISOString() : null;

    params = removeEmptyProperty({...params});
    this.systemService.getAuditLog(params).subscribe(response => {
      this.logs = {...response};
      this.logs.count = response.data.length;
    });
  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}

