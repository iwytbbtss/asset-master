import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { authOptions } from './lib/auth';

export default withAuth(
  async (req) => {
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
  },
  {
    pages: authOptions.pages,
    callbacks: {
      async authorized() {
        // always called.
        return true;
      },
    },
    secret: authOptions.secret,
  },
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
