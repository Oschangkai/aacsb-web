import { Injectable } from '@angular/core';

/**
 * This service was created for logging anything like:
 *  - archived notifications
 *  - user access logs
 * @public
 */
@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  logError(message: string, stack: string): void {
    // TODO: Send errors to server here
    console.log('LogService: ' + message);
  }
}
