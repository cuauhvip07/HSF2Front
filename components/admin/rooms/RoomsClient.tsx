'use client';

import { useState } from 'react';
import RoomFilters from '@/components/admin/rooms/RoomFilters';
import RoomTable, { Room } from '@/components/admin/rooms/RoomTable';

interface RoomsClientProps {
  initialRooms: Room[];
}

export default function RoomsClient({ initialRooms }: RoomsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedType, setSelectedType] = useState('Todos');

  const filteredRooms = initialRooms.filter((room) => {
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
          onView={(room) => alert(`Detalles de Habitación ${room.number}`)}
          onEdit={(room) => alert(`Editar Habitación ${room.number}`)}
          onMaintenance={(room) => alert(`Servicio técnico para Habitación ${room.number}`)}
        />
      </main>
    </div>
  );
}