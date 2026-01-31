import { Search } from "lucide-react";
import type { FC } from "react";

interface SearchIconProps {
  className?: string;
  size?: number;
}

const SearchIcon: FC<SearchIconProps> = ({ className, size = 20 }) => {
  return <Search size={size} className={className} aria-hidden="true" />;
};
export default SearchIcon;
