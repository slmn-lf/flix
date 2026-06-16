type Props = {
  title: string;
  posterUrl: string;

  onHover: (rect: DOMRect) => void;
  onLeave: () => void;
};

const MovieCard = ({ title, posterUrl }: Props) => {
  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden cursor-pointer">
      <img src={posterUrl} alt={title} className="h-full w-full object-cover" />
    </div>
  );
};

export default MovieCard;
