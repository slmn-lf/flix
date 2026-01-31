/**
 * Custom React Hook Types
 * Public types for hook state management
 */

export interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
