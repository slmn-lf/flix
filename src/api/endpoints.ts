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
  trendingTV: "/trending/tv/week",

  // Movie detail (dynamic)
  movieDetail: (movieId: number) => `/movie/${movieId}`,
  movieVideos: (movieId: number) => `/movie/${movieId}/videos`,
  movieImages: (movieId: number) => `/movie/${movieId}/images`,

  // Search
  searchMovies: "/search/movie",
  searchTV: "/search/tv",
  searchMulti: "/search/multi",

  // TV Shows
  popularTV: "/tv/popular",
  topRatedTV: "/tv/top_rated",
  onTheAirTV: "/tv/on_the_air",
  tvDetail: (tvId: number) => `/tv/${tvId}`,
  tvSeasonEpisodes: (tvId: number, seasonNumber: number) =>
    `/tv/${tvId}/season/${seasonNumber}`,

  // Discover
  discoverMovie: "/discover/movie",
  discoverTV: "/discover/tv",

  // Configuration
  configuration: "/configuration",
};
