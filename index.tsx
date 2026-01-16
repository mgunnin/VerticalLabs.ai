
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import posthog from 'posthog-js';

// Initialize PostHog
// We use a try-catch block with explicit property access to ensure:
// 1. Vite can statically analyze and replace 'import.meta.env.VITE_...' at build time.
// 2. The app doesn't crash in environments where import.meta is undefined.

let posthogKey: string | undefined = undefined;
let posthogHost: string = 'https://us.i.posthog.com';

try {
    // Explicit static access is required for Vite's build-time replacement.
    // We suppress TS errors because import.meta might not be typed in all contexts.
    
    // @ts-ignore
    const envKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
    if (envKey) {
        posthogKey = envKey;
    }

    // @ts-ignore
    const envHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;
    if (envHost) {
        posthogHost = envHost;
    }
} catch (error) {
    // Gracefully handle cases where import.meta is not available
    console.debug("Vite env access error", error);
}

// Fallback to process.env if available (for non-Vite builds or if variable wasn't replaced)
if (!posthogKey && typeof process !== 'undefined' && process.env) {
    posthogKey = process.env.VITE_PUBLIC_POSTHOG_KEY;
    if (process.env.VITE_PUBLIC_POSTHOG_HOST) {
        posthogHost = process.env.VITE_PUBLIC_POSTHOG_HOST;
    }
}

if (posthogKey) {
    posthog.init(posthogKey, {
        api_host: posthogHost,
        person_profiles: 'identified_only',
        capture_pageview: false, // Pageviews are handled manually in App.tsx
        capture_pageleave: true,
    });
} else {
    console.debug("PostHog not initialized: VITE_PUBLIC_POSTHOG_KEY missing");
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
