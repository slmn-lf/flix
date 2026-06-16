import { useState } from "react";
import { useNavigate } from "react-router";
import SearchToggleButton from "./SearchToggleButton";
import SearchInput from "@/components/SearchInput";

const NavbarSearch = () => {
  const navigate = useNavigate();
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

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {isOpen ? (
        <div onKeyDown={handleSubmit}>
          <SearchInput value={query} onChange={setQuery} onBlur={handleBlur} />
        </div>
      ) : (
        <SearchToggleButton onClick={handleToggle} />
      )}
    </div>
  );
};

export default NavbarSearch;
