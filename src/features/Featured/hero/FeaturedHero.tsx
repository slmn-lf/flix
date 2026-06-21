import { useState, useEffect, useRef } from "react";
import { mockFeatured } from "./mockFeatured";
import { HeroContent } from "./HeroContent";
import { HeroMedia } from "./HeroMedia";
import HeroGradient from "./HeroGradient";
import HeroSkeleton from "@/components/HeroSkeleton";
import { getBackdropUrl } from "@/utils/image";
import { fetchFeaturedMovie } from "../services/featuredService";
import type { FeaturedMovie } from "@/types";

export default function FeaturedHero() {
  const [mode, setMode] = useState<"trailer" | "banner">("trailer");
  const [featured, setFeatured] = useState<FeaturedMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [splash, setSplash] = useState(true);
  const [countdown, setCountdown] = useState(8);
  const [muted, setMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleToggle = () => {
    const func = muted ? "unMute" : "mute";
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*",
    );
    setMuted(!muted);
  };

  const showTrailerMode = !splash && mode === "trailer";

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

  useEffect(() => {
    if (!featured || !splash) return;
    const timer = setTimeout(() => setSplash(false), 8000);
    return () => clearTimeout(timer);
  }, [featured, splash]);

  useEffect(() => {
    if (!splash) return;
    setCountdown(10);
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [splash]);

  if (loading) {
    return <HeroSkeleton />;
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

  const showOverlay = !splash;

  return (
    <section className="relative w-full overflow-hidden bg-black aspect-video md:h-[85vh]">
      <HeroMedia
        ref={iframeRef}
        backdropUrl={getBackdropUrl(featured.backdrop_path, "original")}
        trailerUrl={featured.trailerUrl}
        mode={mode}
        onTrailerEnd={() => setMode("banner")}
        visible={!splash}
      />

      {/* Splash — backdrop + gradient + content, auto fade out 7s */}
      <div
        className={`absolute inset-0 z-30 transition-opacity duration-700 ${splash ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <img
          src={getBackdropUrl(featured.backdrop_path, "original")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <HeroGradient />
        <HeroContent
          id={featured.id}
          title={featured.title}
          overview={featured.overview}
          logoUrl={featured.logoUrl}
          countdown={countdown}
        />
      </div>

      {/* Gradient & content — setelah splash */}
      {showOverlay && <HeroGradient />}
      {showOverlay && (
        <HeroContent
          id={featured.id}
          title={featured.title}
          overview={featured.overview}
          logoUrl={featured.logoUrl}
          onToggle={handleToggle}
          isMuted={muted}
          showTrailer={showTrailerMode}
        />
      )}
    </section>
  );
}
