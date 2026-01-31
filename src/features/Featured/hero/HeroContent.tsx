type Props = {
  title: string;
  overview: string;
  logoUrl?: string | null;
};

export function HeroContent({ title, overview, logoUrl }: Props) {
  return (
    <div className="relative z-10 flex h-full items-end">
      <div className="max-w-xl px-12 pb-24 text-white">
        {logoUrl ? (
          <img src={logoUrl} alt={title} className="mb-6 w-64" />
        ) : (
          <h1 className="mb-4 text-5xl font-bold">{title}</h1>
        )}

        <p className="mb-6 text-sm leading-relaxed text-white/90">{overview}</p>

        <div className="flex gap-3">
          <button className="rounded bg-white px-6 py-2 text-black">
            Play
          </button>
          <button className="rounded bg-white/30 px-6 py-2">More Info</button>
        </div>
      </div>
    </div>
  );
}
