import { useEffect, useState, useTransition } from "react";
import { useSearchParams, Link } from "react-router";
import { searchMulti } from "@/services/searchService";
import { getPosterUrl } from "@/utils/image";
import CardSkeleton from "@/components/CardSkeleton";

interface SearchResult {
  id: number;
  media_type: "movie" | "tv";
  title: string;
  poster_path: string | null;
}

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!query) {
      startTransition(() => {
        setResults([]);
        setTotalPages(1);
        setLoading(false);
      });
      return;
    }

    startTransition(() => setLoading(true));
    searchMulti(query, page)
      .then((res) => {
        startTransition(() => {
          setResults(
            res.results.map((r) => ({
              id: r.id,
              media_type: r.media_type as "movie" | "tv",
              title: r.title || r.name || "",
              poster_path: r.poster_path,
            }))
          );
          setTotalPages(res.totalPages > 500 ? 500 : res.totalPages);
          setLoading(false);
        });
      })
      .catch(() => {
        setLoading(false);
      });
  }, [query, page, startTransition]);

  const getLinkTo = (item: SearchResult) =>
    item.media_type === "movie" ? `/movie/${item.id}` : `/series/${item.id}`;

  return (
    <div className="pt-16 pb-4">
      <h1 className="text-3xl font-bold text-white px-4 sm:px-8 md:px-12 lg:px-16 mb-6">
        {query ? `Results for "${query}"` : "Search"}
      </h1>

      {!query && (
        <p className="text-gray-400 px-4 sm:px-8 md:px-12 lg:px-16">
          Enter a search term to find movies and TV shows.
        </p>
      )}

      {loading && (
        <CardSkeleton count={12} />
      )}

      {!loading && query && results.length === 0 && (
        <p className="text-gray-400 px-4 sm:px-8 md:px-12 lg:px-16">
          No results found for "{query}".
        </p>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 px-4 sm:px-8 md:px-12 lg:px-16">
          {results.map((item) => (
            <Link key={`${item.media_type}-${item.id}`} to={getLinkTo(item)} className="block">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg">
                <img
                  src={getPosterUrl(item.poster_path)}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="mt-1 text-sm text-gray-300 truncate">{item.title}</p>
              <p className="text-xs text-gray-500 capitalize">{item.media_type}</p>
            </Link>
          ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 md:gap-2 px-4 sm:px-8 md:px-12 lg:px-16 py-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs md:text-sm text-gray-300
              disabled:opacity-30 disabled:cursor-not-allowed
              enabled:hover:bg-white/10 enabled:hover:text-white transition"
          >
            Prev
          </button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const start = Math.max(1, Math.min(page - 2, totalPages - 4));
            const p = start + i;
            if (p > totalPages) return null;
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`min-w-[32px] h-8 md:min-w-[36px] md:h-9 rounded-lg text-xs md:text-sm font-medium transition
                  ${
                    p === page
                      ? "bg-white text-black"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {p}
              </button>
            );
          })}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs md:text-sm text-gray-300
              disabled:opacity-30 disabled:cursor-not-allowed
              enabled:hover:bg-white/10 enabled:hover:text-white transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
