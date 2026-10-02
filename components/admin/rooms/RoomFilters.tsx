'use client';

import { useState } from 'react';

export interface RoomFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  availableRoomTypes?: string[];
  itemsPerPage?: number;
  setItemsPerPage?: (pageSize: number) => void;
  selectedCount?: number;
  onDeleteSelected?: () => void;
  onNewRoom?: () => void;
}

const statusOptions = ['Todos', 'Disponible', 'Ocupada', 'Mantenimiento', 'Reservada'];

export default function RoomFilters({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedType,
  setSelectedType,
  availableRoomTypes = [],
  itemsPerPage = 10,
  setItemsPerPage,
  selectedCount = 0,
  onDeleteSelected,
  onNewRoom,
}: RoomFiltersProps) {
  const safeItemsPerPage = Number(itemsPerPage) || 10;
  const typeOptions = ['Todos', ...availableRoomTypes];

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
    <div className="bg-white p-5 rounded-2xl border border-[#e5ded0] shadow-sm flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="relative w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por número o tipo de habitación..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm text-[#2d2926] placeholder-[#988f86] focus:outline-none focus:border-[#c0a060] transition-colors"
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

        <div className="flex items-center justify-start md:justify-end gap-2">
          <label className="text-xs font-semibold text-[#5a524c] whitespace-nowrap">
            Registros por página:
          </label>
          <div className="flex items-center bg-[#f7f4ed]/60 border border-[#e5ded0] rounded-xl px-3 py-1.5 focus-within:border-[#c0a060] transition-colors">
            <select
              value={selectedPageSizeOption}
              onChange={(e) => handleSelectPageSizeChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-[#2d2926] focus:outline-none cursor-pointer pr-1"
            >
              <option value="10">10</option>
              <option value="100">100</option>
              <option value="custom">Personalizado</option>
            </select>

            {selectedPageSizeOption === 'custom' && (
              <div className="flex items-center border-l border-[#e5ded0] pl-2 ml-1">
                <input
                  type="number"
                  min="1"
                  max="500"
                  placeholder="25"
                  value={customInputValue}
                  onChange={(e) => handleCustomInputChange(e.target.value)}
                  className="w-12 bg-white px-2 py-0.5 border border-[#e5ded0] rounded-md text-xs font-mono font-bold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2 border-t border-[#e5ded0]/60">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="room-type-select" className="text-xs font-semibold text-[#5a524c] whitespace-nowrap">
              Tipo:
            </label>
            <select
              id="room-type-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#f7f4ed] border border-[#e5ded0] text-[#2d2926] text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:border-[#c0a060] transition-colors cursor-pointer"
            >
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="room-status-select" className="text-xs font-semibold text-[#5a524c] whitespace-nowrap">
              Estado:
            </label>
            <select
              id="room-status-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#f7f4ed] border border-[#e5ded0] text-[#2d2926] text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:border-[#c0a060] transition-colors cursor-pointer"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          {selectedCount > 0 && onDeleteSelected && (
            <button
              type="button"
              onClick={onDeleteSelected}
              className="bg-[#fee2e2] hover:bg-[#fca5a5] text-[#991b1b] border border-[#fca5a5] text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Eliminar ({selectedCount})
            </button>
          )}

          {onNewRoom && (
            <button
              type="button"
              onClick={onNewRoom}
              className="bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm tracking-wider uppercase flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Nueva Habitación
            </button>
          )}
        </div>
      </div>
    </div>
  );
}