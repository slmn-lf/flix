import { tmdbClient } from "@/api/tmdbClient";
import { TMDB_ENDPOINTS } from "@/api/endpoints";

interface MultiSearchResult {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  popularity: number;
  release_date?: string;
  first_air_date?: string;
}

export const searchMulti = async (
  query: string,
  page: number = 1
): Promise<{
  results: MultiSearchResult[];
  totalPages: number;
  totalResults: number;
  page: number;
}> => {
  const data = await tmdbClient<{
    page: number;
    results: MultiSearchResult[];
    total_pages: number;
    total_results: number;
  }>(TMDB_ENDPOINTS.searchMulti, {
    params: { query, page, language: "en-US" },
  });

  return {
    results: data.results.filter(
      (r) => r.media_type === "movie" || r.media_type === "tv"
    ),
    totalPages: data.total_pages,
    totalResults: data.total_results,
    page: data.page,
  };
};
