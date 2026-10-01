import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Regla previa: Si las rutas borrador no están activas, muestra 404
  if (process.env.ENABLE_DRAFT_ROUTES !== 'true') {
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  // 2. Obtener el token guardado en la cookie
  const token = request.cookies.get('AUTH_TOKEN')?.value;

  // 3. Proteger la zona administrativa (/admin)
  if (pathname.startsWith('/admin')) {
    if (!token) {
      // Si no hay cookie de sesión, redirige al login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 4. Si el usuario ya inició sesión e intenta volver al /login
  if (pathname === '/login' && token) {
    // Redirige directamente al panel de administración
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/admin/:path*',
  ],
};