import { Component, OnInit } from '@angular/core';

import { ClrLoadingState } from '@clr/angular';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-failure-mail-page',
  templateUrl: './failure-mail-page.component.html',
  styleUrls: ['./failure-mail-page.component.scss']
})
export class FailureMailPageComponent implements OnInit {

  constructor() { }

  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  // TODO: loading disable, start/end date max/min date
  queryForm: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    q: new FormControl(),
    email: new FormControl()
  });

  // TODO: implement global data fetching
  loading: boolean = false;
  selected: any[] = [];

  // TODO: api, model
  failureMailEvents: { reason: string; created: number; category: string; email: string; status: string }[] = [
    {
      created: 1615797179,
      email: 'marvin_wu@mayohr.com',
      reason: '550 5.4.1 All recipient addresses rejected : Access denied. AS(201806271) [SG2APC01FT049.eop-APC01.prod.protection.outlook.com]',
      status: '5.4.1',
      category: 'Bounce'
    },
    {
      created: 1615738031,
      email: 'qualityassurancedept@mayohr.com',
      reason: '550 5.4.1 All recipient addresses rejected : Access denied. AS(201806271) [SG2APC01FT063.eop-APC01.prod.protection.outlook.com]',
      status: '5.4.1',
      category: 'Bounce'
    },
    {
      created: 1614913193,
      email: 'marvin_wu@mayohr.com',
      reason: '552 1 Requested mail action aborted, mailbox not found',
      status: '552',
      category: 'Bounce'
    }
  ];

  submit(): void {
    this.submitBtnState = ClrLoadingState.LOADING;
    this.loading = true;
    // TODO: api
    console.log(this.queryForm.value);
  }
  unblock(): void {
    const mail = this.selected.map(el => el.email).filter((el, idx, self) => self.indexOf(el) === idx);
    // TODO: api
    console.log(mail);
  }
  ngOnInit(): void {
  }

}
