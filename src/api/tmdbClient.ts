import { ENV } from "@/config/env";
import type { RequestOptions } from "./types";

/**
 * Core HTTP client untuk TMDB API
 * Tidak tahu movie, tv, atau UI
 */
export const tmdbClient = async <T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  const { method = "GET", params } = options;

  const url = new URL(`${ENV.TMDB_BASE_URL}${endpoint}`);

  // Tambahkan query params jika ada
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    method,
    headers: {
      Authorization: `Bearer ${ENV.TMDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`TMDB API Error ${response.status}: ${errorBody}`);
  }

  return response.json();
};
