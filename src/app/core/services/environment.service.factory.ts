import { EnvironmentService } from './environment.service';

export const EnvironmentServiceFactory = () => {
  // Create env
  const environment = new EnvironmentService();

  // Read environment variables from browser window
  // @ts-ignore
  const browserWindowEnv = (window && window.__env) || {};

  // Assign environment variables from browser window to env
  // In the current implementation, properties from environment.js overwrite defaults from the EnvironmentService.
  // If needed, a deep merge can be performed here to merge properties instead of overwriting them.
  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      // @ts-ignore
      environment[key] = window.__env[key];
    }
  }

  return environment;
};
