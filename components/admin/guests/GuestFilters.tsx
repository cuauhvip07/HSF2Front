'use client';

import { Dispatch, SetStateAction, useState } from 'react';



export interface GuestFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void; // <-- Tipado explícito de la función
  itemsPerPage?: number;
  setItemsPerPage?: (pageSize: number) => void;
  selectedCount?: number;
  onDeleteSelected?: () => void;
  onNewGuest?: () => void;
}

export default function GuestFilters({
  searchTerm,
  setSearchTerm,
  itemsPerPage = 10,
  setItemsPerPage,
  selectedCount = 0,
  onDeleteSelected,
  onNewGuest,
}: GuestFiltersProps) {
  const safeItemsPerPage = Number(itemsPerPage) || 10;

  const [selectedPageSizeOption, setSelectedPageSizeOption] = useState<string>(
    safeItemsPerPage === 10 || safeItemsPerPage === 100
      ? safeItemsPerPage.toString()
      : 'custom'
  );

  const [customInputValue, setCustomInputValue] = useState<string>(
    safeItemsPerPage === 10 || safeItemsPerPage === 100
      ? ''
      : String(safeItemsPerPage)
  );

  const handleSelectPageSizeChange = (optionValue: string) => {
    setSelectedPageSizeOption(optionValue);
    if (!setItemsPerPage) return;

    if (optionValue === '10') {
      setItemsPerPage(10);
    } else if (optionValue === '100') {
      setItemsPerPage(100);
    } else if (optionValue === 'custom') {
      const parsed = parseInt(customInputValue, 10);
      if (!isNaN(parsed) && parsed > 0) {
        setItemsPerPage(parsed);
      }
    }
  };

  const handleCustomInputChange = (val: string) => {
    setCustomInputValue(val);
    if (!setItemsPerPage) return;

    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setItemsPerPage(parsed);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#e5ded0] shadow-sm">
      {/* Campo de búsqueda */}
      <div className="relative flex-1 min-w-[240px]">
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

      <div className="flex flex-wrap items-center gap-3">
        {/* BOTÓN DE ELIMINACIÓN MASIVA (Aparece cuando selectedCount > 0) */}
        {selectedCount > 0 && onDeleteSelected && (
          <button
            type="button"
            onClick={onDeleteSelected}
            className="bg-[#fee2e2] hover:bg-[#fca5a5] text-[#991b1b] border border-[#fca5a5] text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-sm flex items-center gap-2 animate-fade-in whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Eliminar Selección ({selectedCount})
          </button>
        )}

        {/* Selector de elementos por página */}
        <div className="flex items-center gap-2 bg-[#f7f4ed]/60 px-3 py-1.5 rounded-lg border border-[#e5ded0]">
          <span className="text-xs font-semibold text-[#5a524c] whitespace-nowrap">
            Mostrar:
          </span>
          <select
            value={selectedPageSizeOption}
            onChange={(e) => handleSelectPageSizeChange(e.target.value)}
            className="bg-transparent text-xs font-bold text-[#2d2926] focus:outline-none cursor-pointer"
          >
            <option value="10">10 por pág.</option>
            <option value="100">100 por pág.</option>
            <option value="custom">Personalizado...</option>
          </select>

          {selectedPageSizeOption === 'custom' && (
            <input
              type="number"
              min="1"
              max="500"
              placeholder="Ej. 25"
              value={customInputValue}
              onChange={(e) => handleCustomInputChange(e.target.value)}
              className="w-16 px-2 py-0.5 bg-white border border-[#e5ded0] rounded text-xs font-mono font-bold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
            />
          )}
        </div>

        {/* Botón Registrar Nuevo Huésped */}
        {onNewGuest && (
          <button
            type="button"
            onClick={onNewGuest}
            className="bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all shadow-sm tracking-wider uppercase flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Huésped
          </button>
        )}
      </div>
    </div>
  );
}