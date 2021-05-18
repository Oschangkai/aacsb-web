import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AzureService } from './azure.service';
import { WebApps } from '@model/query.response.model';

@Injectable()
export class WebappInsightsResolver implements Resolve<WebApps[]> {
  constructor(
    private azureService: AzureService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.azureService.getWebapps();
  }
}
