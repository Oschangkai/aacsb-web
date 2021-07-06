export type BaseResponse = {
  succeeded: boolean;
  message: string;
};
export type SimpleResponse<T> = {
  errors?: string;
  data: T;
  count: number;
} & BaseResponse;

export type PaginationResponse<T> = {
  pageNumber: number;
  pageSize: number;
} & SimpleResponse<T>;

export type ResponseData<T> = {
  data: T[];
  count: number;
  [x: string]: any;
};
