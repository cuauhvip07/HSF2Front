'use client';

import { Dispatch, SetStateAction } from 'react';

export interface RoomFiltersProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>> | ((value: string) => void);
  selectedStatus: string;
  setSelectedStatus: Dispatch<SetStateAction<string>> | ((status: string) => void);
  selectedType: string;
  setSelectedType: Dispatch<SetStateAction<string>> | ((type: string) => void);
  onNewRoom?: () => void;
}

const statusOptions = ['Todos', 'Disponible', 'Ocupada', 'Mantenimiento', 'Reservada'];
const typeOptions = [
  'Todos',
  'Habitación Doble Sencilla',
  'Habitación Doble',
  'Habitación Triple Familiar',
  'Habitación Cuádruple',
];

export default function RoomFilters({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedType,
  setSelectedType,
  onNewRoom,
}: RoomFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#e5ded0] shadow-sm">
      {/* Campo de Búsqueda */}
      <div className="relative flex-1 min-w-[240px]">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por número o tipo de habitación..."
          className="w-full pl-10 pr-4 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-sm text-[#2d2926] placeholder-[#988f86] focus:outline-none focus:border-[#c0a060] transition-colors"
        />
        <svg
          className="w-4 h-4 text-[#988f86] absolute left-3.5 top-1/2 -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Select para Tipo de Habitación */}
      <div className="flex items-center gap-2">
        <label htmlFor="room-type-select" className="text-xs font-semibold text-[#5a524c] whitespace-nowrap">
          Tipo:
        </label>
        <select
          id="room-type-select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-[#f7f4ed] border border-[#e5ded0] text-[#2d2926] text-xs font-medium rounded-lg px-3 py-2 focus:outline-none focus:border-[#c0a060] transition-colors"
        >
          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Botones de Filtro por Estado */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
        {statusOptions.map((status) => {
          const isActive = selectedStatus === status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-[#2d2926] text-[#e5ded0]'
                  : 'bg-[#f7f4ed] text-[#5a524c] hover:bg-[#e5ded0]'
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>

      {/* Botón Nueva Habitación (Si se pasa como prop) */}
      {onNewRoom && (
        <button
          type="button"
          onClick={onNewRoom}
          className="bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-sm tracking-wider uppercase flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nueva Habitación
        </button>
      )}
    </div>
  );
}