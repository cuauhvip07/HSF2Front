'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Room } from '@/types/room';

interface ViewRoomModalProps {
  isOpen: boolean;
  room: Room | null;
  onClose: () => void;
  onEditClick?: (room: Room) => void;
  onConfigureRatesClick?: (room: Room) => void;
}

export default function ViewRoomModal({
  isOpen,
  room,
  onClose,
  onEditClick,
  onConfigureRatesClick,
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

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'Disponible':
        return 'bg-[#d1fae5] text-[#065f46] border-[#a7f3d0]';
      case 'Ocupada':
      case 'Reservada':
        return 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]';
      case 'Limpieza':
      case 'En Limpieza':
        return 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';
      case 'Mantenimiento':
        return 'bg-[#f3f4f6] text-[#1f2937] border-[#d1d5db]';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const dayRateGroups = room.ratesConfig?.dayRateGroups || [];
  const seasons = room.ratesConfig?.seasons || [];
  const specialDates = room.ratesConfig?.specialDates || [];

  // 🌟 LÓGICA DE Detección de Tarifa Vigente HOY
  const todayISO = new Date().toISOString().split('T')[0];

  // Evaluar si hoy cae en un día especial / ocio
  const activeSpecialDate = specialDates.find((sp) => sp.date === todayISO);

  // Evaluar si hoy cae dentro del rango de alguna temporada
  const activeSeason = seasons.find((s) => {
    return todayISO >= s.startDate && todayISO <= s.endDate;
  });

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
              {room.title || `Habitación N° ${room.number}`}
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
                alt={room.title || 'Habitación'}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                Sin Fotografía
              </div>
            )}
            {room.status && (
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${getStatusBadge(
                    room.status
                  )}`}
                >
                  {room.status}
                </span>
              </div>
            )}
          </div>

          {/* 🌟 TARJETA DE ALERTA: TARIFA APLICABLE HOY SI HAY TEMPORADA / DÍA ESPECIAL */}
          {(activeSpecialDate || activeSeason) && (
            <div className="p-4 rounded-xl border bg-[#fff7ed] border-[#ffedd5] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c2410c] block">
                  🔥 Tarifa Activa Hoy ({todayISO})
                </span>
                <p className="text-sm font-bold text-[#2d2926] mt-0.5">
                  {activeSpecialDate
                    ? `Día Especial: ${activeSpecialDate.reason || 'Fecha de Ocio/Alta Demanda'}`
                    : `Temporada Activa: ${activeSeason?.name}`}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-mono font-extrabold text-[#d95d39]">
                  ${activeSpecialDate?.pricePerNight || activeSeason?.pricePerNight} MXN
                </span>
                <span className="text-[10px] text-[#7c2d12] block">por noche</span>
              </div>
            </div>
          )}

          {/* DESGLOSE COMPLETO DE TODAS LAS TARIFAS Y TEMPORADAS CONFIGURADAS */}
          <div className="bg-[#f7f4ed] p-4 rounded-xl border border-[#e5ded0] space-y-4">
            <div className="flex justify-between items-center border-b border-[#e5ded0] pb-2">
              <p className="text-xs text-[#5a524c] uppercase font-bold tracking-wider">
                Esquema Tarifario Registrado
              </p>
              {onConfigureRatesClick && (
                <button
                  onClick={() => {
                    onClose();
                    onConfigureRatesClick(room);
                  }}
                  className="text-xs text-[#d95d39] font-bold hover:underline"
                >
                  Gestionar Tarifas →
                </button>
              )}
            </div>

            {/* 1. Tarifas Semanales (L, M, X, J, V, S, D) */}
            <div>
              <span className="text-[11px] font-bold text-[#c0a060] uppercase block mb-2">
                1. Tarifas Semanales por Días
              </span>

              {dayRateGroups.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {dayRateGroups.map((group, idx) => (
                    <div
                      key={group.id || idx}
                      className="bg-white p-2.5 rounded-lg border border-[#e5ded0] flex justify-between items-center"
                    >
                      <div>
                        <span className="text-[10px] text-[#5a524c] block font-semibold">
                          Días ({group.days.join(', ')}):
                        </span>
                      </div>
                      <span className="font-mono font-bold text-sm text-[#2d2926]">
                        ${group.price} MXN
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-[#e5ded0]">
                    <span className="text-[#5a524c] block">Entre Semana (Lun-Jue):</span>
                    <span className="font-mono font-bold text-sm text-[#2d2926]">
                      {room.ratesConfig?.baseWeekdayPrice
                        ? `$${room.ratesConfig.baseWeekdayPrice} MXN`
                        : room.priceRegular || room.priceMin || '$0 MXN'}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-[#e5ded0]">
                    <span className="text-[#5a524c] block">Fin de Semana (Vie-Dom):</span>
                    <span className="font-mono font-bold text-sm text-[#d95d39]">
                      {room.ratesConfig?.baseWeekendPrice
                        ? `$${room.ratesConfig.baseWeekendPrice} MXN`
                        : room.priceHigh || '$0 MXN'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Listado de Temporadas Configuradas */}
            <div className="pt-2 border-t border-[#e5ded0]/60">
              <span className="text-[11px] font-bold text-[#c0a060] uppercase block mb-1.5">
                2. Temporadas de Año ({seasons.length})
              </span>
              {seasons.length > 0 ? (
                <div className="space-y-1.5">
                  {seasons.map((s) => (
                    <div
                      key={s.id}
                      className={`p-2 rounded-lg border text-xs flex justify-between items-center ${
                        todayISO >= s.startDate && todayISO <= s.endDate
                          ? 'bg-[#fff7ed] border-[#fdba74]'
                          : 'bg-white border-[#e5ded0]'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-[#2d2926]">{s.name}</span>
                        <span className="text-[10px] text-[#5a524c] block">
                          Del {s.startDate} al {s.endDate}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-[#d95d39]">
                        ${s.pricePerNight} MXN/noche
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#988f86] italic">No hay temporadas configuradas.</p>
              )}
            </div>

            {/* 3. Listado de Días Especiales / Ocio / Puentes */}
            <div className="pt-2 border-t border-[#e5ded0]/60">
              <span className="text-[11px] font-bold text-[#d95d39] uppercase block mb-1.5">
                3. Días Especiales / Fechas de Ocio ({specialDates.length})
              </span>
              {specialDates.length > 0 ? (
                <div className="space-y-1.5">
                  {specialDates.map((sp) => (
                    <div
                      key={sp.id}
                      className={`p-2 rounded-lg border text-xs flex justify-between items-center ${
                        todayISO === sp.date
                          ? 'bg-[#fff7ed] border-[#fdba74]'
                          : 'bg-white border-[#e5ded0]'
                      }`}
                    >
                      <div>
                        <span className="font-mono font-bold text-[#2d2926]">
                          {sp.date}
                        </span>
                        {sp.reason && (
                          <span className="text-[10px] text-[#5a524c] block">
                            {sp.reason}
                          </span>
                        )}
                      </div>
                      <span className="font-mono font-bold text-[#d95d39]">
                        ${sp.pricePerNight} MXN
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#988f86] italic">No hay días especiales o festivos asignados.</p>
              )}
            </div>
          </div>

          {/* Especificaciones y Descripción */}
          <div>
            <h4 className="text-xs font-bold text-[#c0a060] uppercase tracking-wider mb-3">
              Especificaciones de la Habitación
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f7f4ed]/40 p-4 rounded-xl border border-[#e5ded0]/60 mb-3">
              <div>
                <p className="text-[11px] text-[#5a524c] font-semibold">Categoría / Tipo</p>
                <p className="text-sm font-bold text-[#2d2926] mt-0.5">{room.type || room.title}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#5a524c] font-semibold">Capacidad Máxima</p>
                <p className="text-sm font-medium text-[#2d2926] mt-0.5">{room.capacity}</p>
              </div>
            </div>
            {room.description && (
              <p className="text-xs text-[#5a524c] leading-relaxed italic bg-white p-3 rounded-lg border border-[#e5ded0]">
                "{room.description}"
              </p>
            )}
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