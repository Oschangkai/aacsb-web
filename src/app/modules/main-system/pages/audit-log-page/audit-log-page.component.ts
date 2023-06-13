import { Component, OnDestroy, OnInit } from '@angular/core';

import { Permission } from '@model/ApplicationPermission.model';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { Subscription } from 'rxjs';
import { AuditLog } from '@model/response-data.model';
import { PaginationResponse } from '@model/response.model';
import { SystemService } from '@module/main-system/services/system.service';
import { AlertService } from '@service/alert.service';
import { AuditLogQuery } from '@model/request.model';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { removeEmptyProperty } from '@utils/converter';
import { ClrDatagridStateInterface, ClrLoadingState } from '@clr/angular';

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
  filterForm: UntypedFormGroup = new UntypedFormGroup({
    StartDateTime: new UntypedFormControl(),
    EndDateTime: new UntypedFormControl(),
    Operator: new UntypedFormControl()
  });
  filter: Partial<AuditLogQuery> = { ...this.filterForm.value, PageNumber: 1, PageSize: 10 };
  logs: PaginationResponse<AuditLog> = {
    data: [], totalCount: 0, currentPage: 1, pageSize: 10, totalPages: 0, hasPreviousPage: false, hasNextPage: false
  };

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ response }) => {
        this.logs = {...response};
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
    params.EndDateTime = params.EndDateTime ? new Date(params.EndDateTime).addDays(1).toISOString() : null;

    params = removeEmptyProperty({...params});
    this.systemService.getAuditLog(params).subscribe(response => {
      this.logs = {...response};
    });
  }
  refresh(state: ClrDatagridStateInterface): void {
    if (this.filter.PageSize === state.page?.size && this.filter.PageNumber === state.page?.current) {
      return;
    }
    // const filters: { [prop: string]: any[] } = {};
    // if (state.filters) {
    //   for (const filter of state.filters) {
    //     const { property, value } = filter as { property: string; value: string };
    //     filters[property] = [value];
    //   }
    // }
    this.filter = { ...this.filter, PageNumber: state.page?.current, PageSize: state.page?.size };
    this.load();
  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}

