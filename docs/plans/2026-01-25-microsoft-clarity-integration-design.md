# Microsoft Clarity Integration Design

**Date:** 2026-01-25
**Status:** Approved

## Overview

Integrate Microsoft Clarity analytics into the FlayshList portfolio site to track user behavior, session recordings, and heatmaps alongside existing Vercel Analytics and Google Analytics.

## Goals

- Add Microsoft Clarity tracking without affecting page performance
- Follow existing analytics patterns in the codebase
- Store configuration securely via environment variables
- Enable graceful degradation if Clarity ID is not configured

## Architecture

### Component Structure

Create a dedicated `ClarityAnalytics` component that mirrors the existing `GoogleAnalytics` component pattern:

- **Location:** `src/components/clarity-analytics.tsx`
- **Pattern:** Server/client component using Next.js `Script`
- **Loading Strategy:** `afterInteractive` to avoid blocking initial render
- **Configuration:** Environment variable `NEXT_PUBLIC_CLARITY_PROJECT_ID`

### Integration Points

**Root Layout (`src/app/layout.tsx`):**
- Add `<ClarityAnalytics />` alongside existing analytics components
- Load order: Vercel Analytics → Google Analytics → Clarity Analytics

**Environment Configuration:**
- Store Clarity project ID in `.env.local` or `.env`
- Use `NEXT_PUBLIC_` prefix for client-side access
- Project ID: `v73cyrlqpt`

## Implementation

### 1. Create ClarityAnalytics Component

```typescript
// src/components/clarity-analytics.tsx
import Script from 'next/script';

export function ClarityAnalytics() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  if (!projectId) {
    return null;
  }

  return (
    <Script id="clarity-analytics" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `}
    </Script>
  );
}
```

### 2. Update Root Layout

Add the import and component:

```tsx
import { ClarityAnalytics } from '@/components/clarity-analytics';

// In the body:
<Analytics />
<GoogleAnalytics />
<ClarityAnalytics />
```

### 3. Configure Environment Variable

Add to `.env.local`:
```
NEXT_PUBLIC_CLARITY_PROJECT_ID=v73cyrlqpt
```

## Performance Considerations

- Script loads `afterInteractive` - won't block page render
- Async loading prevents blocking the main thread
- Graceful degradation if environment variable is missing
- No impact on build size (external script)

## Testing

1. Verify script loads in browser DevTools Network tab
2. Check Microsoft Clarity dashboard for incoming sessions
3. Confirm no console errors
4. Test in both development and production builds

## Rollback Plan

If issues occur:
1. Remove `<ClarityAnalytics />` from layout.tsx
2. Remove environment variable
3. Delete component file if needed

## Future Enhancements

- Add Clarity event tracking for specific user actions
- Implement privacy controls (cookie consent)
- Add TypeScript types for Clarity global object
