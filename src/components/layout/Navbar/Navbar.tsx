import { Menu, X } from "lucide-react";
import Navlink from "./Navlink";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import NavbarSearch from "./NavbarSearch/NavbarSearch";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", children: "Home" },
    { to: "/movies", children: "Movies" },
    { to: "/series", children: "Shows" },
  ];

  return (
    <div className="fixed border-neutral-800 w-full z-50">
      <div
        className={`
    flex items-center px-4 sm:px-8 md:px-12 py-4 text-white
    transition-all duration-300 ease-in-out
    ${isScrolled || isMobileMenuOpen ? "bg-gradient-to-b from-black to-neutral-900" : "bg-transparent"}
  `}
      >
        <div className="flex items-center flex-1">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img width={90} src="./../flix.svg" alt="clone netflix" />
          </Link>

          <div className="hidden md:flex gap-4 ml-8">
            <Navlink />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NavbarSearch />
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-white hover:text-neutral-300 transition"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-900 px-4 sm:px-8 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm text-neutral-400 hover:text-white transition"
            >
              {item.children}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
