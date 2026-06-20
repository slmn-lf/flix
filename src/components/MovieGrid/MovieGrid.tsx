import { Link } from "react-router";
import { getPosterUrl } from "@/utils/image";

export type MediaItem = {
  id: number;
  title: string;
  poster_path: string | null;
};

type Props = {
  items: MediaItem[];
  linkTo: (id: number) => string;
};

const MediaGrid = ({ items, linkTo }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 px-4 sm:px-8 md:px-12 lg:px-16">
      {items.map((item) => (
        <Link key={item.id} to={linkTo(item.id)} className="block">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg">
            <img
              src={getPosterUrl(item.poster_path)}
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="mt-1 text-sm text-gray-300 truncate">{item.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default MediaGrid;
