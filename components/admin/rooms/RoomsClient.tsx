'use client';

import { useState } from 'react';
import RoomFilters from '@/components/admin/rooms/RoomFilters';
import RoomTable, { Room } from '@/components/admin/rooms/RoomTable';
import ViewRoomModal from '@/components/admin/rooms/ViewRoomModal';
import EditRoomModal from '@/components/admin/rooms/EditRoomModal';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal';

interface RoomsClientProps {
  initialRooms: Room[];
}

export default function RoomsClient({ initialRooms }: RoomsClientProps) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedType, setSelectedType] = useState('Todos');

  // Modales
  const [viewingRoom, setViewingRoom] = useState<Room | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [deletingRoom, setDeletingRoom] = useState<Room | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleViewClick = (room: Room) => {
    setViewingRoom(room);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (room: Room) => {
    setEditingRoom(room);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (room: Room) => {
    setDeletingRoom(room);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingRoom) {
      setRooms((prev) => prev.filter((item) => item.id !== deletingRoom.id));
      setIsDeleteModalOpen(false);
      setDeletingRoom(null);
    }
  };

  const handleSaveRoom = (updatedRoom: Room) => {
    setRooms((prev) =>
      prev.map((item) => (item.id === updatedRoom.id ? updatedRoom : item))
    );
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.number.includes(searchTerm) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.id.includes(searchTerm) ||
      room.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'Todos' || room.status === selectedStatus;

    const matchesType =
      selectedType === 'Todos' || room.type === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#f7f4ed]/40 min-h-screen">
      <main className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#2d2926]">
            Gestión de Habitaciones
          </h2>
          <p className="text-xs text-[#5a524c] mt-1">
            Administra y visualiza el inventario de tus habitaciones
          </p>
        </div>

        <RoomFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          onNewRoom={() => alert('Abrir modal para agregar nueva habitación')}
        />

        <RoomTable
          rooms={filteredRooms}
          onView={handleViewClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </main>

      {/* Modal Ver Detalle */}
      <ViewRoomModal
        isOpen={isViewModalOpen}
        room={viewingRoom}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingRoom(null);
        }}
        onEditClick={handleEditClick}
      />

      {/* Modal Editar */}
      <EditRoomModal
        isOpen={isEditModalOpen}
        room={editingRoom}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingRoom(null);
        }}
        onSave={handleSaveRoom}
      />

      {/* Modal Reutilizable de Confirmación para Eliminar */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        itemName={deletingRoom ? `Habitación N° ${deletingRoom.number}` : undefined}
        description="Esta habitación será eliminada permanentemente del sistema de inventario."
        itemDetails={
          deletingRoom ? (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-[#5a524c]">ID:</span>
                <span className="font-mono font-bold">#{deletingRoom.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a524c]">Tipo:</span>
                <span className="font-semibold">{deletingRoom.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a524c]">Precio por Noche:</span>
                <span className="font-semibold">{deletingRoom.price}</span>
              </div>
            </div>
          ) : null
        }
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingRoom(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}