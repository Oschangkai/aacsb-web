import { JwtPayload } from 'jwt-decode';

export type ApplicationToken = {
  'fullName': string;
  'email': string;
  'image_url': string
  'uid': string;
  'tenant': string;
  'permission': string[];
} & JwtPayload;
