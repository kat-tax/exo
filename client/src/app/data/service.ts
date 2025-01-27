/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;
declare global {
  interface ServiceWorkerGlobalScope {
    __WB_MANIFEST: Array<ManifestEntry>;
  }
  interface ExtendableEvent {
    request: {
      url: string,
      destination: string,
    }
    data: {
      type: string,
      payload: any,
    }
  }
  interface PeriodicBackgroundSyncEvent extends ExtendableEvent {
    tag: string;
  }
}

import {registerRoute, setCatchHandler, setDefaultHandler} from 'workbox-routing';
import {CacheFirst, NetworkOnly} from 'workbox-strategies';
import {cacheNames, clientsClaim} from 'workbox-core';
import * as matrix from './lib/matrix';

import type {ManifestEntry} from 'workbox-build';

export function register() {
  const debug = true;
  const fallback = 'index.html';
  const manifest = self.__WB_MANIFEST as Array<ManifestEntry>;
  const cacheName = cacheNames.runtime;
  const cacheEntries: RequestInfo[] = [];
  const manifestURLs = manifest.map((entry) => {
    const url = new URL(entry.url, self.location as URL);
    cacheEntries.push(new Request(url.href, {credentials: 'same-origin'}));
    return url.href;
  });
  
  self.addEventListener('message', (event: ExtendableEvent) => {
    if (event?.data?.type === 'matrix::init') {
      matrix.init(event.data.payload);
    }
  });
  
  self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil(caches.open(cacheName).then(c => c.addAll(cacheEntries)))
  });
  
  self.addEventListener('activate', (event: ExtendableEvent) => {
    // Clean up outdated runtime cache
    event.waitUntil(
      caches.open(cacheName).then((cache) => {
        // Clean up those who are not listed in manifestURLs
        cache.keys().then((keys) => {
          keys.forEach((request) => {
            debug && console.log(`Checking cache entry to be removed: ${request.url}`)
            if (!manifestURLs.includes(request.url)) {
              cache.delete(request).then((deleted) => {
                if (debug) {
                  if (deleted) {
                    console.log(`Precached data removed: ${request.url || request}`);
                  } else {
                    console.log(`No precache found: ${request.url || request}`);
                  }
                }
              })
            }
          })
        })
      })
    )
  });
  
  self.addEventListener('push', (event: PushEvent) => {
    console.log('>> push', event);
  });
  
  self.addEventListener('sync', (event: Event) => {
    console.log('>> sync', event);
  });
  
  // @ts-expect-error: not included in the default SW interface
  self.addEventListener('periodicsync', (event: PeriodicBackgroundSyncEvent) => {
    console.log('>> periodicsync', event);
  });
  
  registerRoute(
    ({url}) => manifestURLs.includes(url.href),
    new CacheFirst({cacheName}),
  );
  
  setDefaultHandler(new NetworkOnly());
  setCatchHandler(async ({event}): Promise<Response> => {
    switch (event.request.destination) {
      // Fallback to app-shell for document request
      case 'document':
        return caches.match(fallback).then((r) => {
          return r ? Promise.resolve(r) : Promise.resolve(Response.error());
        });
      default:
        return Promise.resolve(Response.error());
    }
  });
  
  self.skipWaiting();
  clientsClaim();  
}

register();
