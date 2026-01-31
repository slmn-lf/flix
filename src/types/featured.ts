/**
 * Featured Movie Domain Type
 * Public type used by featured service and components
 */

export interface FeaturedMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  posterUrl: string | null;
  logoUrl: string | null;
  trailerUrl: string | null;
  trailerKey: string | null;
}
