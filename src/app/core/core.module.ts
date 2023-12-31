import { APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeZhHant from '@angular/common/locales/zh-Hant';

import { EnsureModuleLoadedOnceGuard } from './ensureModuleLoadedOnceGuard';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { HttpErrorInterceptor } from './interceptors/http.error.interceptor';
import { HttpCacheInterceptor } from './interceptors/http.cache.interceptor';
import { HttpToastInterceptor } from './interceptors/http.toast.interceptor';
import { InitializerService } from '@service/initializer.service';
import { ErrorService } from '@service/error.service';
import { EnvironmentService } from '@service/environment.service';
import { EnvironmentServiceFactory } from '@service/environment.service.factory';

// set zh-hant
registerLocaleData(localeZhHant);

@NgModule({
  declarations: [],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (init: InitializerService) => () => init.wakeUpSql(9870).toPromise(),
      deps: [InitializerService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (init: InitializerService) => () => init.checkTokenExpiration(),
      deps: [InitializerService],
      multi: true
    },
    { provide: ErrorHandler, useClass: ErrorService },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpToastInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'zh-Hant' },
    { provide: EnvironmentService, useFactory: EnvironmentServiceFactory }
  ],
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
