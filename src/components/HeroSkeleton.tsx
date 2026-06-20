const HeroSkeleton = () => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-neutral-900 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800" />
      <div className="relative z-10 flex flex-col justify-end h-full pb-24 px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="w-64 h-12 bg-neutral-700 rounded-lg mb-4" />
        <div className="w-full max-w-xl h-4 bg-neutral-700 rounded mb-2" />
        <div className="w-3/4 max-w-lg h-4 bg-neutral-700 rounded mb-6" />
        <div className="flex gap-3">
          <div className="w-28 h-10 bg-neutral-700 rounded" />
          <div className="w-32 h-10 bg-neutral-700 rounded" />
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
