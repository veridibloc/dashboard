import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const Locales = ['en', 'pt']

const intlMiddleware = createMiddleware({
  locales: Locales,
  defaultLocale: Locales[0],
});

const isProtectedRoute = createRouteMatcher([
  '/:locale(/?)(.*)'
]);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  if (
    !request.nextUrl.pathname.includes('signin') &&
    isProtectedRoute(request)
  ) {
    return clerkMiddleware((auth, req) => {
      if (isProtectedRoute(req)) {
        const locale
          = req.nextUrl.pathname.match(/(\/.*)\/a/)?.at(1) ?? '';
        const signInUrl = new URL(`${locale}/signin`, req.url);
        auth().protect({unauthenticatedUrl: signInUrl.toString()})
      }

      return intlMiddleware(req);
    })(request, event);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};