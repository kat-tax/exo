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

let _token: string | undefined;

export function register() {
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
      _token = event.data.payload.accessToken;
      matrix.init(event.data.payload);
    }
  });

  self.addEventListener('fetch', (event: FetchEvent) => {
    if (event.request.method !== 'GET'
      && event.request.method !== 'HEAD')
      return;

    const url = new URL(event.request.url);
    if (!url.pathname.startsWith('/_matrix/media/v3/download')
      && !url.pathname.startsWith('/_matrix/media/v3/thumbnail'))
      return;

    url.href = url.href.replace(/\/media\/v3\/(.*)\//, '/client/v1/media/$1/');
    event.respondWith((async (): Promise<Response> => {
      return fetch(url, {
        headers: {
          Authorization: `Bearer ${_token}`,
        },
      });
    })());
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

  self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil(caches.open(cacheName).then(c => {
      c.addAll(cacheEntries);
    }));
  });
  
  self.addEventListener('activate', (event: ExtendableEvent) => {
    event.waitUntil(caches.open(cacheName).then((cache) => {
      cache.keys().then((keys) => {
        keys.forEach((request) => {
          if (!manifestURLs.includes(request.url)) {
            cache.delete(request);
          }
        });
      });
    }));
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
