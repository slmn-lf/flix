import { Link } from "react-router";

const Navlink = () => {
  const navItems = [
    { to: "/", children: "Home" },
    { to: "/movies", children: "Movies" },
    { to: "/series", children: "Shows" },
    { to: "/latest", children: "New & Popular" },
    { to: "/list", children: "My List" },
  ];
  return (
    <div>
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="mr-4
                    text-sm
                   text-neutral-400 
                   hover:text-white
                   "
        >
          {item.children}
        </Link>
      ))}
    </div>
  );
};
export default Navlink;
