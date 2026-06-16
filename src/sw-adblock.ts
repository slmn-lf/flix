/// <reference lib="webworker" />
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  /^https:\/\/image\.tmdb\.org\/.*/i,
  new CacheFirst({
    cacheName: "tmdb-images",
    plugins: [
      new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 }),
    ],
  }),
);

const BLOCKLIST_CACHE = "sw-blocklist";
const BLOCKLIST_KEY = "blocked-domains";

const recentDomains = new Map<string, number>();
const SUSPECT_WINDOW_MS = 5_000;
const CLEANUP_INTERVAL = 10_000;

let blockedDomains = new Set<string>();
async function loadBlocklist() {
  try {
    const cache = await caches.open(BLOCKLIST_CACHE);
    const response = await cache.match(BLOCKLIST_KEY);
    if (response) {
      const data = await response.json();
      blockedDomains = new Set(data);
    }
  } catch {
    // first run
  }
}

async function saveBlocklist() {
  const cache = await caches.open(BLOCKLIST_CACHE);
  const response = new Response(JSON.stringify([...blockedDomains]), {
    headers: { "Content-Type": "application/json" },
  });
  await cache.put(BLOCKLIST_KEY, response);
}

function cleanRecentDomains() {
  const now = Date.now();
  for (const [domain, timestamp] of recentDomains) {
    if (now - timestamp > SUSPECT_WINDOW_MS) {
      recentDomains.delete(domain);
    }
  }
}

setInterval(cleanRecentDomains, CLEANUP_INTERVAL);

loadBlocklist();

self.addEventListener("message", (event) => {
  if (event.data?.type === "suspect") {
    cleanRecentDomains();
    let added = false;
    for (const domain of recentDomains.keys()) {
      if (!blockedDomains.has(domain)) {
        blockedDomains.add(domain);
        added = true;
      }
    }
    if (added) {
      saveBlocklist();
    }
    recentDomains.clear();
  }

  if (event.data?.type === "get-blocklist") {
    event.ports[0]?.postMessage([...blockedDomains]);
  }
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const { hostname } = url;

  if (hostname === self.location.hostname) return;

  recentDomains.set(hostname, Date.now());

  if (blockedDomains.has(hostname)) {
    event.respondWith(new Response(null, { status: 204 }));
  }
});
