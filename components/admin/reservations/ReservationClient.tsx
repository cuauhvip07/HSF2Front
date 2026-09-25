'use client';

import { useState } from 'react';
import ReservationFilters from '@/components/admin/reservations/ReservationsFilters';
import ReservationTable, { Reservation } from '@/components/admin/reservations/ReservationTable';
import ReservationCalendar from '@/components/admin/reservations/ReservationCalendar';

interface ReservationsClientProps {
  initialReservations: Reservation[];
}

export default function ReservationsClient({ initialReservations }: ReservationsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');

  // Filtrado de reservaciones
  const filteredReservations = initialReservations.filter((res) => {
    const matchesSearch =
      res.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'Todos' || res.status === selectedStatus;

    const matchesDate = selectedDate
      ? res.checkIn <= selectedDate && res.checkOut >= selectedDate
      : true;

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#f7f4ed]/40 min-h-screen">
      <main className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        {/* Encabezado y Alternador de Vista */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#2d2926]">
              Gestión de Reservaciones
            </h2>
            <p className="text-xs text-[#5a524c] mt-1">
              Control de entradas, salidas y calendario del Hotel Santa Fe
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#e5ded0] shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'table'
                  ? 'bg-[#2d2926] text-[#e5ded0]'
                  : 'text-[#5a524c] hover:bg-[#f7f4ed]'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Vista Tabla
            </button>
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'calendar'
                  ? 'bg-[#2d2926] text-[#e5ded0]'
                  : 'text-[#5a524c] hover:bg-[#f7f4ed]'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Vista Calendario
            </button>
          </div>
        </div>

        {/* Filtros de Búsqueda y Estado */}
        <ReservationFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onNewReservation={() => alert('Abrir modal de nueva reservación')}
        />

        {/* Renderizado condicional entre Calendario y Tabla */}
        {viewMode === 'calendar' ? (
          <ReservationCalendar
            reservations={initialReservations}
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
            onView={(res) => alert(`Ver detalles de ${res.id}`)}
            onEdit={(res) => alert(`Editar ${res.id}`)}
          />
        )}
      </main>
    </div>
  );
}