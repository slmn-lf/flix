import { useEffect, useState } from "react";
import FeaturedHero from "@/features/Featured/hero/FeaturedHero";
import type { MovieCardData } from "@/types/row";
import MovieRow from "@/features/Featured/movie-row/MovieRow";
import {
  fetchPopularRowWithLogos,
  fetchPopularTV,
  fetchKoreanDramas,
  fetchMoviesByGenre,
} from "@/features/Featured/services/featuredService";

type RowState = { title: string; items: MovieCardData[]; linkTo?: (item: MovieCardData) => string };

const rowsConfig: { title: string; fetch: () => Promise<MovieCardData[]>; linkTo?: (item: MovieCardData) => string }[] = [
  { title: "Popular Movies", fetch: fetchPopularRowWithLogos },
  { title: "TV Series", fetch: fetchPopularTV, linkTo: (item) => `/series/${item.id}` },
  { title: "Korean Dramas", fetch: fetchKoreanDramas, linkTo: (item) => `/series/${item.id}` },
  { title: "Action Movies", fetch: () => fetchMoviesByGenre(28) },
  { title: "Horror Movies", fetch: () => fetchMoviesByGenre(27) },
];

export default function HomePage() {
  const [rows, setRows] = useState<RowState[]>([]);

  useEffect(() => {
    Promise.allSettled(
      rowsConfig.map(({ title, fetch, linkTo }) =>
        fetch().then((items) => setRows((prev) => [...prev, { title, items, linkTo }])),
      ),
    );
  }, []);

  return (
    <div>
      <FeaturedHero />
      {rows.map((row) => (
        <div key={row.title}>
          <MovieRow title={row.title} items={row.items} linkTo={row.linkTo} />
        </div>
      ))}
    </div>
  );
}
