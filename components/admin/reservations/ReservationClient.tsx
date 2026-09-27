'use client';

import { useState } from 'react';
import ReservationFilters from '@/components/admin/reservations/ReservationsFilters';
import ReservationTable, { Reservation } from '@/components/admin/reservations/ReservationTable';
import ReservationCalendar from '@/components/admin/reservations/ReservationCalendar';
import EditReservationModal from '@/components/admin/reservations/EditReservationModal';
import ViewReservationModal from '@/components/admin/reservations/ViewReservationModal';
import NewReservationModal from './NewReservationModal';
import { Guest } from '@/components/admin/guests/GuestTable';

// Mock de huéspedes para autocompletar en la creación de nuevas reservas
const mockGuests: Guest[] = [
  {
    id: '121097',
    name: 'Griselda Morales',
    email: 'gris@gmail.com',
    phone: '901-233-6770',
    nationality: 'Chile',
    lastReservation: '07/23 - 05/23',
    type: 'Frecuente',
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
    type: 'Nuevo',
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
    type: 'Nuevo',
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

  // Estado para el modal de visualización
  const [viewingReservation, setViewingReservation] = useState<Reservation | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Estado para el modal de edición
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Estado para el modal de nueva reservación
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const handleViewClick = (reservation: Reservation) => {
    setViewingReservation(reservation);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setIsEditModalOpen(true);
  };

  const handleSaveReservation = (updatedReservation: Reservation) => {
    setReservations((prev) =>
      prev.map((item) => (item.id === updatedReservation.id ? updatedReservation : item))
    );
  };

  const handleCreateReservation = (newReservation: Reservation) => {
    setReservations((prev) => [newReservation, ...prev]);
  };

  // Filtrado corregido con Optional Chaining y comprobaciones seguras
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
          setSearchTerm={setSearchTerm}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
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
            reservations={filteredReservations}
            selectedDate={selectedDate}
            onClearDateFilter={() => setSelectedDate(null)}
            onView={handleViewClick}
            onEdit={handleEditClick}
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
    </div>
  );
}