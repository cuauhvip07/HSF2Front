import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Si la variable de entorno no está explícitamente en 'true', bloquea la ruta
  if (process.env.ENABLE_DRAFT_ROUTES !== 'true') {
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  return NextResponse.next();
}

// Especifica las rutas exactas que deseas ocultar en producción
export const config = {
  matcher: [
    '/login',
    '/admin/:path*', 
  ],
};