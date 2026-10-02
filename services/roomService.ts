import { Room, RoomRatesConfig } from '@/types/room';

export const createRoom = async (roomData: Partial<Room>): Promise<Room> => {
  // Llama a la API Route de Next.js
  const response = await fetch('/api/rooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roomData),
  });

  if (response.status === 401) {
    throw new Error('Sesión no autorizada o expirada.');
  }

  if (!response.ok) {
    throw new Error('Error al crear la habitación.');
  }

  return response.json();
};

export const updateRoom = async (
  roomId: string | number,
  roomData: Partial<Room>
): Promise<Room> => {
  const response = await fetch(`/api/rooms/${roomId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
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
  const response = await fetch(`/api/rooms/${roomId}/rates`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar las tarifas');
  }
};

export const deleteRoom = async (roomId: string | number): Promise<void> => {
  const response = await fetch(`/api/rooms/${roomId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la habitación');
  }
};

export const deleteBulkRooms = async (ids: string[]): Promise<void> => {
  const response = await fetch('/api/rooms/bulk-delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids }),
  });

  if (!response.ok) {
    throw new Error('Error al eliminar las habitaciones seleccionadas');
  }
};