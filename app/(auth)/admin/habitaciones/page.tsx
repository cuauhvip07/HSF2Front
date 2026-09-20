'use client';

import { useState } from 'react';
import Header from '@/components/admin/Header';
import RoomFilters from '@/components/admin/rooms/RoomFilters';
import RoomTable, { Room } from '@/components/admin/rooms/RoomTable';

const mockRooms: Room[] = [
  {
    id: '121097',
    image: '/image-hero.png',
    number: '230',
    type: 'Suite Presidencial',
    capacity: '2 Ad, 1 Niñ',
    nightlyRate: '$2,400 MXN',
    status: 'Disponible',
    housekeeping: 'Limpia',
  },
  {
    id: '121092',
    image: '/image-hero.png',
    number: '27',
    type: 'Habitación Doble',
    capacity: '2 Ad',
    nightlyRate: '$1,200 MXN',
    status: 'Ocupada',
    housekeeping: 'Limpia',
  },
  {
    id: '121093',
    image: '/image-hero.png',
    number: '20',
    type: 'Habitación Estándar',
    capacity: '2 Ad',
    nightlyRate: '$1,200 MXN',
    status: 'Limpieza',
    housekeeping: 'Pendiente',
  },
  {
    id: '121094',
    image: '/image-hero.png',
    number: '13',
    type: 'Habitación Estándar',
    capacity: '2 Ad',
    nightlyRate: '$1,200 MXN',
    status: 'Limpieza',
    housekeeping: 'Pendiente',
  },
  {
    id: '121095',
    image: '/image-hero.png',
    number: '14',
    type: 'Habitación Estándar',
    capacity: '2 Ad',
    nightlyRate: '$1,200 MXN',
    status: 'Ocupada',
    housekeeping: 'Limpia',
  },
  {
    id: '121099',
    image: '/image-hero.png',
    number: '336',
    type: 'Suite Jr.',
    capacity: '2 Ad',
    nightlyRate: '$1,200 MXN',
    status: 'Mantenimiento',
    housekeeping: 'Limpia',
  },
];

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const filteredRooms = mockRooms.filter((room) => {
    const matchesSearch =
      room.number.includes(searchTerm) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.id.includes(searchTerm) ||
      room.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === 'Todos' || room.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#f7f4ed]/40 min-h-screen">

      <main className="p-8 flex flex-col gap-6">
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
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          onNewRoom={() => alert('Abrir modal para agregar nueva habitación')}
        />

        <RoomTable
          rooms={filteredRooms}
          onView={(room) => alert(`Detalles de Habitación ${room.number}`)}
          onEdit={(room) => alert(`Editar Habitación ${room.number}`)}
          onMaintenance={(room) => alert(`Servicio técnico para Habitación ${room.number}`)}
        />
      </main>
    </div>
  );
}