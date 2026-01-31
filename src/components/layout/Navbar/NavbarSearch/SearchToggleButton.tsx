import type { FC } from "react";
import SearchIcon from "./SearchIcon";

interface SearchToggleButtonProps {
  onClick: () => void;
  ariaLabel?: string;
}

const SearchToggleButton: FC<SearchToggleButtonProps> = ({
  onClick,
  ariaLabel = "Search",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="p-2 text-white  focus:outline-none focus:ring-2 focus:ring-white/50 transition"
    >
      <SearchIcon />
    </button>
  );
};
export default SearchToggleButton;
