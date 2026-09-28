'use client';

import { useState } from 'react';
import GuestFilters from '@/components/admin/guests/GuestFilters';
import GuestTable, { Guest } from '@/components/admin/guests/GuestTable';
import EditGuestModal from '@/components/admin/guests/EditGuestModal';
import ViewGuestModal from '@/components/admin/guests/ViewGuestModal'; // Importar el nuevo modal

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

  // Estado para el modal de ver detalle/historial
  const [viewingGuest, setViewingGuest] = useState<Guest | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Abrir modal de detalles/historial al presionar el ojo o el reloj
  const handleViewClick = (guest: Guest) => {
    setViewingGuest(guest);
    setIsViewModalOpen(true);
  };

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
          onView={handleViewClick}
          onEdit={handleEditClick}
          onHistory={handleViewClick}
        />
      </main>

      {/* Modal de Detalle e Historial */}
      <ViewGuestModal
        isOpen={isViewModalOpen}
        guest={viewingGuest}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingGuest(null);
        }}
        onEditClick={handleEditClick}
      />

      {/* Modal de Edición de Huésped */}
      <EditGuestModal
        isOpen={isEditModalOpen}
        guest={editingGuest}
        existingGuests={guests}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingGuest(null);
        }}
        onSave={handleSaveGuest}
      />
    </div>
  );
}