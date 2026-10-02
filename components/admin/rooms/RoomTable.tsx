'use client';

import Image from 'next/image';
import { Room } from '@/types/room';

export interface RoomTableProps {
  rooms: Room[];
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  selectedRoomIds: string[];
  onSelectRoom: (id: string) => void;
  onSelectAllPage: (ids: string[]) => void;
  onPageChange?: (page: number) => void;
  onView?: (room: Room) => void;
  onEdit?: (room: Room) => void;
  onDelete?: (room: Room) => void;
  onConfigureRates?: (room: Room) => void;
}

const WEEKDAY_MAP: Record<number, string> = {
  0: 'D', // Domingo
  1: 'L', // Lunes
  2: 'M', // Martes
  3: 'X', // Miércoles
  4: 'J', // Jueves
  5: 'V', // Viernes
  6: 'S', // Sábado
};

export default function RoomTable({
  rooms,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
  selectedRoomIds,
  onSelectRoom,
  onSelectAllPage,
  onPageChange,
  onView,
  onEdit,
  onDelete,
  onConfigureRates,
}: RoomTableProps) {
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, rooms.length);

  const visibleIds = rooms.map((r) => String(r.id));
  const isAllPageSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedRoomIds.includes(id));

  const handleMasterCheckboxChange = () => {
    onSelectAllPage(visibleIds);
  };

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

  const renderCapacity = (room: Room) => {
    if (room.capacity) return room.capacity;
    if (room.adults !== undefined) {
      return `${room.adults} Ad${(room.children ?? 0) > 0 ? `, ${room.children} Niñ` : ''}`;
    }
    return 'N/A';
  };

  /**
   * Calcula el precio aplicable el día de hoy e identifica si corresponde a una temporada.
   */
  const getCurrentDayRateInfo = (room: Room) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const dayKey = WEEKDAY_MAP[today.getDay()];

    const config = room.ratesConfig;

    // 1. Verificar Días Especiales / Festivos (Máxima prioridad)
    if (config?.specialDates && config.specialDates.length > 0) {
      const matchSpecial = config.specialDates.find((sp) => sp.date === todayStr);
      if (matchSpecial) {
        return {
          price: matchSpecial.pricePerNight,
          label: matchSpecial.reason || 'Día Especial',
          isSeason: false,
          isSpecial: true,
          color: '#d95d39',
        };
      }
    }

    // 2. Verificar Temporadas Activas Hoy
    if (config?.seasons && config.seasons.length > 0) {
      const activeSeason: any = config.seasons.find((s: any) => {
        if (!s.startDate || !s.endDate) return false;
        return todayStr >= s.startDate && todayStr <= s.endDate;
      });

      if (activeSeason) {
        const isWeekendRate =
          activeSeason.weekendPricePerNight &&
          activeSeason.weekendDays?.includes(dayKey);

        const price = isWeekendRate
          ? activeSeason.weekendPricePerNight
          : activeSeason.pricePerNight;

        return {
          price,
          label: activeSeason.name || 'Temporada',
          isSeason: true,
          isSpecial: false,
          color: activeSeason.color || '#c0a060',
        };
      }
    }

    // 3. Tarifa Semanal Habitual por Grupos de Días
    if (config?.dayRateGroups && config.dayRateGroups.length > 0) {
      const matchGroup = config.dayRateGroups.find((g) => g.days.includes(dayKey));
      if (matchGroup) {
        return {
          price: matchGroup.price,
          label: ['V', 'S', 'D'].includes(dayKey) ? 'Fin de Semana' : 'Habitual',
          isSeason: false,
          isSpecial: false,
        };
      }
    }

    // 4. Fallback si no hay reglas configuradas
    const fallbackPrice = Number(room.price?.replace(/[^0-9.]/g, '')) || 0;
    return {
      price: fallbackPrice,
      label: 'Habitual',
      isSeason: false,
      isSpecial: false,
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5ded0] overflow-hidden">
      {/* Encabezado */}
      <div className="p-6 border-b border-[#e5ded0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-[#2d2926]">
            Listado de Habitaciones
          </h3>
          <p className="text-xs text-[#5a524c]">
            Muestra el precio activo el día de hoy según la tarifa o temporada correspondiente.
          </p>
        </div>
        {rooms.length > 0 && (
          <span className="text-xs font-semibold text-[#5a524c]">
            Mostrando {startIndex} - {endIndex} de {rooms.length} habitaciones
          </span>
        )}
      </div>

      {/* Tabla */}
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
              <th className="py-3 px-4">Imagen</th>
              <th className="py-3 px-4">Número / Título</th>
              <th className="py-3 px-4">Capacidad</th>
              <th className="py-3 px-4">Precio Hoy (Exhibición)</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5ded0]">
            {rooms.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-sm text-[#5a524c]">
                  No se encontraron habitaciones registradas.
                </td>
              </tr>
            ) : (
              rooms.map((room) => {
                const roomIdStr = String(room.id);
                const isSelected = selectedRoomIds.includes(roomIdStr);
                const currentRate = getCurrentDayRateInfo(room);

                return (
                  <tr
                    key={room.id}
                    className={`transition-colors ${
                      isSelected ? 'bg-[#f7f4ed]' : 'hover:bg-[#f7f4ed]/50'
                    }`}
                  >
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectRoom(roomIdStr)}
                        className="w-4 h-4 rounded border-[#e5ded0] text-[#d95d39] focus:ring-[#c0a060] cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-xs text-[#5a524c]">
                      #{room.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-9 rounded-md overflow-hidden bg-gray-100 border border-[#e5ded0]">
                        {room.image ? (
                          <Image
                            src={room.image}
                            alt={room.title || `Habitación ${room.number}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                            Sin Foto
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#2d2926]">
                      {room.number ? `Hab. ${room.number}` : room.title}
                    </td>
                    <td className="py-3 px-4 text-xs text-[#5a524c]">
                      {renderCapacity(room)}
                    </td>

                    {/* Columna Precio Hoy con Identificador de Temporada / Color */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-mono font-bold text-sm text-[#2d2926]">
                          ${currentRate.price.toLocaleString('es-MX')} MXN
                        </span>

                        {currentRate.isSeason ? (
                          <span
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-xs"
                            style={{ backgroundColor: currentRate.color }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                            {currentRate.label}
                          </span>
                        ) : currentRate.isSpecial ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5]">
                            ★ {currentRate.label}
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#988f86] font-medium">
                            Tarifa {currentRate.label}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {room.status && (
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                            room.status
                          )}`}
                        >
                          {room.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center items-center gap-1.5">
                        {onConfigureRates && (
                          <button
                            type="button"
                            onClick={() => onConfigureRates(room)}
                            className="p-1.5 text-[#5a524c] hover:text-[#d95d39] transition-colors rounded-lg hover:bg-[#f7f4ed]"
                            title="Gestionar tarifas y temporadas"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        )}
                        {onView && (
                          <button
                            type="button"
                            onClick={() => onView(room)}
                            className="p-1.5 text-[#5a524c] hover:text-[#c0a060] transition-colors rounded-lg hover:bg-[#f7f4ed]"
                            title="Ver detalles"
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
                            onClick={() => onEdit(room)}
                            className="p-1.5 text-[#5a524c] hover:text-[#2d2926] transition-colors rounded-lg hover:bg-[#f7f4ed]"
                            title="Editar habitación"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        )}
                        {onDelete && (
                          <button
                            type="button"
                            onClick={() => onDelete(room)}
                            className="p-1.5 text-[#5a524c] hover:text-red-600 transition-colors rounded-lg hover:bg-[#f7f4ed]"
                            title="Eliminar habitación"
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