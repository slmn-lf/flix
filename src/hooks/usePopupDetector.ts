import { useEffect } from "react";

export function usePopupDetector() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let swActive: ServiceWorker | null = null;

    navigator.serviceWorker.ready.then((reg) => {
      swActive = reg.active;
    });

    let blurTimer: ReturnType<typeof setTimeout> | null = null;

    const suspect = () => {
      if (swActive) {
        swActive.postMessage({ type: "suspect" });
      }
    };

    const handleBlur = () => {
      blurTimer = setTimeout(() => {
        if (!document.hasFocus()) suspect();
      }, 500);
    };

    const handleFocus = () => {
      if (blurTimer) {
        clearTimeout(blurTimer);
        blurTimer = null;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) suspect();
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (blurTimer) clearTimeout(blurTimer);
    };
  }, []);
}
