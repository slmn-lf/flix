import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { tmdbClient } from "@/api/tmdbClient";
import { TMDB_ENDPOINTS } from "@/api/endpoints";
import type { Movie } from "@/types/movie";

type VideoServer = "vidlink" | "vidsrc" | "vidnest" | "2embed" | "superembed";

const serverLabels: Record<VideoServer, string> = {
  vidlink: "VidLink",
  vidsrc: "VidSrc",
  vidnest: "VidNest",
  "2embed": "2Embed",
  superembed: "SuperEmbed",
};

const DetailMoviePage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeServer, setActiveServer] = useState<VideoServer>("vidlink");

  useEffect(() => {
    if (!movieId) {
      setError("Movie ID not provided");
      setLoading(false);
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);

        const movieData = await tmdbClient<Movie>(
          TMDB_ENDPOINTS.movieDetail(parseInt(movieId)),
        );

        setMovie(movieData);
        setError(null);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId, navigate]);

  const getServerUrl = (server: VideoServer): string => {
    if (!movie) return "";

    switch (server) {
      case "vidlink":
        return `https://vidlink.pro/movie/${movie.id}?primaryColor=63b8bc&secondaryColor=a2a2a2&iconColor=eefdec&icons=default&player=jw&title=true&poster=true&autoplay=true&nextbutton=true`;
      case "vidsrc":
        return `https://vidsrc.to/embed/movie/${movie.id}`;
      case "vidnest":
        return `https://vidnest.fun/movie/${movie.id}`;
      case "2embed":
        return `https://www.2embed.cc/embed/${movie.id}`;
      case "superembed":
        return `https://multiembed.monster/direct.php?video_id=${movie.id}&tmdb=1`;
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="mb-4 text-white">Loading movie details...</div>
          <div className="w-8 h-8 border-4 border-gray-800 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="mb-4 text-red-400">{error || "Movie not found"}</div>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-white text-black rounded hover:bg-gray-200"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-900 shadow-2xl mb-8">
          <iframe
            key={activeServer}
            src={getServerUrl(activeServer)}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            allow="fullscreen"
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition text-sm font-semibold"
          >
            ← Back
          </button>

          <select
            value={activeServer}
            onChange={(e) => setActiveServer(e.target.value as VideoServer)}
            className="px-3 py-2 rounded bg-gray-700 text-white border-none cursor-pointer text-sm"
          >
            {(Object.keys(serverLabels) as VideoServer[]).map((s) => (
              <option key={s} value={s}>
                {serverLabels[s]}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-300 text-lg mb-6">{movie.overview}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
            {movie.release_date && (
              <div>
                <span className="text-white font-semibold">Release Date: </span>
                {new Date(movie.release_date).toLocaleDateString()}
              </div>
            )}
            {movie.vote_average && (
              <div>
                <span className="text-white font-semibold">Rating: </span>
                {movie.vote_average.toFixed(1)}/10
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default DetailMoviePage;
