import { useState, type FC } from "react";

const STORAGE_KEY = "cookie-consent-accepted";

const CookieConsent: FC = () => {
  const [accepted, setAccepted] = useState(() =>
    localStorage.getItem(STORAGE_KEY) === "true",
  );

  const handleAccept = () => {
    setAccepted(true);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <p className="text-sm text-gray-300">
          This site uses cookies to enhance your experience. By continuing to
          browse, you agree to our use of cookies.
        </p>
        <button
          onClick={handleAccept}
          className="
            shrink-0 px-4 py-1.5
            bg-white text-black
            text-sm font-semibold rounded
            hover:bg-gray-200
            transition-colors
          "
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
