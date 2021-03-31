import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClrLoadingState } from '@clr/angular';
import { FormControl, FormGroup } from '@angular/forms';

import { FailureMailEvents } from '@model/query.response.model';
import { ResponseData } from '@model/response.model';
import { FailureMailService } from '@module/main/services/failure-mail.service';

import { removeEmptyProperty } from '@utils/converter';

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
    startDate: new FormControl(),
    endDate: new FormControl(),
    q: new FormControl(),
    email: new FormControl()
  });

  // TODO: implement global data fetching
  loadData = false;
  openModal = false;
  query = {};
  selected: any[] = [];
  failureMailEvents: ResponseData<FailureMailEvents> = { data: [], count: 0, emails: [] };

  unblockMails = () => this.selected.map(el => el.email).filter((el, idx, self) => self.indexOf(el) === idx);
  submitBtnState = () => this.loadData ? ClrLoadingState.LOADING : ClrLoadingState.DEFAULT;
  submit(): void {
    this.loadData = true;
    this.query = {...this.queryForm.value};

    this.load();
  }
  load(): void {
    const params: any = {...this.query};
    params.startDate = Math.floor(new Date(params.startDate).getTime() / 1000) || null;
    params.endDate = Math.floor(new Date(params.endDate).getTime() / 1000) || null;

    this.failureMailService.query(params).subscribe(res => {
      this.loadData = false;
      this.failureMailEvents = res.data;
    });
  }
  unblock(): void {
    this.openModal = true;
    // TODO: api
    console.log(this.unblockMails);
  }
  ngOnInit(): void {
    this.route.data.subscribe(
      ({ failureMailEvents }) => {
        this.failureMailEvents = {...failureMailEvents.data};
      }
    );
  }

}
