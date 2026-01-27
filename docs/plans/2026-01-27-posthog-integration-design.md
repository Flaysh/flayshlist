# PostHog Integration Design

**Date:** 2026-01-27
**Goal:** Integrate PostHog for comprehensive observability with session replay and debugging capabilities

## Overview

Add PostHog analytics to the portfolio site for maximum observability, including full session recordings, error tracking, console logs, and network monitoring. PostHog will complement existing analytics (Vercel, Google, Clarity) by providing deep debugging capabilities and session replay.

## Architecture

### Core Components

1. **PostHog Provider Component** (`src/components/posthog-provider.tsx`)
   - Client-side provider wrapping the app
   - Initializes PostHog with EU instance configuration
   - Configures session recording (100% sampling)
   - Minimal masking (only explicitly marked elements)
   - Enables console log and network capture

2. **Environment Variables** (`.env.local`)
   ```
   NEXT_PUBLIC_POSTHOG_KEY=phc_XHnzX3eq9JUErp54RoWFPEQf6PVUtN0bVRlbOTqDoXm
   NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
   ```

3. **Package Dependencies**
   - `posthog-js` - Official PostHog JavaScript SDK

4. **Layout Integration** (`src/app/layout.tsx`)
   - Add PostHog provider alongside existing analytics
   - Available throughout entire app

### Automatic Tracking

PostHog will automatically capture:
- Page views on every route change
- All user interactions (clicks, form submissions)
- Console logs (errors, warnings, info)
- Network requests (XHR, fetch)
- Full session replays with DOM snapshots

## Custom Event Tracking

### Strategic Events

**AI Toolkit:**
- `image_generated` - Model, aspect ratio, prompt length, duration
- `animation_preview_played` - Animation type, image ID
- `video_export_initiated` - Format, settings
- `generation_failed` - Error type, model

**Media Engagement:**
- `video_played` - Video ID, source
- `music_embed_played` - Platform, track
- `external_link_clicked` - Destination, context

**AI Chat:**
- `chat_message_sent` - Message length
- `chat_session_started` - Entry point

### Implementation

Create `usePostHog()` hook wrapper for type-safe tracking:

```typescript
posthog.capture('image_generated', {
  model: 'flux-1.1-pro',
  aspectRatio: '16:9',
  duration_ms: 3200
})
```

## Error Handling & Development

### Graceful Degradation

- PostHog initialization wrapped in try-catch
- App continues if PostHog fails (invalid key, network issues, ad blockers)
- No user-facing errors from analytics failures

### Development Mode

- PostHog disabled in development by default
- Console logs show what would be tracked
- Enable with `NEXT_PUBLIC_POSTHOG_DEBUG=true` for testing
- Prevents polluting production data

### Coexistence with Existing Analytics

- Runs alongside Vercel Analytics, Google Analytics, Clarity
- Each serves different purpose:
  - **Vercel:** Performance metrics
  - **Google:** Traffic acquisition
  - **Clarity:** Heatmaps
  - **PostHog:** Session replay + debugging
- All load asynchronously, no blocking

### Error Context Enrichment

When errors occur:
- Stack traces automatically captured
- Linked to session replay
- Console logs included
- Network activity visible

## Performance

### Optimization Strategy

1. **Lazy Loading**
   - Loads after page interactive
   - Doesn't block initial render
   - No impact on Core Web Vitals
   - ~45KB gzipped bundle

2. **Session Recording**
   - DOM snapshots compressed
   - Network payload batched (10s intervals)
   - Uses requestIdleCallback
   - Minimal CPU impact

## Privacy & Compliance

### Masking Configuration

- **Minimal masking approach:**
  - Password inputs automatically masked
  - Add `.ph-no-capture` class for custom masking
  - User IP addresses captured (geolocation insights)
  - No PII in current forms (except optional chat)

### GDPR Compliance

- PostHog EU instance (Frankfurt region)
- Data stored in EU
- GDPR-compliant
- Implied consent model (standard for analytics)
- Cookie consent banner can be added later if needed

## Data Retention

- **Free Tier Limits:**
  - 1M events/month
  - 5K session recordings/month

- **Retention:**
  - Recordings: 3 weeks default
  - Events: 1 year
  - Configurable in dashboard

- **Expected Usage:**
  - Portfolio traffic should fit comfortably in free tier

## Implementation Checklist

- [ ] Install `posthog-js` package
- [ ] Add environment variables to `.env.local`
- [ ] Create PostHog provider component
- [ ] Update root layout to include provider
- [ ] Add custom event tracking to AI toolkit
- [ ] Add custom event tracking to media pages
- [ ] Add custom event tracking to chat
- [ ] Test in development mode
- [ ] Verify session recordings in PostHog dashboard
- [ ] Verify custom events appearing
- [ ] Update `.env.example` with PostHog variables

## Success Criteria

- PostHog capturing page views automatically
- Session recordings visible in PostHog dashboard
- Console logs and network requests captured
- Custom events tracking AI toolkit usage
- No performance degradation
- Graceful failure if PostHog unavailable
