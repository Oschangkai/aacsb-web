import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { WebApps } from '@model/query.response.model';
import { Permission } from '@model/ApplicationPermission.model';

@Component({
  selector: 'app-webapp-insights-page',
  templateUrl: './webapp-insights-page.component.html'
})
export class WebappInsightsPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  // states
  Permission = Permission;
  loadData = true;
  modalOpened = {reboot: false};

  // data
  webapps: WebApps[] = [];
  appList: WebApps[] = [];
  appNameList: string[] = [];
  query = '';

  ngOnInit(): void {
    this.route.data.subscribe(
      ({ response }) => {
        this.webapps = response;
        this.appNameList = this.webapps.map(el => el.id.split(/[\s\/]+/).reverse()[0]);
        this.load();
      }
    );
  }

  load(): void {
    this.loadData = true;
    if (this.query !== '') {
      this.appList = this.webapps
        .filter(app =>
          app.id.split(/[\s\/]+/)
            .reverse()[0]
            .includes(this.query)
        );
      this.loadData = false;
      return;
    }
    this.appList = [];
    this.loadData = false;
  }

  search(): void {
    this.loadData = true;
    this.load();
  }
}
