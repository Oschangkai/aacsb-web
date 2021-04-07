import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {ClrDatagridStateInterface, ClrLoadingState} from '@clr/angular';
import { FormControl, FormGroup } from '@angular/forms';

import { FailureMailEvents } from '@model/query.response.model';
import { ResponseData } from '@model/response.model';
import { FailureMailService } from '@module/main/services/failure-mail.service';

import { removeEmptyProperty } from '@utils/converter';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-failure-mail-page',
  templateUrl: './failure-mail-page.component.html',
  styleUrls: ['./failure-mail-page.component.scss'],
  providers: [FailureMailService]
})
export class FailureMailPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private failureMailService: FailureMailService
  ) { }

  // TODO: loading disable, start/end date max/min date
  queryForm: FormGroup = new FormGroup({
    startTimestamp: new FormControl(),
    endTimestamp: new FormControl(),
    q: new FormControl(),
    email: new FormControl()
  });

  loadData = false;
  openModal = false;
  query = { ...this.queryForm.value, page: 1, pageSize: 10 };
  selected: any[] = [];
  failureMailEvents: ResponseData<FailureMailEvents> = { data: [], count: 0, emails: [] };

  pageFromClient = () => !!(this.query.startTimestamp || this.query.endTimestamp);
  unblockMails = () => this.selected.map(el => el.email).filter((el, idx, self) => self.indexOf(el) === idx);
  submitBtnState = () => this.loadData ? ClrLoadingState.LOADING : ClrLoadingState.DEFAULT;
  submit(): void {
    this.loadData = true;
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
        this.loadData = false;
        this.failureMailEvents = res.data;
      });
  }
  unblock(): void {
    this.openModal = true;
    this.loadData = true;
    const unblockList = this.selected.map(el => ({email: el.email, category: el.category}));
    this.failureMailService.unblock(unblockList)
      .subscribe(res => {
        this.selected = [];
        this.loadData = false;
        this.openModal = false;
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

}
