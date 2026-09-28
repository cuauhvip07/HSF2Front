'use client';

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  lastReservation: string;
  totalReservations: number;
  adults?: number;
  children?: number;
}

interface GuestTableProps {
  guests: Guest[];
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  selectedGuestIds: string[];
  onSelectGuest: (id: string) => void;
  onSelectAllPage: (ids: string[]) => void;
  onPageChange?: (page: number) => void;
  onView?: (guest: Guest) => void;
  onEdit?: (guest: Guest) => void;
  onDelete?: (guest: Guest) => void;
  onHistory?: (guest: Guest) => void;
}

export default function GuestTable({
  guests,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
  selectedGuestIds,
  onSelectGuest,
  onSelectAllPage,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}: GuestTableProps) {
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, guests.length);

  // Verificar si todas las filas visibles de la página actual están seleccionadas
  const visibleIds = guests.map((g) => g.id);
  const isAllPageSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedGuestIds.includes(id));

  const handleMasterCheckboxChange = () => {
    onSelectAllPage(visibleIds);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5ded0] overflow-hidden">
      {/* Encabezado de información */}
      <div className="p-6 border-b border-[#e5ded0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-serif font-bold text-[#2d2926]">
          Listado de Huéspedes
        </h3>
        {guests.length > 0 && (
          <span className="text-xs font-semibold text-[#5a524c]">
            Mostrando {startIndex} - {endIndex} de {guests.length} huéspedes
          </span>
        )}
      </div>

      {/* Tabla con Checkboxes */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#2d2926]">
          <thead className="bg-[#f7f4ed] text-xs font-semibold uppercase text-[#5a524c]">
            <tr>
              <th className="py-3 px-4 w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllPageSelected}
                  onChange={handleMasterCheckboxChange}
                  className="w-4 h-4 rounded border-[#e5ded0] text-[#d95d39] focus:ring-[#c0a060] cursor-pointer"
                />
              </th>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Huésped</th>
              <th className="py-3 px-4">Teléfono</th>
              <th className="py-3 px-4">Nacionalidad</th>
              <th className="py-3 px-4">Última Reserva</th>
              <th className="py-3 px-4 text-center">Total Reservas</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5ded0]">
            {guests.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-sm text-[#5a524c]">
                  No se encontraron huéspedes con los criterios ingresados.
                </td>
              </tr>
            ) : (
              guests.map((guest) => {
                const isSelected = selectedGuestIds.includes(guest.id);
                return (
                  <tr
                    key={guest.id}
                    className={`transition-colors ${
                      isSelected ? 'bg-[#f7f4ed]' : 'hover:bg-[#f7f4ed]/50'
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectGuest(guest.id)}
                        className="w-4 h-4 rounded border-[#e5ded0] text-[#d95d39] focus:ring-[#c0a060] cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-xs text-[#5a524c]">
                      {guest.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#2d2926]">{guest.name}</div>
                      <div className="text-xs text-[#5a524c]">{guest.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-medium text-[#5a524c]">
                      {guest.phone}
                    </td>
                    <td className="py-3.5 px-4 text-xs font-medium">{guest.nationality}</td>
                    <td className="py-3.5 px-4 text-xs text-[#5a524c]">
                      {guest.lastReservation}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-center">
                      {guest.totalReservations}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex justify-center items-center gap-1.5">
                        {onView && (
                          <button
                            type="button"
                            onClick={() => onView(guest)}
                            className="p-1.5 text-[#5a524c] hover:text-[#c0a060] transition-colors rounded-lg hover:bg-[#f7f4ed]"
                            title="Ver detalle del huésped"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        )}
                        {onEdit && (
                          <button
                            type="button"
                            onClick={() => onEdit(guest)}
                            className="p-1.5 text-[#5a524c] hover:text-[#2d2926] transition-colors rounded-lg hover:bg-[#f7f4ed]"
                            title="Editar información"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        )}
                        {onDelete && (
                          <button
                            type="button"
                            onClick={() => onDelete(guest)}
                            className="p-1.5 text-[#5a524c] hover:text-red-600 transition-colors rounded-lg hover:bg-[#f7f4ed]"
                            title="Eliminar huésped"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#f7f4ed]/50 border-t border-[#e5ded0] text-xs text-[#5a524c]">
        <span>
          Página <strong>{currentPage}</strong> de <strong>{totalPages || 1}</strong>
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange && onPageChange(currentPage - 1)}
            className="px-3 py-1.5 bg-white border border-[#e5ded0] rounded-lg font-semibold text-[#2d2926] hover:bg-[#f7f4ed] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange && onPageChange(currentPage + 1)}
            className="px-3 py-1.5 bg-white border border-[#e5ded0] rounded-lg font-semibold text-[#2d2926] hover:bg-[#f7f4ed] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}