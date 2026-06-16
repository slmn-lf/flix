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
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  }),
);

const AD_DOMAINS = [
  "doubleclick.net",
  "googlesyndication.com",
  "googleadservices.com",
  "googletagservices.com",
  "googletagmanager.com",
  "google-analytics.com",
  "taboola.com",
  "outbrain.com",
  "criteo.com",
  "casalemedia.com",
  "adsrvr.org",
  "adsymptotic.com",
  "adnxs.com",
  "rubiconproject.com",
  "openx.net",
  "pubmatic.com",
  "amazon-adsystem.com",
  "sharethrough.com",
  "indexww.com",
  "sovrn.com",
  "media.net",
  "popads.net",
  "adsterra.com",
  "propellerads.com",
  "trafficfactory.biz",
  "exoclick.com",
  "adcash.com",
  "adbrite.com",
  "clickadu.com",
  "adreactor.com",
  "popunder.net",
  "adbucks.com",
  "clksite.com",
  "popupmaker.com",
  "popadscdn.net",
  "adsafeprotected.com",
  "moatads.com",
  "scorecardresearch.com",
  "quantserve.com",
  "comscore.com",
  "adsafeprotected.com",
  "servedbyadbutler.com",
  "undertone.com",
  "yieldmo.com",
  "smaato.net",
  "inmobi.com",
  "millennialmedia.com",
  "tapjoy.com",
  "vungle.com",
  "chartboost.com",
  "adcolony.com",
  "unityads.unity3d.com",
  "applovin.com",
  "ironsrc.com",
  "fyber.com",
  "supersonicads.com",
  "nativeads.com",
  "contentad.net",
  "mgid.com",
  "revcontent.com",
  "exosrv.com",
  "zemanta.com",
  "disqusads.com",
  "tribalfusion.com",
  "bidswitch.net",
  "contextweb.com",
  "krxd.net",
  "bluekai.com",
  "exelator.com",
  "demdex.net",
  "adsmoloco.com",
  "mookie1.com",
  "adswizz.com",
  "tritondigital.com",
  "spotxchange.com",
  "teads.tv",
  "pixel.quantserve.com",
  "bounceexchange.com",
  "digg.com",
  "sumo.com",
  "addthis.com",
  "trip.com",
  "id.trip.com",
];

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (AD_DOMAINS.some((domain) => url.hostname.includes(domain))) {
    event.respondWith(new Response(null, { status: 204 }));
  }
});
