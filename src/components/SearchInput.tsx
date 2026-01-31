import { useRef, useEffect, type FC } from "react";
import SearchIcon from "./layout/Navbar/NavbarSearch/SearchIcon";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

const SearchInput: FC<SearchInputProps> = ({ value, onChange, onBlur }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div
      className="
        relative
        flex
        items-center
        bg-black
        border
        border-white/30
        h-9
        w-64
        px-2
        animate-search-in
      "
    >
      <SearchIcon className="text-white/70" />

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder="Titles, people, genres"
        className="
          w-full
          bg-transparent
          text-white
          text-sm
          placeholder-white/50
          outline-none
          pl-2
        "
      />
    </div>
  );
};
export default SearchInput;
