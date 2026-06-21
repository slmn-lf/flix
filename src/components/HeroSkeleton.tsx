const HeroSkeleton = () => {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-900 animate-pulse aspect-video md:h-[85vh]">
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800" />
      <div className="relative z-10 flex flex-col justify-end h-full pb-16 md:pb-24 px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="w-16 md:w-64 h-6 md:h-12 bg-neutral-700 rounded-lg mb-2 md:mb-4" />
        <div className="hidden md:block w-full max-w-xl h-4 bg-neutral-700 rounded mb-2" />
        <div className="hidden md:block w-3/4 max-w-lg h-4 bg-neutral-700 rounded mb-6" />
        <div className="flex gap-2 md:gap-3">
          <div className="w-20 md:w-28 h-8 md:h-10 bg-neutral-700 rounded" />
          <div className="hidden md:block w-32 h-10 bg-neutral-700 rounded" />
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
