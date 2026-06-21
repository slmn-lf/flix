type Props = {
  count?: number;
};

const CardSkeleton = ({ count = 10 }: Props) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 px-4 sm:px-8 md:px-12 lg:px-16">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="block">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-neutral-800 animate-pulse" />
          <div className="mt-2 h-4 bg-neutral-800 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
