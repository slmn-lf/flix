import { useState } from "react";
import SearchToggleButton from "./SearchToggleButton";
import SearchInput from "@/components/SearchInput";

const NavbarSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;

      if (!next) {
        setQuery("");
      }
      return next;
    });
  };

  const handleBlur = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative flex items-center gap-2">
      {isOpen ? (
        <SearchInput value={query} onChange={setQuery} onBlur={handleBlur} />
      ) : (
        <SearchToggleButton onClick={handleToggle} />
      )}
    </div>
  );
};

export default NavbarSearch;
