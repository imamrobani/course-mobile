export type ApiResponse<T> = {
  data: T;
  status: number;
  message?: string;
};

export type ErrorResponse = {
  success: false;
  message: string;
  statusCode?: number;
};

export type PaginatedResponse<T> = ApiResponse<T[]> & PaginationResponse;

export type PaginationResponse = {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly total_pages: number;
  readonly has_next: boolean;
  readonly has_prev: boolean;
  readonly next_page: number | null;
  readonly prev_page: number | null;
};
