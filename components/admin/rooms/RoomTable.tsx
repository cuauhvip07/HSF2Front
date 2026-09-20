'use client';

import Image from 'next/image';

export interface Room {
  id: string;
  image: string;
  number: string;
  type: string;
  capacity: string;
  nightlyRate: string;
  status: 'Disponible' | 'Ocupada' | 'Limpieza' | 'Mantenimiento';
  housekeeping: 'Limpia' | 'Pendiente';
}

interface RoomTableProps {
  rooms: Room[];
  onView?: (room: Room) => void;
  onEdit?: (room: Room) => void;
  onMaintenance?: (room: Room) => void;
}

export default function RoomTable({
  rooms,
  onView,
  onEdit,
  onMaintenance,
}: RoomTableProps) {
  const getStatusBadge = (status: Room['status']) => {
    switch (status) {
      case 'Disponible':
        return 'bg-[#d1fae5] text-[#065f46] border-[#a7f3d0]';
      case 'Ocupada':
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
    <div className="bg-white rounded-xl shadow-sm border border-[#e5ded0] overflow-hidden">
      {/* Header secundario de la tabla */}
      <div className="p-6 border-b border-[#e5ded0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-serif font-bold text-[#2d2926]">
          Recent Habitaciones
        </h3>

        <div className="flex items-center gap-2 text-xs text-[#5a524c]">
          <span>Estado:</span>
          <select className="bg-[#f7f4ed] border border-[#e5ded0] rounded-lg px-3 py-1.5 font-medium text-[#2d2926] focus:outline-none focus:border-[#c0a060]">
            <option value="todos">Todos</option>
            <option value="disponible">Disponible</option>
            <option value="ocupada">Ocupada</option>
            <option value="limpieza">Limpieza</option>
            <option value="mantenimiento">Mantenimiento</option>
          </select>
        </div>
      </div>

      {/* Tabla de Habitaciones */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#2d2926]">
          <thead className="bg-[#f7f4ed] text-xs font-semibold uppercase text-[#5a524c]">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Imagen</th>
              <th className="py-3 px-4">Número</th>
              <th className="py-3 px-4">Tipo de Habitación</th>
              <th className="py-3 px-4">Capacidad</th>
              <th className="py-3 px-4">Tarifa por Noche</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">Limpieza</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5ded0]">
            {rooms.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-sm text-[#5a524c]">
                  No se encontraron habitaciones registradas.
                </td>
              </tr>
            ) : (
              rooms.map((room) => (
                <tr key={room.id} className="hover:bg-[#f7f4ed]/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-xs text-[#5a524c]">
                    {room.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="relative w-12 h-9 rounded-md overflow-hidden bg-gray-100 border border-[#e5ded0]">
                      <Image
                        src={room.image}
                        alt={`Habitación ${room.number}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#2d2926]">
                    {room.number}
                  </td>
                  <td className="py-3 px-4 font-medium">{room.type}</td>
                  <td className="py-3 px-4 text-xs text-[#5a524c]">{room.capacity}</td>
                  <td className="py-3 px-4 font-semibold text-[#2d2926]">
                    {room.nightlyRate}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                        room.status
                      )}`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs font-medium">
                    <span className={room.housekeeping === 'Limpia' ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
                      {room.housekeeping}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onView?.(room)}
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
                        onClick={() => onEdit?.(room)}
                        className="p-1.5 text-[#5a524c] hover:text-[#2d2926] transition-colors rounded-lg hover:bg-[#f7f4ed]"
                        title="Editar habitación"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => onMaintenance?.(room)}
                        className="p-1.5 text-[#5a524c] hover:text-[#d95d39] transition-colors rounded-lg hover:bg-[#f7f4ed]"
                        title="Registrar mantenimiento / servicio"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
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

        <div className="flex items-center gap-1">
          <button className="px-2.5 py-1 bg-white border border-[#e5ded0] rounded text-[#5a524c] hover:bg-[#e5ded0]">
            &laquo;
          </button>
          <button className="px-3 py-1 bg-white border border-[#e5ded0] rounded text-[#5a524c] hover:bg-[#e5ded0]">
            1
          </button>
          <button className="px-3 py-1 bg-[#d95d39] text-white rounded font-bold">
            2
          </button>
          <button className="px-3 py-1 bg-white border border-[#e5ded0] rounded text-[#5a524c] hover:bg-[#e5ded0]">
            3
          </button>
          <button className="px-3 py-1 bg-white border border-[#e5ded0] rounded text-[#5a524c] hover:bg-[#e5ded0]">
            4
          </button>
          <button className="px-2.5 py-1 bg-white border border-[#e5ded0] rounded text-[#5a524c] hover:bg-[#e5ded0]">
            &raquo;
          </button>
        </div>

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