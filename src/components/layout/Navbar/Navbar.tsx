// import { Search } from "lucide-react";
import Navlink from "./Navlink";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import NavbarSearch from "./NavbarSearch/NavbarSearch";
// import SearchField from "./SearchField";

const Navbar = () => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // const handleSearhButton = () => {
  //   setIsOpen(!isOpen);
  // };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed  border-neutral-800 w-full z-50">
      <div
        className={`
    flex px-12 py-4 text-white
    transition-all duration-300 ease-in-out
    ${isScrolled ? "bg-gradient-to-b from-black to-neutral-900  " : "bg-transparent"}
  `}
      >
        <div className="flex items-center flex-1">
          <Link to="/">
            <img width={90} src="./../NetflixLogoSvg.svg" alt="clone netflix" />
          </Link>

          <div className="flex  gap-4 ml-8">
            <Navlink />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <NavbarSearch />
          {/* Avatar / Profile */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
