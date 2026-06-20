import { useState, useEffect, useRef } from "react";
import type { UseFetchState } from "@/types/hooks";

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  dependencies: unknown[] = [],
): UseFetchState<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchFnRef = useRef(fetchFn);

  // Keep ref in sync without triggering effects
  useEffect(() => {
    fetchFnRef.current = fetchFn;
  });

  // Re-fetch whenever dependencies change
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
  }, [dependencies]);

  return state;
}
