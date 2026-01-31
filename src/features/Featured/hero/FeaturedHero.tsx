import { useState, useEffect } from "react";
import { mockFeatured } from "./mockFeatured";
import { HeroContent } from "./HeroContent";
import { HeroMedia } from "./HeroMedia";
import HeroGradient from "./HeroGradient";
import { fetchFeaturedMovie } from "../services/featuredService";
import type { FeaturedMovie } from "@/types";

export default function FeaturedHero() {
  const [mode, setMode] = useState<"trailer" | "banner">("trailer");
  const [featured, setFeatured] = useState<FeaturedMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedMovie();
        setFeatured(data);
      } catch (err) {
        console.error("Failed to load featured movie:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load featured movie",
        );
        // Fallback ke mock data
        setFeatured({
          id: 0,
          title: mockFeatured.title,
          overview: mockFeatured.overview,
          backdrop_path: null,
          posterUrl: null,
          logoUrl: mockFeatured.logoUrl,
          trailerUrl: mockFeatured.trailerUrl,
          trailerKey: null,
        });
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  if (loading) {
    return (
      <section className="relative h-[85vh] w-full overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="mb-4">Loading featured content...</div>
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </section>
    );
  }

  if (!featured) {
    return (
      <section className="relative h-[85vh] w-full overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p>Failed to load featured content</p>
          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-black">
      <HeroMedia
        backdropUrl={featured.posterUrl || mockFeatured.backdropUrl}
        trailerUrl={featured.trailerUrl}
        mode={mode}
        onTrailerEnd={() => setMode("banner")}
      />

      <HeroGradient />

      <HeroContent
        title={featured.title}
        overview={featured.overview}
        logoUrl={featured.logoUrl}
      />
    </section>
  );
}
