import { useEffect, useState } from "react";
import FeaturedHero from "@/features/Featured/hero/FeaturedHero";
import type { MovieCardData } from "@/types/row";
import MovieRow from "@/features/Featured/movie-row/MovieRow";
import { fetchPopularRowWithLogos } from "@/features/Featured/services/featuredService";

export default function HomePage() {
  const [popular, setPopular] = useState<MovieCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularRowWithLogos()
      .then((data) => setPopular(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="mb-4">Loading popular movies...</div>
          <div className="w-8 h-8 border-4 border-gray-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FeaturedHero />
      <div>
        <MovieRow title="Popular Movies" items={popular} />
      </div>
    </div>
  );
}
{
  /* TEST COMPONENT - to be removed later
  import { useEffect, useState } from "react";
  import MovieCard from "@/features/Featured/movie-card/component/MovieCard";
  import { fetchFeaturedMovie } from "@/features/Featured/services/featuredService";
  import type { FeaturedMovie } from "@/types";
    
  
 
      
      const [featured, setFeatured] = useState<FeaturedMovie | null>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        fetchFeaturedMovie()
          .then(setFeatured)
          .finally(() => setLoading(false));
      }, []);

      if (loading) return <div>Loading...</div>;
      if (!featured) return null;


       <MovieCard
        title={featured.title}
        posterUrl={featured.posterUrl ?? ""}
        logoUrl={featured.logoUrl}
        />
      */
}
