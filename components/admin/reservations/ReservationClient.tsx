'use client';

import { useState } from 'react';
import ReservationFilters from '@/components/admin/reservations/ReservationsFilters';
import ReservationTable, { Reservation } from '@/components/admin/reservations/ReservationTable';
import ReservationCalendar from '@/components/admin/reservations/ReservationCalendar';
import EditReservationModal from '@/components/admin/reservations/EditReservationModal';
import ViewReservationModal from '@/components/admin/reservations/ViewReservationModal';
import NewReservationModal from './NewReservationModal';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal';
import { Guest } from '@/components/admin/guests/GuestTable';

const mockGuests: Guest[] = [
  {
    id: '121097',
    name: 'Griselda Morales',
    email: 'gris@gmail.com',
    phone: '901-233-6770',
    nationality: 'Chile',
    lastReservation: '07/23 - 05/23',
    totalReservations: 3,
    adults: 2,
    children: 0,
  },
  {
    id: '121092',
    name: 'John Smith',
    email: 'smith@mail.com',
    phone: '901-235-6770',
    nationality: 'Portugal',
    lastReservation: '02/23 - 05/23',
    totalReservations: 2,
    adults: 2,
    children: 0,
  },
  {
    id: '121093',
    name: 'Carlos Ramírez',
    email: 'carlos.ramirez@gmail.com',
    phone: '901-235-6770',
    nationality: 'México',
    lastReservation: '02/23 - 05/23',
    totalReservations: 1,
    adults: 4,
    children: 2,
  },
];

interface ReservationClientProps {
  initialReservations: Reservation[];
}

export default function ReservationClient({ initialReservations }: ReservationClientProps) {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');

  // Selección múltiple
  const [selectedReservationIds, setSelectedReservationIds] = useState<string[]>([]);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modales
  const [viewingReservation, setViewingReservation] = useState<Reservation | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Modales de Eliminación
  const [deletingReservation, setDeletingReservation] = useState<Reservation | null>(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selección Handlers
  const handleSelectReservation = (id: string) => {
    setSelectedReservationIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllPage = (visibleIds: string[]) => {
    const allSelected = visibleIds.every((id) => selectedReservationIds.includes(id));
    if (allSelected) {
      setSelectedReservationIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedReservationIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const handleViewClick = (reservation: Reservation) => {
    setViewingReservation(reservation);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setIsEditModalOpen(true);
  };

  const handleDeleteSingle = (reservation: Reservation) => {
    setDeletingReservation(reservation);
    setIsBulkDelete(false);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteBulk = () => {
    setIsBulkDelete(true);
    setDeletingReservation(null);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (isBulkDelete) {
      setReservations((prev) => prev.filter((r) => !selectedReservationIds.includes(r.id)));
      setSelectedReservationIds([]);
    } else if (deletingReservation) {
      setReservations((prev) => prev.filter((item) => item.id !== deletingReservation.id));
      setSelectedReservationIds((prev) => prev.filter((id) => id !== deletingReservation.id));
    }
    setIsDeleteModalOpen(false);
    setDeletingReservation(null);
    setIsBulkDelete(false);
  };

  const handleSaveReservation = (updatedReservation: Reservation) => {
    setReservations((prev) =>
      prev.map((item) => (item.id === updatedReservation.id ? updatedReservation : item))
    );
  };

  const handleCreateReservation = (newReservation: Reservation) => {
    setReservations((prev) => [newReservation, ...prev]);
  };

  // Filtrado + Paginación
  const filteredReservations = reservations.filter((res) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      res.guestName.toLowerCase().includes(term) ||
      res.id.toLowerCase().includes(term) ||
      (res.guestEmail ? res.guestEmail.toLowerCase().includes(term) : false) ||
      (res.guestPhone ? res.guestPhone.includes(searchTerm) : false);

    const matchesStatus = selectedStatus === 'Todos' || res.status === selectedStatus;

    const matchesDate = selectedDate
      ? res.checkIn <= selectedDate && res.checkOut >= selectedDate
      : true;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage) || 1;
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 flex flex-col bg-[#f7f4ed]/40 min-h-screen">
      <main className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#2d2926]">
              Gestión de Reservaciones
            </h2>
            <p className="text-xs text-[#5a524c] mt-1">
              Control de entradas, salidas y estado de pago del Hotel Santa Fe
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#e5ded0] shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'table' ? 'bg-[#2d2926] text-[#e5ded0]' : 'text-[#5a524c] hover:bg-[#f7f4ed]'
              }`}
            >
              Vista Tabla
            </button>
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'calendar' ? 'bg-[#2d2926] text-[#e5ded0]' : 'text-[#5a524c] hover:bg-[#f7f4ed]'
              }`}
            >
              Vista Calendario
            </button>
          </div>
        </div>

        <ReservationFilters
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
          selectedDate={selectedDate}
          setSelectedDate={(date) => {
            setSelectedDate(date);
            setCurrentPage(1);
          }}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={(pageSize) => {
            setItemsPerPage(pageSize);
            setCurrentPage(1);
          }}
          selectedCount={selectedReservationIds.length}
          onDeleteSelected={handleDeleteBulk}
          onNewReservation={() => setIsNewModalOpen(true)}
        />

        {viewMode === 'calendar' ? (
          <ReservationCalendar
            reservations={reservations}
            selectedDate={selectedDate}
            onSelectDate={(dateStr) => {
              setSelectedDate(dateStr);
              setViewMode('table');
            }}
          />
        ) : (
          <ReservationTable
            reservations={paginatedReservations}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            selectedReservationIds={selectedReservationIds}
            onSelectReservation={handleSelectReservation}
            onSelectAllPage={handleSelectAllPage}
            onPageChange={(page) => setCurrentPage(page)}
            selectedDate={selectedDate}
            onClearDateFilter={() => setSelectedDate(null)}
            onView={handleViewClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteSingle}
          />
        )}
      </main>

      {/* Modal de Visualización */}
      <ViewReservationModal
        isOpen={isViewModalOpen}
        reservation={viewingReservation}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingReservation(null);
        }}
        onEditClick={handleEditClick}
      />

      {/* Modal de Edición */}
      <EditReservationModal
        isOpen={isEditModalOpen}
        reservation={editingReservation}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingReservation(null);
        }}
        onSave={handleSaveReservation}
      />

      {/* Modal de Nueva Reservación */}
      <NewReservationModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSave={handleCreateReservation}
        existingGuests={mockGuests}
      />

      {/* Modal Reutilizable de Confirmación de Eliminación */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        itemName={
          isBulkDelete
            ? `${selectedReservationIds.length} reservaciones seleccionadas`
            : deletingReservation
            ? `Folio N° ${deletingReservation.id}`
            : undefined
        }
        description={
          isBulkDelete
            ? `¿Estás seguro de que deseas cancelar/eliminar permanentemente estas ${selectedReservationIds.length} reservaciones?`
            : 'Esta reservación será eliminada permanentemente del sistema.'
        }
        itemDetails={
          !isBulkDelete && deletingReservation ? (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-[#5a524c]">Huésped:</span>
                <span className="font-semibold">{deletingReservation.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a524c]">Habitación:</span>
                <span className="font-semibold">{deletingReservation.roomType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a524c]">Monto Total:</span>
                <span className="font-semibold">{deletingReservation.amount}</span>
              </div>
            </div>
          ) : null
        }
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingReservation(null);
          setIsBulkDelete(false);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}