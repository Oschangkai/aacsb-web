export class Alert {
  id: string = defaultId;
  type: AlertType = AlertType.Info;
  message?: string;
  autoClose?: boolean;
  keepAfterRouteChange = false;
  fade = true;
  duration?: AlertDuration = AlertDuration.Default;
  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}

export const defaultId = 'default-alert';

export enum AlertType {
  Success = 'success',
  Error = 'danger',
  Info = 'info',
  Warning = 'warning'
}

export enum AlertDuration {
  Short = 1600,
  Default = 3000,
  Long = 7500
}
