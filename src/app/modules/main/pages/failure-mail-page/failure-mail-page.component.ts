import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import {HttpParams} from '@angular/common/http';

import {Subscription} from 'rxjs';
import {ClrDatagridStateInterface, ClrLoadingState} from '@clr/angular';
import {NgProgress} from 'ngx-progressbar';

import { FailureMailEvents } from '@model/query.response.model';
import { ResponseData } from '@model/response.model';
import { Permission } from '@model/ApplicationPermission.model';
import { FailureMailService } from '@module/main/services/failure-mail.service';
import { removeEmptyProperty } from '@utils/converter';
import {AlertService} from '@service/alert.service';

@Component({
  selector: 'app-failure-mail-page',
  templateUrl: './failure-mail-page.component.html',
  styleUrls: ['./failure-mail-page.component.scss'],
  providers: [FailureMailService]
})
export class FailureMailPageComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private ngProgress: NgProgress,
    private alert: AlertService,
    private failureMailService: FailureMailService
  ) {
    this.httpStateSubscription = this.ngProgress.ref('http-load').state.subscribe(state => {
      this.loadData = state.active;
      this.submitBtnState = state.active ? ClrLoadingState.LOADING : ClrLoadingState.DEFAULT;
    });
  }
  private httpStateSubscription: Subscription;

  // states
  Permission = Permission;
  loadData = true;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  openModal = false;

  // form
  // TODO: start/end date max/min date
  queryForm: FormGroup = new FormGroup({
    startTimestamp: new FormControl(),
    endTimestamp: new FormControl(),
    q: new FormControl(),
    email: new FormControl()
  });
  query = { ...this.queryForm.value, page: 1, pageSize: 10 };

  // data
  selected: any[] = [];
  failureMailEvents: ResponseData<FailureMailEvents> = { data: [], count: 0, emails: [] };

  // watch values
  pageFromClient = () => !!(this.query.startTimestamp || this.query.endTimestamp);
  unblockList = () => this.selected
    .map(el => ({email: el.email, category: el.category}))
    .filter( (v, i , a ) =>
      a.findIndex(t => (JSON.stringify(t) === JSON.stringify(v))) === i
    )

  submit(): void {
    this.query = {...this.queryForm.value, page: 1, pageSize: 1000};
    this.load();
  }
  load(): void {
    let params: any = {...this.query};
    params.startTimestamp = Math.floor(new Date(params.startTimestamp).getTime() / 1000) || null;
    params.endTimestamp = Math.floor(new Date(params.endTimestamp).getTime() / 1000) || null;
    params = removeEmptyProperty({...params});

    this.failureMailService.query(new HttpParams({fromObject: params}))
      .subscribe(res => {
        this.failureMailEvents = res.data as ResponseData<FailureMailEvents>;
      });
  }
  unblock(): void {
    const unblockList = [...this.unblockList()];
    this.failureMailService.unblock(unblockList)
      .subscribe(res => {
        this.selected = [];
        this.load();
        this.openModal = false;
        this.alert.info(`Unblocked: ${unblockList.map(u => u.email)}`);
      });
  }

  refresh(state: ClrDatagridStateInterface): void {
    // TODO: 目前因前端框架的 bug，從 Server 取分頁資料會發生錯誤，故暫不實作
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ failureMailEvents }) => {
        this.failureMailEvents = {...failureMailEvents.data};
      }
    );
  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }

}
