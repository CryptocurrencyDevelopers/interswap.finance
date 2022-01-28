// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = 'https://ab6a26635be549469459326c25509632@o1128604.ingest.sentry.io/6171495';

Sentry.init({
  dsn: SENTRY_DSN || 'https://ab6a26635be549469459326c25509632@o1128604.ingest.sentry.io/6171495',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
})
