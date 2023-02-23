
/**
 * REST response structure
 */
export interface IRequestInterface<T> {
  status: number;
  dto: T | string | null | undefined;
}
