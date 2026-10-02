import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    
    // Obtener todas las cookies presentes en el cliente/navegador
    const allCookies = cookieStore.getAll();
    const cookieHeader = allCookies.map((c) => `${c.name}=${c.value}`).join('; ');

    const body = await request.json();

    // Reenviar la petición a Express incluyendo el encabezado de cookies
    const backendResponse = await fetch(`${BACKEND_URL}/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader, // 🟢 Reenvía automáticamente la cookie al backend
      },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(data, { status: backendResponse.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error en API Route /api/rooms:', error);
    return NextResponse.json(
      { error: 'Error al conectar con el servidor backend' },
      { status: 500 }
    );
  }
}