const CACHE='karvan-e-asal-v2-shell-1';
const SHELL=['./','./index.html','./manifest.json','./supabase-config.js','./assets/logo.png','./assets/icons/icon-192.png','./assets/icons/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;event.respondWith(caches.match(req).then(cached=>{if(cached)return cached;return fetch(req).then(res=>{const url=new URL(req.url);if(url.origin===location.origin || url.hostname==='cdn.jsdelivr.net'){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});}return res;}).catch(()=>cached||new Response('',{status:503,statusText:'Offline'}));}));});
