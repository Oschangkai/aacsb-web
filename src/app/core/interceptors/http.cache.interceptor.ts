import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GlobalStoreService } from '@service/global-store.service';


@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: GlobalStoreService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // pass along non-cacheable requests and invalidate cache
    if (req.method !== 'GET') {
      this.cacheService.clearHttp();
      return next.handle(req);
    }

    // on page changes invalidate cache
    if (req.params.keys().length >= 0) {
      this.cacheService.clearHttp();
      return next.handle(req);
    }

    // attempt to retrieve a cached response
    const cachedResponse: HttpResponse<any> | undefined = this.cacheService.getHttp(req.url);

    // return cached response
    if (cachedResponse) {
      return of(cachedResponse);
    }

    // send request to server and add response to cache
    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.cacheService.putHttp(req.url, event);
          }
        })
      );

  }
}
