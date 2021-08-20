import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@environment/environment';
import { GlobalStoreService } from '@service/./global-store.service';

const apiDomain = environment.api.replace('/api', '');

@Injectable({
  providedIn: 'root'
})
export class InitializerService {
  constructor(
    private http: HttpClient,
    private store: GlobalStoreService
  ) { }

  wakeUpSql(): Promise<void> {
    return this.http.get<void>(`${apiDomain}/wake`)
      .pipe()
      .toPromise();
  }

  checkTokenExpiration(): Promise<void> {
    const user = this.store.getUser();

    return new Promise<void>((resolve, reject) => {
      if (!user) { resolve(); }

      if (!!user && +user.expiredOn <= (new Date().getTime() / 1000)) {
        this.http.post(`${environment.api}/Account/logout`, {}, {
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
