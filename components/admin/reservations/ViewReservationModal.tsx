'use client';

import { useEffect } from 'react';
import { Reservation } from './ReservationTable';

interface ViewReservationModalProps {
  isOpen: boolean;
  reservation: Reservation | null;
  onClose: () => void;
  onEditClick?: (reservation: Reservation) => void;
}

export default function ViewReservationModal({
  isOpen,
  reservation,
  onClose,
  onEditClick,
}: ViewReservationModalProps) {
  // Bloquear / Desbloquear Scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !reservation) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d2926]/60 backdrop-blur-sm animate-fade-in">
      {/* Fondo clickeable para cerrar */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl border border-[#e5ded0] w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col z-10">
        {/* Encabezado */}
        <div className="p-6 border-b border-[#e5ded0] flex items-center justify-between sticky top-0 bg-white z-20">
          <div>
            <span className="text-xs font-mono font-bold text-[#c0a060] uppercase tracking-wider">
              Folio: {reservation.id}
            </span>
            <h3 className="text-xl font-serif font-bold text-[#2d2926]">
              Detalles de Reservación
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#5a524c] hover:text-[#2d2926] hover:bg-[#f7f4ed] rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido de Detalles */}
        <div className="p-6 flex flex-col gap-6">
          {/* Badge de Estado y Folio */}
          <div className="flex items-center justify-between bg-[#f7f4ed] p-4 rounded-xl border border-[#e5ded0]">
            <div>
              <p className="text-xs text-[#5a524c] uppercase font-bold tracking-wider">Estado Actual</p>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${getBadgeStyle(reservation.status)}`}>
                {reservation.status}
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#5a524c] uppercase font-bold tracking-wider">Monto Total</p>
              <p className="text-lg font-bold text-[#2d2926] mt-0.5">{reservation.amount}</p>
            </div>
          </div>

          {/* Información del Huésped */}
          <div>
            <h4 className="text-xs font-bold text-[#c0a060] uppercase tracking-wider mb-3">
              Información del Huésped
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f7f4ed]/40 p-4 rounded-xl border border-[#e5ded0]/60">
              <div>
                <p className="text-[11px] text-[#5a524c] font-semibold">Nombre Completo</p>
                <p className="text-sm font-bold text-[#2d2926] mt-0.5">{reservation.guestName}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#5a524c] font-semibold">Teléfono de Contacto</p>
                <p className="text-sm font-mono font-medium text-[#2d2926] mt-0.5">
                  {reservation.guestPhone || 'Sin teléfono registrado'}
                </p>
              </div>
            </div>
          </div>

          {/* Detalles del Hospedaje */}
          <div>
            <h4 className="text-xs font-bold text-[#c0a060] uppercase tracking-wider mb-3">
              Detalles de la Estancia
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f7f4ed]/40 p-4 rounded-xl border border-[#e5ded0]/60">
              <div>
                <p className="text-[11px] text-[#5a524c] font-semibold">Habitación Asignada</p>
                <p className="text-sm font-bold text-[#2d2926] mt-0.5">{reservation.roomType}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#5a524c] font-semibold">Ocupantes</p>
                <p className="text-sm font-medium text-[#2d2926] mt-0.5">
                  {reservation.adults} {reservation.adults === 1 ? 'Adulto' : 'Adultos'}
                  {reservation.children > 0 && `, ${reservation.children} ${reservation.children === 1 ? 'Niño' : 'Niños'}`}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#5a524c] font-semibold">Fecha Check-In</p>
                <p className="text-sm font-medium text-[#2d2926] mt-0.5">{reservation.checkIn}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#5a524c] font-semibold">Fecha Check-Out</p>
                <p className="text-sm font-medium text-[#2d2926] mt-0.5">{reservation.checkOut}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="p-6 border-t border-[#e5ded0] flex items-center justify-end gap-3 bg-[#f7f4ed]/30 sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-[#e5ded0] text-xs font-semibold text-[#5a524c] hover:bg-[#f7f4ed] transition-colors"
          >
            Cerrar
          </button>
          {onEditClick && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onEditClick(reservation);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#2d2926] hover:bg-[#403b37] text-white text-xs font-bold transition-all shadow-sm tracking-wider uppercase flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Editar Reservación
            </button>
          )}
        </div>
      </div>
    </div>
  );
}