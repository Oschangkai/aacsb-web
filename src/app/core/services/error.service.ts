import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {LogService} from '@service/log.service';
import {NotificationService} from '@service/notification.service';


/**
 * This service was created for:
 *  - handling app errors
 *  - handling http errors
 * @public
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse): void {

    const logger = this.injector.get(LogService);
    const notifier = this.injector.get(NotificationService);

    let message;
    let stackTrace = '';

    if (error instanceof HttpErrorResponse) {
      // Server error
      message = this.getServerErrorMessage(error);
      stackTrace = ''; // TODO: needs to implement
      notifier.showError(message);
    } else {
      // Client Error
      message = this.getClientErrorMessage(error);
      notifier.showError(message);
    }

    // Always log errors
    logger.logError(message, stackTrace);

    console.error(error);
  }

  getClientErrorMessage(error: Error): string {
    return error.message ?
      error.message :
      error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine ?
      error.message :
      'No Internet Connection';
  }
}
