'use client';

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  lastReservation: string;
  type: string;
  totalReservations: number;
  adults?: number;
  children?: number;
}

interface GuestTableProps {
  guests: Guest[];
  onView?: (guest: Guest) => void;
  onEdit?: (guest: Guest) => void;
  onDelete?: (guest: Guest) => void; // <-- Propiedad agregada
  onHistory?: (guest: Guest) => void;
}

export default function GuestTable({
  guests,
  onView,
  onEdit,
  onDelete,
  onHistory,
}: GuestTableProps) {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Frecuente':
        return 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';
      case 'Nuevo':
        return 'bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]';
      case 'VIP':
        return 'bg-[#fce7f3] text-[#9d174d] border-[#fbcfe8]';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5ded0] overflow-hidden">
      <div className="p-6 border-b border-[#e5ded0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-serif font-bold text-[#2d2926]">
          Listado de Huéspedes
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#2d2926]">
          <thead className="bg-[#f7f4ed] text-xs font-semibold uppercase text-[#5a524c]">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Huésped</th>
              <th className="py-3 px-4">Teléfono</th>
              <th className="py-3 px-4">Nacionalidad</th>
              <th className="py-3 px-4">Última Reserva</th>
              <th className="py-3 px-4">Tipo</th>
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
              guests.map((guest) => (
                <tr key={guest.id} className="hover:bg-[#f7f4ed]/50 transition-colors">
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
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${getTypeBadge(
                        guest.type
                      )}`}
                    >
                      {guest.type}
                    </span>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}