
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import posthog from 'posthog-js';

// Initialize PostHog
// Accessing the key from environment variables as requested for Vercel
const posthogKey = process.env.POSTHOG_API_KEY;

if (posthogKey) {
    posthog.init(posthogKey, {
        api_host: 'https://us.i.posthog.com',
        person_profiles: 'identified_only',
    });
} else {
    // Graceful fallback or logging if key is missing in development
    console.debug("PostHog not initialized: POSTHOG_API_KEY missing");
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
