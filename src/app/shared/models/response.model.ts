export interface JobEnqueuedResponse {
  jobId: string;
  jobUrl: string;
}

export type MessageResponse = {
  succeeded: boolean;
  message: string;
};

export type PaginationResponse<T> = {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type ResponseData<T> = {
  data: T[];
  [x: string]: any;
};
