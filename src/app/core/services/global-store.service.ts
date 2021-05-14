import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

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

  clearHttp(): void {
    this.requests = { };
  }
}
