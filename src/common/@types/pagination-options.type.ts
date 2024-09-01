export type PaginationOptions = {
  page: number;
  limit: number;
  sort: Record<string, number>;
  offset: number;
  populate?: any[];
};
