import { fetchApi } from '@/lib/api';
import { Room, RoomRatesConfig } from '@/types/room';

export const getRooms = async (): Promise<Room[]> => {
  return await fetchApi<Room[]>('/rooms');
};

export const updateRoom = async (room: Room): Promise<Room> => {
  return await fetchApi<Room>(`/rooms/${room.id}`, {
    method: 'PUT',
    body: JSON.stringify(room),
  });
};

export const updateRoomRates = async (
  roomId: string | number,
  config: RoomRatesConfig
): Promise<{ message: string }> => {
  return await fetchApi<{ message: string }>(`/rooms/${roomId}/rates`, {
    method: 'PUT',
    body: JSON.stringify(config),
  });
};

export const deleteRoom = async (roomId: string | number): Promise<void> => {
  await fetchApi(`/rooms/${roomId}`, {
    method: 'DELETE',
  });
};

export const deleteBulkRooms = async (roomIds: string[]): Promise<void> => {
  await fetchApi('/rooms/delete-bulk', {
    method: 'POST',
    body: JSON.stringify({ ids: roomIds }),
  });
};