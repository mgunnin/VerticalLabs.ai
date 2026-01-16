
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import posthog from 'posthog-js';

// Initialize PostHog
// Safely access environment variables to prevent runtime errors
const getEnvVar = (key: string) => {
    // 1. Try import.meta.env (Vite)
    // We cast to any to avoid TS errors, and check existence to avoid runtime errors
    const meta = (typeof import.meta !== 'undefined' ? import.meta : {}) as any;
    if (meta && meta.env && meta.env[key]) {
        return meta.env[key];
    }
    
    // 2. Try process.env (Standard/Webpack)
    try {
        if (typeof process !== 'undefined' && process.env && process.env[key]) {
            return process.env[key];
        }
    } catch (e) {}

    return undefined;
};

const posthogKey = getEnvVar('VITE_PUBLIC_POSTHOG_KEY');
const posthogHost = getEnvVar('VITE_PUBLIC_POSTHOG_HOST') || 'https://us.i.posthog.com';

if (posthogKey) {
    posthog.init(posthogKey, {
        api_host: posthogHost,
        person_profiles: 'identified_only',
    });
} else {
    // Graceful fallback or logging if key is missing in development
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
