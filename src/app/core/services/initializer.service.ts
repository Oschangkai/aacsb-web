import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { catchError, timeout } from 'rxjs/operators';

import { EnvironmentService } from '@service/environment.service';
import { GlobalStoreService } from '@service/./global-store.service';
import { of, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class InitializerService {
  constructor(
    private http: HttpClient,
    private store: GlobalStoreService,
    private environment: EnvironmentService
  ) { }

  apiDomain = this.environment.api.replace('/api', '');

  wakeUpSql(wait: number = 100000): Observable<void> {
    return this.http.get<void>(`${this.apiDomain}/wake`)
      .pipe(
        timeout(wait),
        catchError(err => of(void 0))
      );
  }

  checkTokenExpiration(): Promise<void> {
    const user = this.store.getUser();

    return new Promise<void>((resolve, reject) => {
      if (!user) { resolve(); }

      if (!!user && +user.expiredOn <= (new Date().getTime() / 1000)) {
        this.http.post(`${this.environment.api}/Account/logout`, {}, {
          params: new HttpParams().append('token', user.refreshToken)
        })
          .toPromise()
          .then(() => {
            this.store.clearAll();
            window.location.assign('/login?message=Login Expired, Please Login Again.');
          });
      }

      resolve();
    });
  }
}
