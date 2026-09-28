'use client';

import { useEffect } from 'react';
import { Guest } from './GuestTable';

interface ViewGuestModalProps {
  isOpen: boolean;
  guest: Guest | null;
  onClose: () => void;
  onEditClick?: (guest: Guest) => void;
}

// Historial mock para la demostración del historial de reservaciones
const mockGuestHistory = [
  {
    folio: 'RS-8821',
    room: 'Habitación Doble Sencilla',
    dates: '12/05/2026 - 15/05/2026',
    status: 'Checked-out',
    amount: '$2,700 MXN',
  },
  {
    folio: 'RS-7410',
    room: 'Habitación Triple Familiar',
    dates: '20/12/2025 - 26/12/2025',
    status: 'Checked-out',
    amount: '$8,400 MXN',
  },
  {
    folio: 'RS-5120',
    room: 'Habitación Doble',
    dates: '14/02/2025 - 16/02/2025',
    status: 'Checked-out',
    amount: '$2,200 MXN',
  },
];

export default function ViewGuestModal({
  isOpen,
  guest,
  onClose,
  onEditClick,
}: ViewGuestModalProps) {
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

  if (!isOpen || !guest) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d2926]/60 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl border border-[#e5ded0] w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col z-10">
        {/* Encabezado */}
        <div className="p-6 border-b border-[#e5ded0] flex items-center justify-between sticky top-0 bg-white z-20">
          <div>
            <span className="text-xs font-mono font-bold text-[#c0a060] uppercase tracking-wider">
              ID Huésped: #{guest.id}
            </span>
            <h3 className="text-xl font-serif font-bold text-[#2d2926]">
              Perfil e Historial del Huésped
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#5a524c] hover:text-[#2d2926] hover:bg-[#f7f4ed] rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Contenido principal */}
        <div className="p-6 flex flex-col gap-6">
          {/* Tarjeta de Resumen */}
          <div className="flex items-center justify-between bg-[#f7f4ed] p-4 rounded-xl border border-[#e5ded0]">
            <div>
              <p className="text-xs text-[#5a524c] uppercase font-bold tracking-wider">
                Estado del Perfil
              </p>
              <p className="text-sm font-semibold text-[#2d2926] mt-0.5">
                Cliente Registrado
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#5a524c] uppercase font-bold tracking-wider">
                Total de Estancias
              </p>
              <p className="text-xl font-bold text-[#2d2926] mt-0.5">
                {guest.totalReservations} {guest.totalReservations === 1 ? 'visita' : 'visitas'}
              </p>
            </div>
          </div>

          {/* Datos Personales y Contacto */}
          <div>
            <h4 className="text-xs font-bold text-[#c0a060] uppercase tracking-wider mb-3">
              Información de Contacto
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f7f4ed]/40 p-4 rounded-xl border border-[#e5ded0]/60">
              <div>
                <p className="text-[11px] text-[#5a524c] font-semibold">Nombre Completo</p>
                <p className="text-sm font-bold text-[#2d2926] mt-0.5">{guest.name}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#5a524c] font-semibold">Correo Electrónico</p>
                <p className="text-sm font-medium text-[#2d2926] mt-0.5">{guest.email}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#5a524c] font-semibold">Teléfono</p>
                <p className="text-sm font-mono font-medium text-[#2d2926] mt-0.5">{guest.phone}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#5a524c] font-semibold">Nacionalidad</p>
                <p className="text-sm font-medium text-[#2d2926] mt-0.5">{guest.nationality}</p>
              </div>
            </div>
          </div>

          {/* Historial de Reservaciones */}
          <div>
            <h4 className="text-xs font-bold text-[#c0a060] uppercase tracking-wider mb-3">
              Historial de Reservaciones
            </h4>
            <div className="bg-white rounded-xl border border-[#e5ded0] overflow-hidden">
              <table className="w-full text-left text-xs text-[#2d2926]">
                <thead className="bg-[#f7f4ed] font-semibold uppercase text-[#5a524c]">
                  <tr>
                    <th className="py-2.5 px-3">Folio</th>
                    <th className="py-2.5 px-3">Habitación</th>
                    <th className="py-2.5 px-3">Fechas</th>
                    <th className="py-2.5 px-3">Monto</th>
                    <th className="py-2.5 px-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5ded0]">
                  {mockGuestHistory.slice(0, guest.totalReservations).map((res) => (
                    <tr key={res.folio} className="hover:bg-[#f7f4ed]/30 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#5a524c]">
                        {res.folio}
                      </td>
                      <td className="py-2.5 px-3 font-medium">{res.room}</td>
                      <td className="py-2.5 px-3 text-[#5a524c]">{res.dates}</td>
                      <td className="py-2.5 px-3 font-semibold">{res.amount}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e0e7ff] text-[#3730a3]">
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                onEditClick(guest);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#2d2926] hover:bg-[#403b37] text-white text-xs font-bold transition-all shadow-sm tracking-wider uppercase flex items-center gap-2"
            >
              Editar Perfil
            </button>
          )}
        </div>
      </div>
    </div>
  );
}