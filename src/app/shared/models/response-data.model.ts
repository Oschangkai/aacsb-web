export interface MissingDataTeacherList {
  teacher: string;
  teacherEnglishName?: string;
  degree?: string;
  degreeYear?: number;
  responsibilities?: string;
  qualification?: string;
  teacherId: string;
}

export interface NullDisciplineCourseList {
  course?: string;
  courseCode?: string;
  teacher?: string;
  teacherEnglishName?: string;
  courseDepartment?: string;
  semester?: number;
  courseId: string;
  teacherId: string;
}

export interface TeacherList {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  qualificationId: string;
  degree: string;
  degreeYear: number;
  responsibilities: string;
  workTypeAbbr: string;
}

export interface CourseList {
  id: string;
  semester: string;
  code?: string;
  name?: string;
  departmentId?: string;
  disciplineId: string;
  importSignatureId: string;
}

export interface AacsbTable32 {
  qualification: null | 'SA' | 'SP' | 'IP' | 'PA' | 'A';
  percentage: number;
}

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

export interface Qualification {
  id: string;
  description: string;
  englishDescription: string;
  abbreviation: string;
}

export interface Department {
  id: string;
  name: string;
  englishName: string;
  abbreviation: string;
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
