import { Room, RoomRatesConfig } from '@/types/room';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const createRoom = async (roomData: Partial<Room>): Promise<Room> => {
  const response = await fetch(`${API_URL}/rooms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 🟢 Envía las cookies directamente a Express
    body: JSON.stringify(roomData),
  });

  if (!response.ok) {
    throw new Error('Error al crear la habitación');
  }

  return response.json();
};

export const updateRoom = async (
  roomId: string | number,
  roomData: Partial<Room>
): Promise<Room> => {
  const response = await fetch(`${API_URL}/rooms/${roomId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(roomData),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar la habitación');
  }

  return response.json();
};

export const updateRoomRates = async (
  roomId: string | number,
  config: RoomRatesConfig
): Promise<void> => {
  const response = await fetch(`${API_URL}/rooms/${roomId}/rates`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar las tarifas');
  }
};

export const deleteRoom = async (roomId: string | number): Promise<void> => {
  const response = await fetch(`${API_URL}/rooms/${roomId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la habitación');
  }
};

export const deleteBulkRooms = async (ids: string[]): Promise<void> => {
  const response = await fetch(`${API_URL}/rooms/bulk-delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ ids }),
  });

  if (!response.ok) {
    throw new Error('Error al eliminar las habitaciones seleccionadas');
  }
};