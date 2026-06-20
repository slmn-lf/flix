import { useEffect, useState, useTransition } from "react";
import { getPopularMovies } from "@/services/movieService";
import type { Movie } from "@/types/movie";
import CardSkeleton from "@/components/CardSkeleton";
import MediaGrid from "@/components/MovieGrid/MovieGrid";
import Pagination from "@/components/Pagination/Pagination";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [, startTransition] = useTransition();

  useEffect(() => {
    getPopularMovies(page)
      .then((res) => {
        startTransition(() => {
          setMovies(res.movies);
          setTotalPages(res.totalPages > 500 ? 500 : res.totalPages);
          setLoading(false);
        });
      });
  }, [page, startTransition]);

  return (
    <div className="pt-16 pb-4">
      <h1 className="text-3xl font-bold text-white px-4 sm:px-8 md:px-12 lg:px-16 mb-6">Popular Movies</h1>

      {loading ? (
        <CardSkeleton count={12} />
      ) : (
        <>
          <MediaGrid
            items={movies.map((m) => ({
              id: m.id,
              title: m.title,
              poster_path: m.poster_path,
            }))}
            linkTo={(id) => `/movie/${id}`}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default MoviesPage;
