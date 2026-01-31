import type { TV } from "@/types/tv";
import type { PaginatedResponse } from "@/types/common";
import { tmdbClient } from "@/api/tmdbClient";
import { TMDB_ENDPOINTS } from "@/api/endpoints";

type TMDBTVShow = Omit<TV, "id"> & { id: number };
type TMDBTVResponse = PaginatedResponse<TMDBTVShow>;

export const getPopularTVShows = async (): Promise<TV[]> => {
  const data = await tmdbClient<TMDBTVResponse>(TMDB_ENDPOINTS.popularTV);

  return data.results.map((tv: TMDBTVShow) => ({
    id: tv.id,
    name: tv.name,
    original_name: tv.original_name,
    overview: tv.overview,
    poster_path: tv.poster_path,
    backdrop_path: tv.backdrop_path,
    first_air_date: tv.first_air_date,
    vote_average: tv.vote_average,
    popularity: tv.popularity,
  }));
};
