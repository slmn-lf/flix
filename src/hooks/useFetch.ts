import { useState, useEffect, useRef } from "react";
import type { UseFetchState } from "@/types/hooks";

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  // User can control refetch by changing dependencies
  dependencies: unknown[] = [],
): UseFetchState<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchFnRef = useRef(fetchFn);

  // Update ref when fetchFn changes
  useEffect(() => {
    fetchFnRef.current = fetchFn;
    // Intentional: user controls via dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencies]);

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      try {
        setState({ data: null, loading: true, error: null });
        const result = await fetchFnRef.current();

        if (isMounted) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          setState({ data: null, loading: false, error: errorMessage });
        }
      }
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
