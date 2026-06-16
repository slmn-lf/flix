import type { TV, TVDetail, Episode } from "@/types/tv";
import type { PaginatedResponse } from "@/types/common";
import { tmdbClient } from "@/api/tmdbClient";
import { TMDB_ENDPOINTS } from "@/api/endpoints";

type TMDBTVShow = Omit<TV, "id"> & { id: number };
type TMDBTVResponse = PaginatedResponse<TMDBTVShow>;

export const getPopularTVShows = async (
  page: number = 1
): Promise<{ tvShows: TV[]; totalPages: number; page: number }> => {
  const data = await tmdbClient<TMDBTVResponse>(TMDB_ENDPOINTS.popularTV, {
    params: { page, language: "en-US" },
  });

  return {
    tvShows: data.results.map((tv: TMDBTVShow) => ({
      id: tv.id,
      name: tv.name,
      original_name: tv.original_name,
      overview: tv.overview,
      poster_path: tv.poster_path,
      backdrop_path: tv.backdrop_path,
      first_air_date: tv.first_air_date,
      vote_average: tv.vote_average,
      popularity: tv.popularity,
    })),
    totalPages: data.total_pages,
    page: data.page,
  };
};

export const getTVDetail = async (tvId: number): Promise<TVDetail> => {
  return tmdbClient<TVDetail>(TMDB_ENDPOINTS.tvDetail(tvId), {
    params: { language: "en-US" },
  });
};

export const getSeasonEpisodes = async (
  tvId: number,
  seasonNumber: number
): Promise<{
  episodes: Episode[];
  seasonNumber: number;
}> => {
  const data = await tmdbClient<{
    id: number;
    episodes: Episode[];
    season_number: number;
  }>(TMDB_ENDPOINTS.tvSeasonEpisodes(tvId, seasonNumber), {
    params: { language: "en-US" },
  });

  return { episodes: data.episodes, seasonNumber: data.season_number };
};
