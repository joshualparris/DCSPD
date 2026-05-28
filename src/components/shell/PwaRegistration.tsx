"use client";

import { useEffect } from 'react';

export default function PwaRegistration() {
  useEffect(() => {
    const isDev = process.env.NODE_ENV !== 'production';
    if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            if (isDev) {
              console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }
          },
          (err) => {
            if (isDev) {
              console.error('ServiceWorker registration failed: ', err);
            }
          }
        );
      });
    }
  }, []);

  return null;
}
