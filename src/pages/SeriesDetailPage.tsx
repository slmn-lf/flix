import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { getTVDetail, getSeasonEpisodes } from "@/services/tvService";
import type { TVDetail, Episode } from "@/types/tv";
import { usePopupDetector } from "@/hooks/usePopupDetector";
import { getBackdropUrl } from "@/utils/image";
import { ChevronRight } from "lucide-react";

type VideoServer = "vidlink" | "vidsrc" | "vidnest" | "2embed" | "superembed";

const SeriesDetailPage = () => {
  const { seriesId } = useParams<{ seriesId: string }>();
  const navigate = useNavigate();
  const [tv, setTv] = useState<TVDetail | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeServer, setActiveServer] = useState<VideoServer>("vidlink");
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  usePopupDetector();

  useEffect(() => {
    if (!seriesId) {
      setError("Series ID not provided");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getTVDetail(parseInt(seriesId));
        setTv(data);
        setError(null);

        const firstSeason =
          data.seasons.find((s) => s.season_number > 0) ?? data.seasons[0];
        if (firstSeason) {
          setSelectedSeason(firstSeason.season_number);
        }
      } catch (err) {
        console.error("Error fetching TV details:", err);
        setError("Failed to fetch series details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [seriesId]);

  useEffect(() => {
    if (!seriesId || !selectedSeason) return;

    getSeasonEpisodes(parseInt(seriesId), selectedSeason)
      .then((res) => {
        setEpisodes(res.episodes);
        setSelectedEpisode(1);
      })
      .catch(console.error);
  }, [seriesId, selectedSeason]);

  const goToNextEpisode = useCallback(() => {
    const lastEp = episodes.length;
    if (selectedEpisode < lastEp) {
      setSelectedEpisode((e) => e + 1);
      return;
    }
    const seasons = tv?.seasons.filter((s) => s.season_number > 0) ?? [];
    const nextSeason = seasons.find((s) => s.season_number > selectedSeason);
    if (nextSeason) {
      setSelectedSeason(nextSeason.season_number);
    }
  }, [selectedEpisode, episodes.length, selectedSeason, tv?.seasons]);

  const getServerUrl = (server: VideoServer): string => {
    if (!tv) return "";
    switch (server) {
      case "vidlink":
        return `https://vidlink.pro/tv/${tv.id}/${selectedSeason}/${selectedEpisode}`;
      case "vidsrc":
        return `https://vidsrc.to/embed/tv/${tv.id}/${selectedSeason}/${selectedEpisode}`;
      case "vidnest":
        return `https://vidnest.fun/tv/${tv.id}/${selectedSeason}/${selectedEpisode}`;
      case "2embed":
        return `https://www.2embed.cc/embedtv/${tv.id}&s=${selectedSeason}&e=${selectedEpisode}`;
      case "superembed":
        return `https://multiembed.monster/direct.php?video_id=${tv.id}&tmdb=1&s=${selectedSeason}&e=${selectedEpisode}`;
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="mb-4 text-white">Loading series details...</div>
          <div className="w-8 h-8 border-4 border-gray-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !tv) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="mb-4 text-red-400">{error || "Series not found"}</div>
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
        <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-900 shadow-2xl mb-6">
          <iframe
            key={`${activeServer}-${selectedSeason}-${selectedEpisode}`}
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
            onClick={() => navigate("/series")}
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition text-sm font-semibold"
          >
            ← Back
          </button>

          <select
            value={activeServer}
            onChange={(e) => setActiveServer(e.target.value as VideoServer)}
            className="px-3 py-2 rounded bg-gray-700 text-white border-none cursor-pointer text-sm"
          >
            <option value="vidlink">VidLink</option>
            <option value="vidsrc">VidSrc</option>
            <option value="vidnest">VidNest</option>
            <option value="2embed">2Embed</option>
            <option value="superembed">SuperEmbed</option>
          </select>

          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(Number(e.target.value))}
            className="px-3 py-2 rounded bg-gray-700 text-white border-none cursor-pointer text-sm"
          >
            {tv.seasons
              .filter((s) => s.season_number > 0)
              .map((s) => (
                <option key={s.id} value={s.season_number}>
                  {s.name}
                </option>
              ))}
          </select>

          <button
            onClick={goToNextEpisode}
            disabled={selectedEpisode >= episodes.length && !tv?.seasons.some((s) => s.season_number > selectedSeason)}
            className="flex items-center gap-1 px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600
              disabled:opacity-30 disabled:cursor-not-allowed transition text-sm font-semibold"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{tv.name}</h1>
          {tv.tagline && (
            <p className="text-gray-400 italic mb-2">{tv.tagline}</p>
          )}
          <p className="text-gray-300 text-lg mb-4">{tv.overview}</p>

          <div className="flex gap-4 text-sm text-gray-400 mb-6 flex-wrap">
            {tv.first_air_date && (
              <div>
                <span className="text-white font-semibold">First Air: </span>
                {new Date(tv.first_air_date).toLocaleDateString()}
              </div>
            )}
            {tv.vote_average && (
              <div>
                <span className="text-white font-semibold">Rating: </span>
                {tv.vote_average.toFixed(1)}/10
              </div>
            )}
            <div>
              <span className="text-white font-semibold">Seasons: </span>
              {tv.number_of_seasons}
            </div>
            <div>
              <span className="text-white font-semibold">Episodes: </span>
              {tv.number_of_episodes}
            </div>
            <div>
              <span className="text-white font-semibold">Status: </span>
              {tv.status}
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-3">
            Season {selectedSeason} — Episodes
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {episodes.map((ep) => (
              <button
                key={ep.id}
                onClick={() => setSelectedEpisode(ep.episode_number)}
                className={`text-left rounded-lg overflow-hidden transition border-2 ${
                  selectedEpisode === ep.episode_number
                    ? "border-white"
                    : "border-transparent hover:border-gray-500"
                }`}
              >
                <div className="aspect-video bg-gray-800 relative">
                  <img
                    src={getBackdropUrl(ep.still_path, "small")}
                    alt={ep.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/70 text-xs px-1.5 py-0.5 rounded">
                    {ep.episode_number}
                  </div>
                </div>
                <div className="p-2 bg-gray-900">
                  <p className="text-sm font-medium truncate">
                    {ep.episode_number}. {ep.name}
                  </p>
                  {ep.runtime && (
                    <p className="text-xs text-gray-400">{ep.runtime} min</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailPage;
