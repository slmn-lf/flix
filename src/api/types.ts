/**
 * Internal TMDB API Response Types
 * These types represent raw responses from TMDB API
 * Not meant to be exported or used by components directly
 */

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestOptions {
  method?: HttpMethod;
  params?: Record<string, string | number>;
}

export interface VideoResponse {
  results: {
    id: string;
    key: string;
    name: string;
    site: "YouTube" | "Vimeo";
    type: string;
    official: boolean;
  }[];
}

export interface ImageResponse {
  logos?: {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string | null;
    vote_average: number;
    vote_count: number;
  }[];
}
