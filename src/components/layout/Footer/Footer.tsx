import { Link } from "react-router";

const navigation = [
  { label: "Home", to: "/" },
  { label: "Movies", to: "/movies" },
  { label: "Shows", to: "/series" },
];

const resources = [
  { label: "TMDB API", href: "https://www.themoviedb.org/" },
  { label: "VidLink", href: "https://vidlink.pro/" },
  { label: "VidSrc", href: "https://vidsrc.to/" },
  { label: "VidNest", href: "https://vidnest.fun/" },
  { label: "2Embed", href: "https://www.2embed.cc/" },
  { label: "SuperEmbed", href: "https://multiembed.monster/" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Navigasi
            </h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-neutral-400 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {resources.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-400 hover:text-white transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Pengembang
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-3">
              Web ini masih dalam pengembangan oleh <br />
              <span className="text-white font-medium">___slmn.lf</span>
            </p>
            <p className="text-xs text-neutral-500">
              &copy; {new Date().getFullYear()} Netflix Clone. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12 py-4">
          <p className="text-xs text-neutral-600 text-center leading-relaxed">
            This product uses the TMDB API but is not endorsed or certified by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition"
            >
              TMDB
            </a>
            . All video content is sourced from third-party servers (VidLink,
            VidSrc, VidNest, 2Embed, SuperEmbed) and is not hosted on this
            server.
          </p>
        </div>
      </div>
    </footer>
  );
}
