import { PlayCircle } from "lucide-react";

type Props = {
  rect: DOMRect;
  posterUrl: string;
  logoUrl?: string | null;
  onEnter: () => void;
  onLeave: () => void;
};

const HoverCard = ({ rect, posterUrl, logoUrl, onEnter, onLeave }: Props) => {
  return (
    <div
      className="fixed z-[9999]"
      style={{
        top: rect.top - 40,
        left: rect.left - 40,
        width: rect.width + 80,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="rounded-xl overflow-hidden bg-black shadow-2xl">
        <img src={posterUrl} className="w-full object-cover" />

        <div className="p-4">
          {logoUrl && <img src={logoUrl} className="w-24 mb-2" />}
          <PlayCircle className="text-white w-10 h-10" />
        </div>
      </div>
    </div>
  );
};

export default HoverCard;
