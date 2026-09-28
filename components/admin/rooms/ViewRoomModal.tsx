'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Room } from './RoomTable';

interface ViewRoomModalProps {
  isOpen: boolean;
  room: Room | null;
  onClose: () => void;
  onEditClick?: (room: Room) => void;
}

export default function ViewRoomModal({
  isOpen,
  room,
  onClose,
  onEditClick,
}: ViewRoomModalProps) {
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

  if (!isOpen || !room) return null;

  const getStatusBadge = (status: Room['status']) => {
    switch (status) {
      case 'Disponible':
        return 'bg-[#d1fae5] text-[#065f46] border-[#a7f3d0]';
      case 'Ocupada':
      case 'Reservada':
        return 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]';
      case 'Limpieza':
        return 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';
      case 'Mantenimiento':
        return 'bg-[#f3f4f6] text-[#1f2937] border-[#d1d5db]';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d2926]/60 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl border border-[#e5ded0] w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col z-10">
        {/* Encabezado */}
        <div className="p-6 border-b border-[#e5ded0] flex items-center justify-between sticky top-0 bg-white z-20">
          <div>
            <span className="text-xs font-mono font-bold text-[#c0a060] uppercase tracking-wider">
              ID: #{room.id}
            </span>
            <h3 className="text-xl font-serif font-bold text-[#2d2926]">
              Habitación N° {room.number}
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
          {/* Fotografía de la Habitación */}
          <div className="relative w-full h-52 rounded-xl overflow-hidden bg-gray-100 border border-[#e5ded0]">
            {room.image ? (
              <Image
                src={room.image}
                alt={`Habitación ${room.number}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                Sin Fotografía
              </div>
            )}
            <div className="absolute top-3 right-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${getStatusBadge(
                  room.status
                )}`}
              >
                {room.status}
              </span>
            </div>
          </div>

          {/* Resumen de Tarifas y Estado */}
          <div className="grid grid-cols-2 gap-4 bg-[#f7f4ed] p-4 rounded-xl border border-[#e5ded0]">
            <div>
              <p className="text-xs text-[#5a524c] uppercase font-bold tracking-wider">
                Tarifa Por Noche
              </p>
              <p className="text-lg font-bold text-[#2d2926] mt-0.5">{room.price}</p>
            </div>
            <div>
              <p className="text-xs text-[#5a524c] uppercase font-bold tracking-wider">
                Limpieza / Housekeeping
              </p>
              <p
                className={`text-sm font-bold mt-1 ${
                  room.housekeeping === 'Limpia' ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {room.housekeeping}
              </p>
            </div>
          </div>

          {/* Especificaciones */}
          <div>
            <h4 className="text-xs font-bold text-[#c0a060] uppercase tracking-wider mb-3">
              Especificaciones de la Habitación
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f7f4ed]/40 p-4 rounded-xl border border-[#e5ded0]/60">
              <div>
                <p className="text-[11px] text-[#5a524c] font-semibold">Categoría / Tipo</p>
                <p className="text-sm font-bold text-[#2d2926] mt-0.5">{room.type}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#5a524c] font-semibold">Capacidad Máxima</p>
                <p className="text-sm font-medium text-[#2d2926] mt-0.5">{room.capacity}</p>
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
                onEditClick(room);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#2d2926] hover:bg-[#403b37] text-white text-xs font-bold transition-all shadow-sm tracking-wider uppercase flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Editar Habitación
            </button>
          )}
        </div>
      </div>
    </div>
  );
}