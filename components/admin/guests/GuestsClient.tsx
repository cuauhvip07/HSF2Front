'use client';

import { useState } from 'react';
import GuestFilters from '@/components/admin/guests/GuestFilters';
import GuestTable, { Guest } from '@/components/admin/guests/GuestTable';
import EditGuestModal from '@/components/admin/guests/EditGuestModal';
import ViewGuestModal from '@/components/admin/guests/ViewGuestModal';
import NewGuestModal from '@/components/admin/guests/NewGuestModal';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal';

interface GuestsClientProps {
  initialGuests: Guest[];
}

export default function GuestsClient({ initialGuests }: GuestsClientProps) {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [searchTerm, setSearchTerm] = useState('');

  // Selección Múltiple de IDs
  const [selectedGuestIds, setSelectedGuestIds] = useState<string[]>([]);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modales
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const [viewingGuest, setViewingGuest] = useState<Guest | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Modal para eliminar (Soporta individual y masivo)
  const [deletingGuest, setDeletingGuest] = useState<Guest | null>(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Handlers para Selección de Checkboxes
  const handleSelectGuest = (id: string) => {
    setSelectedGuestIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllPage = (visibleIds: string[]) => {
    const allSelected = visibleIds.every((id) => selectedGuestIds.includes(id));
    if (allSelected) {
      setSelectedGuestIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedGuestIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  // Apertura de Modales
  const handleViewClick = (guest: Guest) => {
    setViewingGuest(guest);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (guest: Guest) => {
    setEditingGuest(guest);
    setIsEditModalOpen(true);
  };

  const handleDeleteSingle = (guest: Guest) => {
    setDeletingGuest(guest);
    setIsBulkDelete(false);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteBulk = () => {
    setIsBulkDelete(true);
    setDeletingGuest(null);
    setIsDeleteModalOpen(true);
  };

  // Confirmar Eliminación (Individual o Masiva)
  const handleConfirmDelete = () => {
    if (isBulkDelete) {
      setGuests((prev) => prev.filter((g) => !selectedGuestIds.includes(g.id)));
      setSelectedGuestIds([]);
    } else if (deletingGuest) {
      setGuests((prev) => prev.filter((g) => g.id !== deletingGuest.id));
      setSelectedGuestIds((prev) => prev.filter((id) => id !== deletingGuest.id));
    }
    setIsDeleteModalOpen(false);
    setDeletingGuest(null);
    setIsBulkDelete(false);
  };

  const handleCreateGuest = (newGuest: Guest) => {
    setGuests((prev) => [newGuest, ...prev]);
  };

  const handleSaveGuest = (updatedGuest: Guest) => {
    setGuests((prev) =>
      prev.map((item) => (item.id === updatedGuest.id ? updatedGuest : item))
    );
  };

  // Lógica de Búsqueda y Paginación
  const filteredGuests = guests.filter((guest) => {
    const term = searchTerm.toLowerCase();
    return (
      guest.name.toLowerCase().includes(term) ||
      guest.email.toLowerCase().includes(term) ||
      guest.phone.includes(searchTerm) ||
      guest.id.includes(searchTerm)
    );
  });

  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage) || 1;
  const paginatedGuests = filteredGuests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 flex flex-col bg-[#f7f4ed]/40 min-h-screen">
      <main className="p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#2d2926]">
            Gestión de Huéspedes
          </h2>
          <p className="text-xs text-[#5a524c] mt-1">
            Visualiza, registra y administra el historial de tus clientes
          </p>
        </div>

        {/* Filtros + Eliminación Masiva */}
        <GuestFilters
          searchTerm={searchTerm}
          setSearchTerm={(term) => {
            setSearchTerm(term);
            setCurrentPage(1);
          }}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={(size) => {
            setItemsPerPage(size);
            setCurrentPage(1);
          }}
          selectedCount={selectedGuestIds.length}
          onDeleteSelected={handleDeleteBulk}
          onNewGuest={() => setIsNewModalOpen(true)}
        />

        {/* Tabla Paginada con Checkboxes */}
        <GuestTable
          guests={paginatedGuests}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          selectedGuestIds={selectedGuestIds}
          onSelectGuest={handleSelectGuest}
          onSelectAllPage={handleSelectAllPage}
          onPageChange={(page) => setCurrentPage(page)}
          onView={handleViewClick}
          onEdit={handleEditClick}
          onHistory={handleViewClick}
          onDelete={handleDeleteSingle}
        />
      </main>

      {/* Modal Nuevo Huésped */}
      <NewGuestModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSave={handleCreateGuest}
        existingGuests={guests}
      />

      {/* Modal Ver Detalle */}
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

      {/* Modal Reutilizable de Confirmación de Eliminación */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        itemName={
          isBulkDelete
            ? `${selectedGuestIds.length} huéspedes seleccionados`
            : deletingGuest
            ? `al huésped ${deletingGuest.name}`
            : undefined
        }
        description={
          isBulkDelete
            ? `¿Estás seguro de que deseas eliminar permanentemente a estos ${selectedGuestIds.length} huéspedes?`
            : 'Se eliminará este perfil. Las reservaciones pasadas asociadas se mantendrán archivadas.'
        }
        itemDetails={
          !isBulkDelete && deletingGuest ? (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-[#5a524c]">Correo:</span>
                <span className="font-semibold">{deletingGuest.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a524c]">Teléfono:</span>
                <span className="font-mono font-semibold">{deletingGuest.phone}</span>
              </div>
            </div>
          ) : null
        }
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingGuest(null);
          setIsBulkDelete(false);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}