export type EditTeacher = {
  id: string;
  name: string;
  englishName: string | null;
  workTypeAbbr: string | null;
  degree: string | null;
  degreeYear: number | null;
  departmentId: string | null;
  email: string | null;
  qualificationId: string | null;
  resignDate: Date|string | null;
  title: string | null;
  responsibilities: string | null;
}
export type DeleteCoursesRequest = {
  semester: string;
  importSignatureId: string;
}
export type CollectCoursesRequest = {
  year: number;
  semester: number;
  department?: string[];
}
export type AuditLogQuery = {
  PageSize: number;
  PageNumber: number;
  Operator: string;
  StartDateTime: string;
  EndDateTime: string;
};
