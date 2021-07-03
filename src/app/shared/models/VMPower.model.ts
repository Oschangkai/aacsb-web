export enum PowerOperation {
  Deallocate = 'deallocate',
  Reboot = 'reboot',
  Start = 'start',
  Stop = 'stop',
  None = ''
}

export enum PowerState {
  Running = 'running',
  Deallocating = 'deallocating',
  Deallocated = 'deallocated',
  Starting = 'starting',
  Stopped = 'stopped',
  Stopping = 'stopping',
  Unknown = 'unknown'
}
