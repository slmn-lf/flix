import { useEffect, useState, useTransition } from "react";
import { getPopularTVShows } from "@/services/tvService";
import type { TV } from "@/types/tv";
import CardSkeleton from "@/components/CardSkeleton";
import MediaGrid from "@/components/MovieGrid/MovieGrid";
import Pagination from "@/components/Pagination/Pagination";

const SeriesPage = () => {
  const [tvShows, setTvShows] = useState<TV[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [, startTransition] = useTransition();

  useEffect(() => {
    getPopularTVShows(page)
      .then((res) => {
        startTransition(() => {
          setTvShows(res.tvShows);
          setTotalPages(res.totalPages > 500 ? 500 : res.totalPages);
          setLoading(false);
        });
      });
  }, [page, startTransition]);

  return (
    <div className="pt-16 pb-4">
      <h1 className="text-3xl font-bold text-white px-4 sm:px-8 md:px-12 lg:px-16 mb-6">
        Popular Series
      </h1>

      {loading ? (
        <CardSkeleton count={12} />
      ) : (
        <>
          <MediaGrid
            items={tvShows.map((s) => ({
              id: s.id,
              title: s.name,
              poster_path: s.poster_path,
            }))}
            linkTo={(id) => `/series/${id}`}
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

export default SeriesPage;
