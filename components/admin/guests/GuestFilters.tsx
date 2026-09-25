'use client';

import { Dispatch, SetStateAction } from 'react';

export interface GuestFiltersProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>> | ((value: string) => void);
  selectedFilter: string;
  setSelectedFilter: Dispatch<SetStateAction<string>> | ((filter: string) => void);
  onNewGuest?: () => void;
}

const filterOptions = ['Todos', 'Frecuente', 'Nuevo', 'VIP'];

export default function GuestFilters({
  searchTerm,
  setSearchTerm,
  selectedFilter,
  setSelectedFilter,
  onNewGuest,
}: GuestFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#e5ded0] shadow-sm">
      {/* Campo de búsqueda */}
      <div className="relative flex-1 min-w-[280px]">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre, correo o teléfono..."
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

      {/* Botones de filtro rápido */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
        {filterOptions.map((filter) => {
          const isActive = selectedFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-[#2d2926] text-[#e5ded0]'
                  : 'bg-[#f7f4ed] text-[#5a524c] hover:bg-[#e5ded0]'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Botón Registrar Nuevo Huésped */}
      {onNewGuest && (
        <button
          type="button"
          onClick={onNewGuest}
          className="bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all shadow-sm tracking-wider uppercase flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Huésped
        </button>
      )}
    </div>
  );
}