type Props = {
  title: string;
  logoUrl?: string | null;
  posterUrl: string;
};
const MovieCard = ({ title, logoUrl, posterUrl }: Props) => {
  return (
    <div className="relative h-full w-full  overflow-hidden rounded-lg my-4">
      <img src={posterUrl} alt={title} className="h-full w-full object-cover" />
      <div className="absolute bottom-5 justify-center p-4">
        {logoUrl ? (
          <img src={logoUrl} className="w-20" />
        ) : (
          <h3 className="mb-4 text-lg text-white font-bold">{title}</h3>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
