/**
 * Kumpulan endpoint TMDB
 * Hanya definisi URL, tidak ada logic
 */
export const TMDB_ENDPOINTS = {
  // Movies
  popularMovies: "/movie/popular",
  topRatedMovies: "/movie/top_rated",
  upcomingMovies: "/movie/upcoming",

  // Trending
  trendingMoviesWeek: "/trending/movie/week",

  // Movie detail (dynamic)
  movieDetail: (movieId: number) => `/movie/${movieId}`,
  movieVideos: (movieId: number) => `/movie/${movieId}/videos`,
  movieImages: (movieId: number) => `/movie/${movieId}/images`,

  // Search
  searchMovies: "/search/movie",

  // TV Shows
  popularTV: "/tv/popular",
  topRatedTV: "/tv/top_rated",
  onTheAirTV: "/tv/on_the_air",

  // Configuration
  configuration: "/configuration",
};
