import { JwtPayload } from 'jwt-decode';

export type ApplicationToken = {
  'ip': string;
  'email': string;
  'uid': string;
  'MAYOBoardroom.Role': string[];
  'MAYOBoardroom.Permission': string[];
} & JwtPayload;
