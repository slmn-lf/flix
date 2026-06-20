import { Volume2, VolumeX } from "lucide-react";
import { useNavigate } from "react-router";

type Props = {
  id: number;
  title: string;
  overview: string;
  logoUrl?: string | null;
  onToggle?: () => void;
  isMuted?: boolean;
  showTrailer?: boolean;
};

export function HeroContent({
  id,
  title,
  overview,
  logoUrl,
  onToggle,
  isMuted,
  showTrailer,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="relative z-10 flex h-full items-end">
      <div className="max-w-xl px-4 sm:px-8 md:px-12 pb-16 md:pb-24 text-white">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={title}
            className="mb-2 md:mb-6 w-24 md:w-64"
          />
        ) : (
          <h1 className="mb-2 md:mb-4 text-xl md:text-5xl font-bold">
            {title}
          </h1>
        )}

        <p className="hidden md:block mb-6 text-sm leading-relaxed text-white/90">
          {overview}
        </p>

        <div className="flex gap-2 md:gap-3">
          <button
            onClick={() => navigate(`/movie/${id}`)}
            className="rounded bg-white px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-base text-black font-semibold hover:bg-white/80 transition"
          >
            Play
          </button>
          <button
            onClick={() => navigate(`/movie/${id}`)}
            className="rounded bg-white/30 px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-base font-semibold hover:bg-white/40 transition hidden md:inline-block"
          >
            More Info
          </button>
          {showTrailer && onToggle && (
            <button
              onClick={onToggle}
              className="rounded bg-white/30 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-base font-semibold hover:bg-white/40 transition flex items-center gap-1"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
