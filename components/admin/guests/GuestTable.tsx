'use client';

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  lastReservation: string;
  type: 'Frecuente' | 'Nuevo' | 'VIP';
  totalReservations: number;
}

interface GuestTableProps {
  guests: Guest[];
  onView?: (guest: Guest) => void;
  onEdit?: (guest: Guest) => void;
  onHistory?: (guest: Guest) => void;
}

export default function GuestTable({
  guests,
  onView,
  onEdit,
  onHistory,
}: GuestTableProps) {
  const getTypeBadge = (type: Guest['type']) => {
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
      {/* Encabezado de la tarjeta con filtro secundario */}
      <div className="p-6 border-b border-[#e5ded0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-serif font-bold text-[#2d2926]">
          Recent Huéspedes
        </h3>

        <div className="flex items-center gap-2 text-xs text-[#5a524c]">
          <span>Tipo de Huésped:</span>
          <select className="bg-[#f7f4ed] border border-[#e5ded0] rounded-lg px-3 py-1.5 font-medium text-[#2d2926] focus:outline-none focus:border-[#c0a060]">
            <option value="todos">Todos</option>
            <option value="frecuente">Frecuente</option>
            <option value="nuevo">Nuevo</option>
            <option value="vip">VIP</option>
          </select>
        </div>
      </div>

      {/* Tabla de registros */}
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
              <th className="py-3 px-4">Total Reservas</th>
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
                  <td className="py-3.5 px-4 font-semibold text-center sm:text-left">
                    {guest.totalReservations}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex justify-center items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onView?.(guest)}
                        className="p-1.5 text-[#5a524c] hover:text-[#c0a060] transition-colors rounded-lg hover:bg-[#f7f4ed]"
                        title="Ver detalle del huésped"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit?.(guest)}
                        className="p-1.5 text-[#5a524c] hover:text-[#2d2926] transition-colors rounded-lg hover:bg-[#f7f4ed]"
                        title="Editar información"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => onHistory?.(guest)}
                        className="p-1.5 text-[#5a524c] hover:text-[#d95d39] transition-colors rounded-lg hover:bg-[#f7f4ed]"
                        title="Historial de reservas"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#f7f4ed]/50 border-t border-[#e5ded0] text-xs text-[#5a524c]">
        <span>Página 1 de 15</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-1.5 bg-white border border-[#e5ded0] rounded-lg font-medium hover:bg-[#f7f4ed] transition-colors"
          >
            Anterior
          </button>
          <button
            type="button"
            className="px-3 py-1.5 bg-white border border-[#e5ded0] rounded-lg font-medium hover:bg-[#f7f4ed] transition-colors"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}