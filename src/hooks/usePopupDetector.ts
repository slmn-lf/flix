import { useEffect } from "react";

export function usePopupDetector() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let swActive: ServiceWorker | null = null;

    navigator.serviceWorker.ready.then((reg) => {
      swActive = reg.active;
    });

    let blurTimer: ReturnType<typeof setTimeout> | null = null;

    const handleBlur = () => {
      blurTimer = setTimeout(() => {
        if (!document.hasFocus() && swActive) {
          swActive.postMessage({ type: "suspect" });
        }
      }, 500);
    };

    const handleFocus = () => {
      if (blurTimer) {
        clearTimeout(blurTimer);
        blurTimer = null;
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      if (blurTimer) clearTimeout(blurTimer);
    };
  }, []);
}
