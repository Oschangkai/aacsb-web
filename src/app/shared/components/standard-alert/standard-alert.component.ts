import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

import { AlertService } from '@service/alert.service';
import { GlobalStoreService } from '@service/global-store.service';

import { Alert, defaultId } from '@model/alert.model';
import { uuidv4 } from '@utils/generator';

@Component({
  selector: 'app-standard-alert',
  templateUrl: './standard-alert.component.html'
})
export class StandardAlertComponent implements OnInit, OnDestroy {
  @Input() id = defaultId;
  @Input() fade = true;
  @Input() paddingTop = false;

  alerts: Alert[] = [];
  alertSubscription: Subscription = new Subscription();
  routeSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    public alertService: AlertService,
    public storage: GlobalStoreService
  ) { }

  ngOnInit(): void {
    // subscribe to new alert notifications
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(a => {
        const alert = new Alert({...a});
        alert.uid = uuidv4();
        // clear alerts when an empty alert is received
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          return;
        }

        // add alert to array
        this.alerts.push(alert);

        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), alert.duration);
        }
      });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
        this.storage.setRoutingDestination(event.url);
      }
    });
  }

  ngOnDestroy(): void {
    // unsubscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert): boolean {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) { return false; }

    if (this.fade) {
      // fade out alert
      if (!this.alerts.find(x => x === alert)) {
        // @ts-ignore
        this.alerts.find(x => x === alert).fade = true;
      }

      // remove alert after faded out
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      // remove alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
    return true;
  }

  clearAlert(): void {
    this.alerts = [];
  }
}
