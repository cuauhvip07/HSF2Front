'use client';

import { useState } from 'react';
import Header from '@/components/admin/Header';
import ReservationFilters from '@/components/admin/reservations/ReservationsFilters';
import ReservationTable, { Reservation } from '@/components/admin/reservations/ReservationTable';

const mockReservations: Reservation[] = [
  {
    id: 'RS-1092',
    guestName: 'Guest Name',
    guestEmail: 'guest@gmat.com',
    roomType: 'Suite Presidencial',
    checkIn: '07/23',
    checkOut: '05/23',
    occupants: '2 Ad, 1 Niñ',
    amount: '$7,200 MXN',
    status: 'Confirmado',
  },
  {
    id: 'RS-1093',
    guestName: 'John Smith',
    guestEmail: 'email@snith@gmail.com',
    roomType: 'Suite Presidencial',
    checkIn: '02/23',
    checkOut: '03/23',
    occupants: '2 Ad, 1 Niñ',
    amount: '$7,200 MXN',
    status: 'Checked-in',
  },
  {
    id: 'RS-1094',
    guestName: 'John Smith',
    guestEmail: 'johnt@egmail.com',
    roomType: 'Room 1',
    checkIn: '02/23',
    checkOut: '03/23',
    occupants: '2 Ad, 1 Niñ',
    amount: '$7,200 MXN',
    status: 'Checked-in',
  },
  {
    id: 'RS-1095',
    guestName: 'Mark Amtlin',
    guestEmail: 'mark@exgmail.com',
    roomType: 'Room 2',
    checkIn: '02/23',
    checkOut: '05/23',
    occupants: '2 Ad, 1 Niñ',
    amount: '$9,200 MXN',
    status: 'Pendiente',
  },
  {
    id: 'RS-1096',
    guestName: 'Robert Marriah',
    guestEmail: 'marri@examail.com',
    roomType: 'Room 2',
    checkIn: '05/23',
    checkOut: '05/23',
    occupants: '2 Ad, 1 Niñ',
    amount: '$9,200 MXN',
    status: 'Pendiente',
  },
  {
    id: 'RS-1097',
    guestName: 'Amia Raras',
    guestEmail: 'amia@raras@gmail.com',
    roomType: 'Room 2',
    checkIn: '05/23',
    checkOut: '05/23',
    occupants: '2 Ad, 1 Niñ',
    amount: '$7,200 MXN',
    status: 'Checked-in',
  },
];

export default function ReservationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');

  const filteredReservations = mockReservations.filter((res) => {
    const matchesSearch =
      res.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'Todos' || res.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#f7f4ed]/40 min-h-screen">

      <main className="p-8 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#2d2926]">
            Reservations Management
          </h2>
          <p className="text-xs text-[#5a524c] mt-1">
            Control de entradas, salidas y estado de pago
          </p>
        </div>

        <ReservationFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          onNewReservation={() => alert('Abrir modal de nueva reservación')}
        />

        <ReservationTable
          reservations={filteredReservations}
          onView={(res) => alert(`Ver detalles de ${res.id}`)}
          onEdit={(res) => alert(`Editar ${res.id}`)}
        />
      </main>
    </div>
  );
}