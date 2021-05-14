import {ErrorHandler, LOCALE_ID, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeZhHant from '@angular/common/locales/zh-Hant';

import { EnsureModuleLoadedOnceGuard } from './ensureModuleLoadedOnceGuard';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { HttpErrorInterceptor } from './interceptors/http.error.interceptor';
import { HttpCacheInterceptor } from './interceptors/http.cache.interceptor';
import { ErrorService } from '@service/error.service';
import {AuthGuard} from '@core/guards/auth.guard';

// set zh-hant
registerLocaleData(localeZhHant);

@NgModule({
  declarations: [],
  providers: [
    AuthGuard,
    { provide: ErrorHandler, useClass: ErrorService },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'zh-Hant' }
  ],
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
