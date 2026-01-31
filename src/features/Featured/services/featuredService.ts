import { tmdbClient } from "@/api/tmdbClient";
import { TMDB_ENDPOINTS } from "@/api/endpoints";
import { ENV } from "@/config/env";
import type { VideoResponse, ImageResponse } from "@/api/types";
import type { FeaturedMovie } from "@/types/featured";
import type { Movie } from "@/types/movie";
import type { PaginatedResponse } from "@/types/common";
import type { MovieCardData } from "@/types/row";

const buildImageUrl = (
  path: string | null,
  size: string = "original",
): string | null => {
  if (!path) return null;
  return `${ENV.TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

const getTrailerUrl = async (
  movieId: number,
): Promise<{ url: string | null; key: string | null }> => {
  try {
    const response = await tmdbClient<VideoResponse>(
      TMDB_ENDPOINTS.movieVideos(movieId),
      { params: { language: "en-US" } },
    );

    // Cari YouTube trailer yang official
    const trailer =
      response.results.find(
        (video) =>
          video.site === "YouTube" &&
          video.type === "Trailer" &&
          video.official,
      ) ||
      response.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer",
      );

    if (!trailer) {
      return { url: null, key: null };
    }

    const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
    return { url: trailerUrl, key: trailer.key };
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return { url: null, key: null };
  }
};

const getLogoUrl = async (movieId: number): Promise<string | null> => {
  try {
    const response = await tmdbClient<ImageResponse>(
      TMDB_ENDPOINTS.movieImages(movieId),
      { params: { language: "en-US" } },
    );

    if (!response.logos || response.logos.length === 0) {
      return null;
    }

    // Ambil logo dengan vote_average tertinggi
    const bestLogo = response.logos.reduce((prev, current) =>
      prev.vote_average > current.vote_average ? prev : current,
    );

    return buildImageUrl(bestLogo.file_path, "w500");
  } catch (error) {
    console.error("Error fetching logo:", error);
    return null;
  }
};

/**
 * Fetch featured movie dari trending minggu ini
 * Mengambil backdrop, logo, dan trailer video
 */
export const fetchFeaturedMovie = async (): Promise<FeaturedMovie> => {
  try {
    // Get trending movie dari minggu ini
    const trendingResponse = await tmdbClient<PaginatedResponse<Movie>>(
      TMDB_ENDPOINTS.trendingMoviesWeek,
      { params: { page: 1, language: "en-US" } },
    );

    if (!trendingResponse.results || trendingResponse.results.length === 0) {
      throw new Error("No trending movies found");
    }

    // Ambil film pertama
    const movie = trendingResponse.results[0];

    // Fetch trailer dan logo secara parallel
    const [trailerData, logoUrl] = await Promise.all([
      getTrailerUrl(movie.id),
      getLogoUrl(movie.id),
    ]);

    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      backdrop_path: movie.backdrop_path,
      posterUrl: buildImageUrl(movie.poster_path, "w500"),
      logoUrl,
      trailerUrl: trailerData.url,
      trailerKey: trailerData.key,
    };
  } catch (error) {
    console.error("Error fetching featured movie:", error);
    throw error;
  }
};

/**
 * Fetch featured movie berdasarkan ID spesifik
 * Gunakan ini jika sudah tahu movie ID nya
 */
export const fetchFeaturedMovieById = async (
  movieId: number,
): Promise<FeaturedMovie> => {
  try {
    const movieDetail = await tmdbClient<Movie>(
      TMDB_ENDPOINTS.movieDetail(movieId),
      { params: { language: "en-US" } },
    );

    const [trailerData, logoUrl] = await Promise.all([
      getTrailerUrl(movieDetail.id),
      getLogoUrl(movieDetail.id),
    ]);

    return {
      id: movieDetail.id,
      title: movieDetail.title,
      overview: movieDetail.overview,
      backdrop_path: movieDetail.backdrop_path,
      posterUrl: buildImageUrl(movieDetail.poster_path, "w500"),
      logoUrl,
      trailerUrl: trailerData.url,
      trailerKey: trailerData.key,
    };
  } catch (error) {
    console.error("Error fetching featured movie by ID:", error);
    throw error;
  }
};

/**
 * ⚠️ EXPERIMENTAL
 * merge 2 endpoint untuk mendapatkan popular movies dengan logo
 * Fetch popular movies with logos (20 items max).
 * Do NOT use for large rows in production.
 */

export const fetchPopularRow = async (): Promise<MovieCardData[]> => {
  const res = await tmdbClient<PaginatedResponse<Movie>>(
    TMDB_ENDPOINTS.popularMovies,
    { params: { page: 1, language: "en-US" } },
  );

  return res.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    posterUrl: buildImageUrl(movie.poster_path),
    logoUrl: "",
  }));
};

export const fetchPopularRowWithLogos = async (): Promise<MovieCardData[]> => {
  const popular = await fetchPopularRow();

  const limited = popular.slice(0, 20);

  const enriched = await Promise.all(
    limited.map(async (movie) => {
      const logoUrl = await getLogoUrl(movie.id);
      return {
        ...movie,
        logoUrl,
      };
    }),
  );

  return enriched.filter(
    (movie): movie is MovieCardData => movie.logoUrl !== null,
  );
};
