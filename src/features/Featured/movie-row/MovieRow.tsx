import type { MovieCardData } from "@/types/row";
import { useRef, useState, useEffect } from "react";
import MovieRowControls from "./component/MovieRowControls";
import MovieCard from "../movie-card/component/MovieCard";

type Props = {
  title: string;
  items: MovieCardData[];
};

const MovieRow = ({ title, items }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;

      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [items]);

  const scrollLeftAction = () => {
    rowRef.current?.scrollBy({ left: -1200, behavior: "smooth" });
  };

  const scrollRightAction = () => {
    rowRef.current?.scrollBy({ left: 1200, behavior: "smooth" });
  };

  return (
    <section>
      <h2 className="px-16 mb-1 text-xl text-white font-semibold">{title}</h2>

      <div className="relative group">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {showLeft && (
            <MovieRowControls side="left" onClick={scrollLeftAction} />
          )}
          {showRight && (
            <MovieRowControls side="right" onClick={scrollRightAction} />
          )}
        </div>

        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-2 px-16 overflow-x-auto scroll-smooth
                 [&::-webkit-scrollbar]:hidden
                 [-ms-overflow-style:none]
                 [scrollbar-width:none]"
        >
          {items.map((movie) => (
            <div key={movie.id} className="w-[220px] aspect-video shrink-0">
              <MovieCard
                title={movie.title}
                posterUrl={movie.posterUrl ?? ""}
                logoUrl={movie.logoUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieRow;
