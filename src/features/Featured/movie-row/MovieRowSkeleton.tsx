type Props = {
  title: string;
  cardCount?: number;
};

const MovieRowSkeleton = ({ title, cardCount = 8 }: Props) => {
  return (
    <section>
      <h2 className="px-4 sm:px-8 md:px-12 lg:px-16 mb-1 text-xl text-white font-semibold">{title}</h2>
      <div className="flex gap-2 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
        {Array.from({ length: cardCount }).map((_, i) => (
          <div
            key={i}
            className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 shrink-0"
          >
            <div className="aspect-[2/3] rounded-lg bg-neutral-800 animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieRowSkeleton;
