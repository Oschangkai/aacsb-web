import {Injectable} from '@angular/core';
import {Alert, AlertDuration, AlertType, defaultId} from '@model/alert.model';
import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

/**
 * This service was created for handling global notifications:
 *  - app offline
 *  - http error notification
 *  - etc...
 * @public
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  private subject = new Subject<Alert>();
  private defaultId = defaultId;

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(message: string, options?: Partial<Alert>): void {
    this.alert(new Alert({
      ...options,
      type: AlertType.Success,
      autoClose: options?.autoClose ?? true,
      duration: options?.duration ?? AlertDuration.Short,
      message
    }));
  }

  error(message: string, options?: Partial<Alert>): void {
    this.alert(new Alert({
      ...options,
      type: AlertType.Error,
      keepAfterRouteChange: options?.keepAfterRouteChange ?? true,
      autoClose: options?.autoClose ?? false,
      duration: options?.duration ?? AlertDuration.Long,
      message
    }));
  }

  info(message: string, options?: Partial<Alert>): void {
    this.alert(new Alert({
      ...options,
      type: AlertType.Info,
      autoClose: options?.autoClose ?? true,
      duration: options?.duration ?? AlertDuration.Default,
      message
    }));
  }

  warn(message: string, options?: Partial<Alert>): void {
    this.alert(new Alert({
      ...options,
      type: AlertType.Warning,
      autoClose: options?.autoClose ?? false,
      duration: options?.duration ?? AlertDuration.Long,
      message
    }));
  }

  // main alert method
  private alert(alert: Alert): void {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId): void {
    this.subject.next(new Alert({ id }));
  }

}
