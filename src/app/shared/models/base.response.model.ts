export type BaseResponse<T> = {
  succeeded: boolean;
  message?: string;
  errors?: string;
  data?: ResponseData<T>;
  count?: number;
};

export type PaginationResponse<T> = {
  pageNumber: number;
  pageSize: number;
} & BaseResponse<T>;

export type ResponseData<T> = {
  data: T[];
  count: number;
  [x: string]: any;
};
