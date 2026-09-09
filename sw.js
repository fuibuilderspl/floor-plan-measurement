/* Fui Builders — Area Takeoff · offline service worker */
const CACHE = "fb-takeoff-v2";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()).catch(() => {})
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // let the browser handle CDN/fonts (needs the network)

  // navigations: network-first so a fresh deploy is picked up, fall back to the cached app
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((res) => {
        caches.open(CACHE).then((c) => c.put("./index.html", res.clone())).catch(() => {});
        return res;
      }).catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  // same-origin assets: cache-first, then fill the cache
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      const copy = res.clone();
      if (res.ok) caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      return res;
    }).catch(() => hit))
  );
});
