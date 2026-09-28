'use client';

import { useState } from 'react';
import GuestFilters from '@/components/admin/guests/GuestFilters';
import GuestTable, { Guest } from '@/components/admin/guests/GuestTable';
import EditGuestModal from '@/components/admin/guests/EditGuestModal';
import ViewGuestModal from '@/components/admin/guests/ViewGuestModal';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal';

interface GuestsClientProps {
  initialGuests: Guest[];
}

export default function GuestsClient({ initialGuests }: GuestsClientProps) {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  // Modales
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [viewingGuest, setViewingGuest] = useState<Guest | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [deletingGuest, setDeletingGuest] = useState<Guest | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleViewClick = (guest: Guest) => {
    setViewingGuest(guest);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (guest: Guest) => {
    setEditingGuest(guest);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (guest: Guest) => {
    setDeletingGuest(guest);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingGuest) {
      setGuests((prev) => prev.filter((item) => item.id !== deletingGuest.id));
      setIsDeleteModalOpen(false);
      setDeletingGuest(null);
    }
  };

  const handleSaveGuest = (updatedGuest: Guest) => {
    setGuests((prev) =>
      prev.map((item) => (item.id === updatedGuest.id ? updatedGuest : item))
    );
  };

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
          onDelete={handleDeleteClick}
        />
      </main>

      {/* Modal Detalle e Historial */}
      <ViewGuestModal
        isOpen={isViewModalOpen}
        guest={viewingGuest}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingGuest(null);
        }}
        onEditClick={handleEditClick}
      />

      {/* Modal Editar Huésped */}
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

      {/* Modal Reutilizable de Confirmación para Eliminar Huésped */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        itemName={deletingGuest ? `al huésped ${deletingGuest.name}` : undefined}
        description="Se eliminará este perfil. Su historial de reservaciones vinculadas pasará a archivado."
        itemDetails={
          deletingGuest ? (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-[#5a524c]">Correo:</span>
                <span className="font-semibold">{deletingGuest.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a524c]">Teléfono:</span>
                <span className="font-mono font-semibold">{deletingGuest.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a524c]">Categoría:</span>
                <span className="font-semibold">{deletingGuest.type}</span>
              </div>
            </div>
          ) : null
        }
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingGuest(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}