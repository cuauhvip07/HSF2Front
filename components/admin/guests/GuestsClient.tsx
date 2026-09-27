'use client';

import { useState } from 'react';
import GuestFilters from '@/components/admin/guests/GuestFilters';
import GuestTable, { Guest } from '@/components/admin/guests/GuestTable';
import EditGuestModal from '@/components/admin/guests/EditGuestModal';

interface GuestsClientProps {
  initialGuests: Guest[];
}

export default function GuestsClient({ initialGuests }: GuestsClientProps) {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  // Estado para el modal de edición
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Abrir modal de edición al presionar el lápiz
  const handleEditClick = (guest: Guest) => {
    setEditingGuest(guest);
    setIsEditModalOpen(true);
  };

  // Guardar los cambios del huésped editado
  const handleSaveGuest = (updatedGuest: Guest) => {
    setGuests((prev) =>
      prev.map((item) => (item.id === updatedGuest.id ? updatedGuest : item))
    );

    // Preparado para conexión futura con la API:
    /*
    try {
      await fetch(`/api/admin/guests/${updatedGuest.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGuest),
      });
    } catch (error) {
      console.error('Error al guardar el huésped:', error);
    }
    */
  };

  // Filtrado de la lista
  const filteredGuests = guests.filter((guest) => {
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
          onEdit={handleEditClick}
          onHistory={(guest) => alert(`Ver historial de ${guest.name}`)}
        />
      </main>

      {/* Modal de Edición de Huésped */}
      <EditGuestModal
        isOpen={isEditModalOpen}
        guest={editingGuest}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingGuest(null);
        }}
        onSave={handleSaveGuest}
      />
    </div>
  );
}