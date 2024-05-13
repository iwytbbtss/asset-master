import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { authOptions } from './lib/auth';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const isAuth = !!token;
    // console.log(req.nextauth.token);
    const { pathname, search } = req.nextUrl;
    const isAuthPage = pathname.startsWith('/auth');

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    if (!isAuth) {
      let from = pathname;
      if (req.nextUrl.search) {
        from += search;
      }
      return NextResponse.redirect(new URL(`/auth?redirect=${encodeURIComponent(from)}`, req.url));
    }

    return NextResponse.next();

    // if (isAuthPage) {
    //   if (isAuth) {
    //     return NextResponse.redirect(new URL('/dashboard', req.url));
    //   }

    //   return null;
    // }

    // if (!isAuth) {
    //   let from = req.nextUrl.pathname;
    //   if (req.nextUrl.search) {
    //     from += req.nextUrl.search;
    //   }

    //   return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url));
    // }
  },
  {
    pages: authOptions.pages,
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
    secret: authOptions.secret,
  },
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
