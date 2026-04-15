/**
 * Generic state properties to manage loading, error states, and data.
 * @template T - Type of the data contained in the state.
 */
export type BaseStateProps<T> = {
  data: T;
  isLoading: boolean;
  isLoadingMore?: boolean;
  isError: boolean;
  error: any;
};

export type BaseSliceProps = {
  isLoading: boolean;
  isError: boolean;
  error: any;
};

/**
 * Pagination properties for paginated list states.
 */
export type Pagination = {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
};

/**
 * Type for paginated list states that combines base state properties and pagination
 * @template T - Type of the data array
 */
export type PagedState<T> = BaseStateProps<T[]> & Pagination;
