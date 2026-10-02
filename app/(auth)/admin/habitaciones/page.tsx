import { cookies } from 'next/headers';
import RoomsClient from '@/components/admin/rooms/RoomsClient';
import { Room } from '@/types/room';

async function getRoomsData() {
  const cookieStore = await cookies();
  const token = cookieStore.get('AUTH_TOKEN')?.value;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  try {
    const [roomsRes, typesRes] = await Promise.all([
      fetch(`${API_URL}/rooms`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }),
      fetch(`${API_URL}/room-types`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }),
    ]);

    const rooms: Room[] = roomsRes.ok ? await roomsRes.json() : [];
    const roomTypes: string[] = typesRes.ok ? await typesRes.json() : [];

    return { rooms, roomTypes };
  } catch (error) {
    console.error('Error al obtener datos de habitaciones/tipos:', error);
    return { rooms: [], roomTypes: [] };
  }
}

export default async function RoomsPage() {
  const { rooms, roomTypes } = await getRoomsData();

  return <RoomsClient initialRooms={rooms} availableRoomTypes={roomTypes} />;
}