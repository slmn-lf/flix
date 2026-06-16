import { useEffect, useState, type FC } from "react";

const STORAGE_KEY = "adblocker-badge-dismissed";

const AdBlockerBadge: FC = () => {
  const [blockCount, setBlockCount] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(() =>
    localStorage.getItem(STORAGE_KEY) === "true",
  );

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const controller = new AbortController();

    const fetchBlocklist = async () => {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (!reg.active) return;

        const channel = new MessageChannel();
        channel.port1.onmessage = (event) => {
          const list: string[] = event.data;
          setBlockCount(list.length);
        };
        reg.active.postMessage({ type: "get-blocklist" }, [channel.port2]);
      } catch {
        // SW not available
      }
    };

    fetchBlocklist();

    const autoDismiss = setTimeout(() => {
      setDismissed(true);
    }, 10_000);

    return () => {
      controller.abort();
      clearTimeout(autoDismiss);
    };
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  if (dismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <button
        onClick={handleDismiss}
        className="
          flex items-center gap-2
          bg-black/80 backdrop-blur-sm
          border border-white/20
          rounded-lg px-3 py-2
          text-sm text-white/80
          hover:bg-black/90 hover:text-white
          transition-all duration-200
          shadow-lg
          group
        "
        title="Ad blocker is active. The more you watch, the fewer popups appear."
      >
        <span className="text-base">🛡️</span>
        <span className="font-medium">
          {blockCount !== null ? `${blockCount} blocked` : "Ad Blocker"}
        </span>
        <span className="ml-1 text-white/40 group-hover:text-white/60 transition-colors">
          ✕
        </span>
      </button>
    </div>
  );
};

export default AdBlockerBadge;
