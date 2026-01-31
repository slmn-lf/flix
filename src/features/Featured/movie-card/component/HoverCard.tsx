import { PlayCircle } from "lucide-react";

type Props = {
  title: string;
  logoUrl?: string | null;
  posterUrl: string;
};

const HoverCard = ({ title, logoUrl, posterUrl }: Props) => {
  return (
    <div>
      <div className="wrapper">
        <img src={posterUrl} alt="" />
        {logoUrl && <img src={logoUrl} alt={`${title} logo`} />}
      </div>

      <div>
        <PlayCircle />
      </div>
    </div>
  );
};
export default HoverCard;
