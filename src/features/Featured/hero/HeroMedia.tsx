import { useEffect, useRef } from "react";

interface HeroMediaProps {
  backdropUrl: string;
  trailerUrl: string | null;
  mode: "trailer" | "banner";
  onTrailerEnd: () => void;
}

export function HeroMedia({
  backdropUrl,
  trailerUrl,
  mode,
  onTrailerEnd,
}: HeroMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Auto stop trailer after 30 seconds and pause on scroll
  useEffect(() => {
    if (mode !== "trailer") return;

    // Set a timeout to switch to banner mode after 30 seconds
    const autoStopTimer = setTimeout(() => {
      onTrailerEnd();
    }, 40000); // 40 seconds

    // Auto unmute after 2 seconds to play audio
    const unmuteTimer = setTimeout(() => {
      const tryUnmute = () => {
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage(
            { event: "command", func: "unMute" },
            "https://www.youtube.com",
          );
        }
      };

      // Retry a few times since YouTube iframe may not be ready immediately
      tryUnmute();
      const retryInterval = setInterval(() => {
        if (document.hidden) {
          clearInterval(retryInterval);
          return;
        }
        tryUnmute();
      }, 500);

      setTimeout(() => clearInterval(retryInterval), 5000);
    }, 2000);

    // Intersection Observer to pause when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && iframeRef.current) {
            // Element is not visible, pause by changing mode
            onTrailerEnd();
          }
        });
      },
      { threshold: 0.5 }, // Trigger when less than 50% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearTimeout(autoStopTimer);
      clearTimeout(unmuteTimer);
      observer.disconnect();
    };
  }, [mode, onTrailerEnd]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {mode === "trailer" && trailerUrl ? (
        <iframe
          ref={iframeRef}
          src={`${trailerUrl}?autoplay=1&mute=1&controls=1&modestbranding=1&fs=0&enablejsapi=1`}
          title="Featured trailer"
          className="absolute inset-0 h-full w-full"
          style={{ transformOrigin: "center" }}
          allow="autoplay *; encrypted-media"
          allowFullScreen
        />
      ) : (
        <img
          src={backdropUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
