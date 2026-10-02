'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoomFilters from '@/components/admin/rooms/RoomFilters';
import RoomTable from '@/components/admin/rooms/RoomTable';
import ViewRoomModal from '@/components/admin/rooms/ViewRoomModal';
import EditRoomModal from '@/components/admin/rooms/EditRoomModal';
import RoomRatesModal from '@/components/admin/rooms/RoomRatesModal';
import RoomFormModal from '@/components/admin/rooms/RoomFormModal';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal';
import { Room, RoomRatesConfig } from '@/types/room';
import { updateRoomRates, deleteRoom, deleteBulkRooms } from '@/services/roomService';

interface RoomsClientProps {
  initialRooms: Room[];
  availableRoomTypes?: string[];
}

export default function RoomsClient({
  initialRooms,
  availableRoomTypes = [],
}: RoomsClientProps) {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedType, setSelectedType] = useState('Todos');

  useEffect(() => {
    setRooms(initialRooms);
  }, [initialRooms]);

  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const [viewingRoom, setViewingRoom] = useState<Room | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [ratesRoom, setRatesRoom] = useState<Room | null>(null);
  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false);

  const [deletingRoom, setDeletingRoom] = useState<Room | null>(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleViewClick = (room: Room) => {
    setViewingRoom(room);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (room: Room) => {
    setEditingRoom(room);
    setIsEditModalOpen(true);
  };

  const handleConfigureRatesClick = (room: Room) => {
    setRatesRoom(room);
    setIsRatesModalOpen(true);
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
    setIsFormModalOpen(false);
    router.refresh();
  };

  const handleConfirmDelete = async () => {
    try {
      if (isBulkDelete) {
        await deleteBulkRooms(selectedRoomIds);
        setRooms((prev) => prev.filter((r) => !selectedRoomIds.includes(String(r.id))));
        setSelectedRoomIds([]);
      } else if (deletingRoom) {
        await deleteRoom(deletingRoom.id);
        setRooms((prev) => prev.filter((item) => String(item.id) !== String(deletingRoom.id)));
        setSelectedRoomIds((prev) => prev.filter((id) => id !== String(deletingRoom.id)));
      }
      router.refresh();
    } catch (error) {
      console.error('Error al eliminar habitación(es):', error);
    } finally {
      setIsDeleteModalOpen(false);
      setDeletingRoom(null);
      setIsBulkDelete(false);
    }
  };

  const handleSaveRoom = (updatedRoom: Room) => {
    setRooms((prev) =>
      prev.map((item) => (String(item.id) === String(updatedRoom.id) ? updatedRoom : item))
    );
    router.refresh();
  };

  const handleSaveRates = async (roomId: string | number, newConfig: RoomRatesConfig) => {
    try {
      await updateRoomRates(roomId, newConfig);

      setRooms((prev) =>
        prev.map((item) => {
          if (String(item.id) === String(roomId)) {
            return {
              ...item,
              ratesConfig: newConfig,
              priceRegular: `$${newConfig.baseWeekdayPrice} MXN`,
              priceHigh: `$${newConfig.baseWeekendPrice} MXN`,
              price: `$${newConfig.baseWeekdayPrice.toLocaleString('es-MX')} MXN`,
            };
          }
          return item;
        })
      );
      router.refresh();
    } catch (error) {
      console.error('Error al guardar esquema de tarifas:', error);
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const roomNumber = room.number ? String(room.number) : '';
    const roomType = room.type ? room.type.toLowerCase() : '';
    const roomTitle = room.title ? room.title.toLowerCase() : '';
    const roomId = String(room.id);
    const roomStatus = room.status ? room.status.toLowerCase() : '';

    const searchLower = searchTerm.toLowerCase();

    const matchesSearch =
      roomNumber.includes(searchLower) ||
      roomType.includes(searchLower) ||
      roomTitle.includes(searchLower) ||
      roomId.includes(searchLower) ||
      roomStatus.includes(searchLower);

    const matchesStatus =
      selectedStatus === 'Todos' || roomStatus === selectedStatus.toLowerCase();

    const matchesType =
      selectedType === 'Todos' ||
      roomType === selectedType.toLowerCase() ||
      roomTitle === selectedType.toLowerCase();

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
            Administra y visualiza el inventario y tarifas de tus habitaciones
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
          availableRoomTypes={availableRoomTypes}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={(pageSize) => {
            setItemsPerPage(pageSize);
            setCurrentPage(1);
          }}
          selectedCount={selectedRoomIds.length}
          onDeleteSelected={handleDeleteBulk}
          onNewRoom={() => setIsFormModalOpen(true)}
        />

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
          onConfigureRates={handleConfigureRatesClick}
        />
      </main>

      {/* Modal Registrar Nueva Habitación */}
      <RoomFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleCreateRoom}
      />

      <ViewRoomModal
        isOpen={isViewModalOpen}
        room={viewingRoom}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingRoom(null);
        }}
        onEditClick={handleEditClick}
        onConfigureRatesClick={handleConfigureRatesClick}
      />

      <EditRoomModal
        isOpen={isEditModalOpen}
        room={editingRoom}
        availableRoomTypes={availableRoomTypes}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingRoom(null);
        }}
        onSave={handleSaveRoom}
      />

      <RoomRatesModal
        isOpen={isRatesModalOpen}
        room={ratesRoom}
        onClose={() => {
          setIsRatesModalOpen(false);
          setRatesRoom(null);
        }}
        onSaveRates={handleSaveRates}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        itemName={
          isBulkDelete
            ? `${selectedRoomIds.length} habitaciones seleccionadas`
            : deletingRoom
            ? `Habitación ${deletingRoom.number ? `N° ${deletingRoom.number}` : deletingRoom.title}`
            : undefined
        }
        description={
          isBulkDelete
            ? `¿Estás seguro de que deseas eliminar permanentemente estas ${selectedRoomIds.length} habitaciones del inventario?`
            : 'Esta habitación será eliminada permanentemente del sistema de inventario.'
        }
        itemDetails={
          !isBulkDelete && deletingRoom ? (
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between">
                <span className="text-[#5a524c]">ID:</span>
                <span className="font-mono font-bold">#{deletingRoom.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a524c]">Tipo:</span>
                <span className="font-semibold">{deletingRoom.type || deletingRoom.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a524c]">Precio por Noche:</span>
                <span className="font-semibold">{deletingRoom.price || deletingRoom.priceRegular}</span>
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