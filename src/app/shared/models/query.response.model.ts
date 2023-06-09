export interface AacsbTable31 {
  disciplineTotal: number;
  creditTotal: number;
  teacherId: string;
  teacher: string;
  teacherEnglishName: string;
  teacherDepartment: string;
  degree: string;
  degreeYear: number;
  responsibilities: string;
  qualification: string;
  workType: 'P' | 'S' | null;
  discipline: number;
}

export interface Discipline {
  code: number;
  name: string;
  id: string;
}

export interface AuditLog {
  operator: string;
  resource: string;
  operation: string;
  command: string;
  response: number;
  created: string;
}

export interface AuthenticateInformation {
  token: string;
  refreshToken: string;
  expireOn: number;
}

export interface Users {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

export interface User extends Users {
  roles: string[];
  password?: string;
}

export interface Roles {
  id: string;
  name: string;
  description?: string;
}

export interface Role extends Roles {
  claims: string[];
}
