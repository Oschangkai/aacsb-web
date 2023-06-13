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
