import {Component, OnDestroy, OnInit} from '@angular/core';

import {Permission} from '@model/ApplicationPermission.model';
import {ActivatedRoute} from '@angular/router';
import {NgProgress} from 'ngx-progressbar';
import {Subscription} from 'rxjs';
import {AlertService} from '@service/alert.service';

@Component({
  selector: 'app-webapp-insights-page',
  templateUrl: './webapp-insights-page.component.html'
})
export class WebappInsightsPageComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private alert: AlertService,
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
  modalOpened = {reboot: false};

  // data

  ngOnInit(): void {
  }

  load(): void {
  }
  ngOnDestroy(): void {
    this.httpStateSubscription.unsubscribe();
  }
}
