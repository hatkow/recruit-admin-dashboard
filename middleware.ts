// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 開発中はスキップ
  if (process.env.NODE_ENV !== 'production') return NextResponse.next();

  const p = req.nextUrl.pathname;
  // 静的/画像などはスキップ
  if (p.startsWith('/_next/') || p.startsWith('/favicon') || p === '/robots.txt') {
    return NextResponse.next();
  }

  const auth = req.headers.get('authorization') || '';
  const [scheme, encoded] = auth.split(' ');
  if (scheme === 'Basic' && encoded) {
    const [user, pass] = atob(encoded).split(':');
    if (user === process.env.BASIC_AUTH_USER && pass === process.env.BASIC_AUTH_PASS) {
      return NextResponse.next();
    }
  }
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Protected"' },
  });
}

export const config = { matcher: ['/((?!api).*)'] };
