'use client';

import { useState } from 'react';
import GuestFilters from '@/components/admin/guests/GuestFilters';
import GuestTable, { Guest } from '@/components/admin/guests/GuestTable';

interface GuestsClientProps {
  initialGuests: Guest[];
}

export default function GuestsClient({ initialGuests }: GuestsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const filteredGuests = initialGuests.filter((guest) => {
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
      <main className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto w-full">
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