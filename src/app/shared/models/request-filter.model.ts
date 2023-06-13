export type PaginationFilter = {
  pageNumber: number;
  pageSize: number;
  orderBy?: string[];
} & BaseFilter;

export type BaseFilter = {
  // search selected fields (can contain deeper nested fields), FilterOperator.CONTAINS
  advancedSearch?: Search;
  // search all fields (only first level), FilterOperator.CONTAINS
  keyword?: string;
  advancedFilter?: Filter;
}

export type Search = {
  fields?: string[];
  keyword?: string;
}

export type Filter = {
  // if 'logic' provided, 'filters' cannot be null
  logic?: FilterLogic;
  filters?: Filter[];
  // if 'logic' not provided, 'field', 'operator', and 'value' cannot be null
  field?: string;
  operator?: FilterOperator;
  value?: object;
}

export enum FilterOperator {
  EQ = "eq",
  NEQ = "neq",
  LT = "lt",
  LTE = "lte",
  GT = "gt",
  GTE = "gte",
  STARTSWITH = "startswith",
  ENDSWITH = "endswith",
  CONTAINS = "contains"
}

export enum FilterLogic {
  AND = "and",
  OR = "or",
  XOR = "xor"
}
/**
 * {
  "advancedSearch": {
    "fields": [
      "string"
    ],
    "keyword": "string"
  },
  "keyword": "string",
  "advancedFilter": {
    "logic": "string",
    "filters": [
      "string"
    ],
    "field": "string",
    "operator": "string",
    "value": "string"
  },
  "pageNumber": 0,
  "pageSize": 0,
  "orderBy": [
    "string"
  ]
}
 */