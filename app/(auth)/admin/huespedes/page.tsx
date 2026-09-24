'use client';

import { useState } from 'react';
import Header from '@/components/admin/Header';
import GuestFilters from '@/components/admin/guests/GuestFilters';
import GuestTable, { Guest } from '@/components/admin/guests/GuestTable';

const mockGuests: Guest[] = [
  {
    id: '121097',
    name: 'Guest Name',
    email: 'guest@gmat.com',
    phone: '901-233-6770',
    nationality: 'Chile',
    lastReservation: '07/23 - 05/23',
    type: 'Frecuente',
    totalReservations: 3,
  },
  {
    id: '121092',
    name: 'John Smith',
    email: 'email@smith@mail.com',
    phone: '901-235-6770',
    nationality: 'Portugal',
    lastReservation: '02/23 - 05/23',
    type: 'Nuevo',
    totalReservations: 2,
  },
  {
    id: '121093',
    name: 'John Smith',
    email: 'johnt@egmail.com',
    phone: '901-235-6770',
    nationality: 'China',
    lastReservation: '02/23 - 05/23',
    type: 'Nuevo',
    totalReservations: 1,
  },
  {
    id: '121094',
    name: 'Mark Amtlin',
    email: 'mark@exgmail.com',
    phone: '901-233-6730',
    nationality: 'México',
    lastReservation: '02/23 - 05/23',
    type: 'Nuevo',
    totalReservations: 1,
  },
  {
    id: '121096',
    name: 'Robert Marriah',
    email: 'marri@exgmail.com',
    phone: '901-233-6770',
    nationality: 'Chile',
    lastReservation: '05/23 - 05/23',
    type: 'Frecuente',
    totalReservations: 2,
  },
  {
    id: '121056',
    name: 'Amia Raras',
    email: 'arias@arts@gmail.com',
    phone: '901-335-6770',
    nationality: 'México',
    lastReservation: '05/23 - 05/23',
    type: 'VIP',
    totalReservations: 1,
  },
];

export default function GuestsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const filteredGuests = mockGuests.filter((guest) => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.includes(searchTerm) ||
      guest.id.includes(searchTerm);

    const matchesFilter =
      selectedFilter === 'Todos' || guest.type === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#f7f4ed]/40 min-h-screen">

      <main className="p-8 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#2d2926]">
            Gestión de Huéspedes
          </h2>
          <p className="text-xs text-[#5a524c] mt-1">
            Visualiza y administra el historial de tus clientes
          </p>
        </div>

        <GuestFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          onNewGuest={() => alert('Abrir modal para agregar nuevo huésped')}
        />

        <GuestTable
          guests={filteredGuests}
          onView={(guest) => alert(`Ver información de ${guest.name}`)}
          onEdit={(guest) => alert(`Editar cliente ID: ${guest.id}`)}
          onHistory={(guest) => alert(`Ver historial de ${guest.name}`)}
        />
      </main>
    </div>
  );
}