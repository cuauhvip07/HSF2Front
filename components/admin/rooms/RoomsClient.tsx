'use client';

import { useState } from 'react';
import RoomFilters from '@/components/admin/rooms/RoomFilters';
import RoomTable, { Room } from '@/components/admin/rooms/RoomTable';
import ViewRoomModal from '@/components/admin/rooms/ViewRoomModal';
import EditRoomModal from '@/components/admin/rooms/EditRoomModal';
import RoomFormModal from '@/components/admin/rooms/RoomFormModal';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal';

interface RoomsClientProps {
  initialRooms: Room[];
}

export default function RoomsClient({ initialRooms }: RoomsClientProps) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedType, setSelectedType] = useState('Todos');

  // Selección Múltiple
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([]);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modales
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const [viewingRoom, setViewingRoom] = useState<Room | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Eliminación (Individual y Masiva)
  const [deletingRoom, setDeletingRoom] = useState<Room | null>(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Handlers para Selección
  const handleSelectRoom = (id: string) => {
    setSelectedRoomIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllPage = (visibleIds: string[]) => {
    const allSelected = visibleIds.every((id) => selectedRoomIds.includes(id));
    if (allSelected) {
      setSelectedRoomIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedRoomIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  // Handlers de Apertura de Modales
  const handleViewClick = (room: Room) => {
    setViewingRoom(room);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (room: Room) => {
    setEditingRoom(room);
    setIsEditModalOpen(true);
  };

  const handleDeleteSingle = (room: Room) => {
    setDeletingRoom(room);
    setIsBulkDelete(false);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteBulk = () => {
    setIsBulkDelete(true);
    setDeletingRoom(null);
    setIsDeleteModalOpen(true);
  };

  // Guardar Nueva Habitación
  const handleCreateRoom = (newRoom: Room) => {
    setRooms((prev) => [newRoom, ...prev]);
  };

  // Confirmar Eliminación
  const handleConfirmDelete = () => {
    if (isBulkDelete) {
      setRooms((prev) => prev.filter((r) => !selectedRoomIds.includes(r.id)));
      setSelectedRoomIds([]);
    } else if (deletingRoom) {
      setRooms((prev) => prev.filter((item) => item.id !== deletingRoom.id));
      setSelectedRoomIds((prev) => prev.filter((id) => id !== deletingRoom.id));
    }
    setIsDeleteModalOpen(false);
    setDeletingRoom(null);
    setIsBulkDelete(false);
  };

  const handleSaveRoom = (updatedRoom: Room) => {
    setRooms((prev) =>
      prev.map((item) => (item.id === updatedRoom.id ? updatedRoom : item))
    );
  };

  // Filtrado y Paginación
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

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage) || 1;
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

        {/* Filtros + Eliminación Masiva + Botón Nueva Habitación */}
        <RoomFilters
          searchTerm={searchTerm}
          setSearchTerm={(term) => {
            setSearchTerm(term);
            setCurrentPage(1);
          }}
          selectedStatus={selectedStatus}
          setSelectedStatus={(status) => {
            setSelectedStatus(status);
            setCurrentPage(1);
          }}
          selectedType={selectedType}
          setSelectedType={(type) => {
            setSelectedType(type);
            setCurrentPage(1);
          }}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={(pageSize) => {
            setItemsPerPage(pageSize);
            setCurrentPage(1);
          }}
          selectedCount={selectedRoomIds.length}
          onDeleteSelected={handleDeleteBulk}
          onNewRoom={() => setIsFormModalOpen(true)}
        />

        {/* Tabla Paginada con Checkboxes */}
        <RoomTable
          rooms={paginatedRooms}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          selectedRoomIds={selectedRoomIds}
          onSelectRoom={handleSelectRoom}
          onSelectAllPage={handleSelectAllPage}
          onPageChange={(page) => setCurrentPage(page)}
          onView={handleViewClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteSingle}
        />
      </main>

      {/* Modal Registrar Nueva Habitación */}
      <RoomFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleCreateRoom}
      />

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

      {/* Modal Reutilizable de Confirmación de Eliminación */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        itemName={
          isBulkDelete
            ? `${selectedRoomIds.length} habitaciones seleccionadas`
            : deletingRoom
            ? `Habitación N° ${deletingRoom.number}`
            : undefined
        }
        description={
          isBulkDelete
            ? `¿Estás seguro de que deseas eliminar permanentemente estas ${selectedRoomIds.length} habitaciones del inventario?`
            : 'Esta habitación será eliminada permanentemente del sistema de inventario.'
        }
        itemDetails={
          !isBulkDelete && deletingRoom ? (
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
          setIsBulkDelete(false);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}