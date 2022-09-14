import { JwtPayload } from 'jwt-decode';

export type ApplicationToken = {
  'ip': string;
  'email': string;
  'uid': string;
  'AACSB.Role': string[];
  'AACSB.Permission': string[];
} & JwtPayload;
