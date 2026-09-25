'use client';

export interface Reservation {
  id: string;
  guestName: string;
  guestEmail: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  occupants: string;
  amount: string;
  status: 'Confirmado' | 'Checked-in' | 'Pendiente' | 'Cancelado';
}

interface ReservationTableProps {
  reservations: Reservation[];
  selectedDate?: string | null;
  onClearDateFilter?: () => void;
  onView?: (reservation: Reservation) => void;
  onEdit?: (reservation: Reservation) => void;
}

export default function ReservationTable({
  reservations,
  selectedDate,
  onClearDateFilter,
  onView,
  onEdit,
}: ReservationTableProps) {
  const getBadgeStyle = (status: Reservation['status']) => {
    switch (status) {
      case 'Confirmado':
        return 'bg-[#d1fae5] text-[#065f46]';
      case 'Checked-in':
        return 'bg-[#dbeafe] text-[#1e40af]';
      case 'Pendiente':
        return 'bg-[#fef3c7] text-[#92400e]';
      case 'Cancelado':
        return 'bg-[#fee2e2] text-[#991b1b]';
      default:
        return 'bg-[#f3f4f6] text-[#374151]';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5ded0] overflow-hidden">
      <div className="p-6 border-b border-[#e5ded0] flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg font-serif font-bold text-[#2d2926]">
          Reservaciones Recientes
        </h3>

        {selectedDate && (
          <div className="flex items-center gap-2 bg-[#f7f4ed] px-3 py-1 rounded-lg border border-[#e5ded0]">
            <span className="text-xs text-[#5a524c]">
              Filtrado por día: <strong className="text-[#2d2926]">{selectedDate}</strong>
            </span>
            {onClearDateFilter && (
              <button
                type="button"
                onClick={onClearDateFilter}
                className="text-xs text-[#d95d39] font-bold hover:underline ml-2"
              >
                ✕ Ver todas
              </button>
            )}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#2d2926]">
          <thead className="bg-[#f7f4ed] text-xs font-semibold uppercase text-[#5a524c]">
            <tr>
              <th className="py-3 px-4">Folio</th>
              <th className="py-3 px-4">Huésped</th>
              <th className="py-3 px-4">Habitación</th>
              <th className="py-3 px-4">Fechas</th>
              <th className="py-3 px-4">Ocupantes</th>
              <th className="py-3 px-4">Monto</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5ded0]">
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-sm text-[#5a524c]">
                  No se encontraron reservaciones con los criterios de búsqueda.
                </td>
              </tr>
            ) : (
              reservations.map((res) => (
                <tr key={res.id} className="hover:bg-[#f7f4ed]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-xs text-[#5a524c]">
                    {res.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#2d2926]">{res.guestName}</div>
                    <div className="text-xs text-[#5a524c]">{res.guestEmail}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{res.roomType}</td>
                  <td className="py-3.5 px-4 text-xs text-[#5a524c]">
                    {res.checkIn} - {res.checkOut}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#5a524c]">{res.occupants}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#2d2926]">
                    {res.amount}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getBadgeStyle(
                        res.status
                      )}`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onView?.(res)}
                        className="p-1.5 text-[#5a524c] hover:text-[#c0a060] transition-colors rounded-lg hover:bg-[#f7f4ed]"
                        title="Ver detalles"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit?.(res)}
                        className="p-1.5 text-[#5a524c] hover:text-[#2d2926] transition-colors rounded-lg hover:bg-[#f7f4ed]"
                        title="Editar"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
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
        <span>Página 1 de 12</span>
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