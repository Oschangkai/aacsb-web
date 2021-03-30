import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClrLoadingState } from '@clr/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { FailureMailEvents } from '@model/query.response.model';
import { FailureMailService } from '@module/main/services/failure-mail.service';
import { ResponseData } from '@model/response.model';


@Component({
  selector: 'app-failure-mail-page',
  templateUrl: './failure-mail-page.component.html',
  styleUrls: ['./failure-mail-page.component.scss'],
  providers: [FailureMailService]
})
export class FailureMailPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  // TODO: loading disable, start/end date max/min date
  queryForm: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    q: new FormControl(),
    email: new FormControl()
  });

  // TODO: implement global data fetching
  loading = false;
  openModal = false;
  selected: any[] = [];
  failureMailEvents: ResponseData<FailureMailEvents> = { data: [], count: 0, emails: [] };
  unblockMails = () => this.selected.map(el => el.email).filter((el, idx, self) => self.indexOf(el) === idx);

  submit(): void {
    this.submitBtnState = ClrLoadingState.LOADING;
    this.loading = true;
    // TODO: api
    console.log(this.queryForm.value);
  }
  unblock(): void {
    this.openModal = true;
    // TODO: api
    console.log(this.unblockMails);
  }
  ngOnInit(): void {
    this.route.data.subscribe(
      ({ failureMailEvents }) => {
        this.failureMailEvents = failureMailEvents.data;
      }
    );
  }

}
