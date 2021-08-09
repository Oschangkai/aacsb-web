import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import * as store from 'store';

/**
 * This service was created for:
 *  - store caches
 *  - store status
 *  - handling webapp storage
 * @public
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalStoreService {

  constructor() { }
  private requests: any = { };

  putHttp(url: string, response: HttpResponse<any>): void {
    this.requests[url] = response;
  }

  getHttp(url: string): HttpResponse<any> | undefined {
    return this.requests[url];
  }

  setRoutingDestination(url: string): void {
    store.set('routingDestination', url);
  }

  getRoutingDestination(): string {
    return store.get('routingDestination');
  }

  clearHttp(): void {
    this.requests = { };
  }
}
