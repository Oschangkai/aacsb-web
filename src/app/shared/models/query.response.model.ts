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
