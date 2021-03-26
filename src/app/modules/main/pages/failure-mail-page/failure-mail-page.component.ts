import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-failure-mail-page',
  templateUrl: './failure-mail-page.component.html',
  styleUrls: ['./failure-mail-page.component.scss']
})
export class FailureMailPageComponent implements OnInit {

  constructor() { }

  loading: boolean = true;
  selected: any[] = [];

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
      email: '123@yahoo.com.tw',
      reason: '552 1 Requested mail action aborted, mailbox not found',
      status: '552',
      category: 'Bounce'
    }
  ];

  ngOnInit(): void {
  }

}
