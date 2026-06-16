import type { MovieCardData } from "@/types/row";
import { useRef } from "react";
import { Link } from "react-router";
import MovieRowControls from "./component/MovieRowControls";
import MovieCard from "../movie-card/component/MovieCard";

const MovieRow = ({
  title,
  items,
  linkTo = (item: MovieCardData) => `/movie/${item.id}`,
}: {
  title: string;
  items: MovieCardData[];
  linkTo?: (item: MovieCardData) => string;
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <section>
      <h2 className="px-4 sm:px-8 md:px-12 lg:px-16 mb-1 text-xl text-white font-semibold">{title}</h2>

      <div className="relative group">
        <MovieRowControls
          side="left"
          onClick={() =>
            rowRef.current?.scrollBy({ left: -1200, behavior: "smooth" })
          }
        />
        <MovieRowControls
          side="right"
          onClick={() =>
            rowRef.current?.scrollBy({ left: 1200, behavior: "smooth" })
          }
        />

        <div
          ref={rowRef}
          className="flex gap-2 px-4 sm:px-8 md:px-12 lg:px-16 overflow-x-auto
          [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <div key={item.id} className="w-1/3 sm:w-1/4 md:w-1/6 lg:w-1/8 xl:w-1/12 shrink-0">
              <Link to={linkTo(item)} className="block h-full">
                <MovieCard
                  title={item.title}
                  posterUrl={item.posterUrl ?? ""}
                  onHover={() => {}}
                  onLeave={() => {}}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieRow;
