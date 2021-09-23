import { environment } from '@environment/environment';

export class EnvironmentService {

  // The values that are defined here are the default values that can
  // be overridden by env.js

  public api = environment.api;
  public production  = environment.production;

  constructor() { }
}
