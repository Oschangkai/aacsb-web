export interface FailureMailEvents {
  reason: string;
  created: number;
  category: string;
  email: string;
  status: string;
}

export interface Users {
  id: string;
  userName: string;
  email: string;
  roles: string[];
  enabled: boolean;
}

// tslint:disable-next-line:no-empty-interface
export interface User extends Users {

}

export interface Roles {
  id: string;
  name: string;
}

export interface Role extends Roles {
  claims: string[];
}
