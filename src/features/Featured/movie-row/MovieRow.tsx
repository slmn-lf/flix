import type { MovieCardData } from "@/types/row";
import { useRef, useState, useCallback, useEffect } from "react";
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, [items, updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    rowRef.current?.scrollBy({
      left: direction === "left" ? -1200 : 1200,
      behavior: "smooth",
    });
  };

  return (
    <section>
      <h2 className="px-4 sm:px-8 md:px-12 lg:px-16 mb-1 pt-3 text-xl text-white font-semibold">
        {title}
      </h2>

      <div className="relative group">
        <MovieRowControls
          side="left"
          onClick={() => scroll("left")}
          show={canScrollLeft}
        />
        <MovieRowControls
          side="right"
          onClick={() => scroll("right")}
          show={canScrollRight}
        />

        <div
          ref={rowRef}
          className="flex gap-2 px-4 sm:px-8 md:px-12 lg:px-16 pt-3 overflow-x-auto
          [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 shrink-0"
            >
              <Link to={linkTo(item)} className="block h-full">
                <MovieCard
                  title={item.title}
                  posterUrl={item.posterUrl ?? ""}
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
