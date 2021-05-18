export interface WebAppInstanceStatus {
  cpu: { id: string, records: WebAppInstanceCpuRecord[] };
  memory: { id: string, records: WebAppInstanceMemoryRecord[] };
  location: string;
  queryDateTimeRange: { startTime: string, endTime: string };
}
export interface WebAppInstanceCpuRecord {
  timestamp: string;
  machineName: string;
  overallCPUPercent: number;
}
export interface WebAppInstanceMemoryRecord {
  timestamp: string;
  machineName: string;
  percentPhysicalMemoryUsed: number;
  privateBytes: number;
}
export interface WebAppInstance {
  id: string;
  name: string;
  location: string;
  state: string;
  machineName: string;
}
export interface WebApps {
  id: string;
  regionName: string;
  resourceGroupName: string;
  serverFarmId: string;
}
export interface AzureStatusMessage {
  code: string;
  message: string;
}

export interface FailureMailEvents {
  reason: string;
  created: number;
  category: string;
  email: string;
  status: string;
}

export interface Users {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  enabled: boolean;
}

export interface User extends Users {
  roles: string[];
}

export interface Roles {
  id: string;
  name: string;
}

export interface Role extends Roles {
  claims: string[];
}
