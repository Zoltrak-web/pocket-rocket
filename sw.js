/* Pocket Rocket service worker. Cache-first, so the app opens with no signal.
   A new build changes VERSION; the page then shows an "Update now" banner. */
const VERSION="pr-172788d365f9";
const ASSETS=["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png", "./icons/favicon-32.png", "./icons/icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS.map(u=>new Request(u,{cache:"reload"})))))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("pr-")&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("message",e=>{if(e.data==="SKIP_WAITING")self.skipWaiting()});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==self.location.origin)return;
  if(r.mode==="navigate"){e.respondWith(caches.open(VERSION).then(c=>c.match("./index.html")).then(m=>m||fetch(r)));return}
  e.respondWith(caches.open(VERSION).then(c=>c.match(r,{ignoreSearch:true})).then(m=>m||fetch(r)))});
