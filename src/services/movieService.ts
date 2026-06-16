import { tmdbClient } from "@/api/tmdbClient";
import { TMDB_ENDPOINTS } from "@/api/endpoints";
import type { PaginatedResponse } from "@/types/common";
import type { Movie } from "@/types/movie";

interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  popularity: number;
}

type TMDBMovieResponse = PaginatedResponse<TMDBMovie>;

export const getPopularMovies = async (
  page: number = 1
): Promise<{ movies: Movie[]; totalPages: number; page: number }> => {
  const data = await tmdbClient<TMDBMovieResponse>(
    TMDB_ENDPOINTS.popularMovies,
    { params: { page, language: "en-US" } }
  );

  return {
    movies: data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      popularity: movie.popularity,
    })),
    totalPages: data.total_pages,
    page: data.page,
  };
};
