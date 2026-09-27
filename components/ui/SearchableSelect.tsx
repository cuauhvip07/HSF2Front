'use client';

import { useState, useRef, useEffect } from 'react';

interface Option {
  id: string;
  label: string; // Texto a mostrar en la lista
  value: string; // Valor que se guardará
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string, id?: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  maxResults?: number;
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'Buscar...',
  label,
  error,
  maxResults = 5,
}: SearchableSelectProps) {
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sincronizar estado local cuando cambia la prop value
  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  // Cerrar el menú desplegable si se hace clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtrar los primeros N resultados según la búsqueda
  const filteredOptions = options
    .filter((opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase()) ||
      opt.value.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, maxResults);

  const handleSelect = (option: Option) => {
    setQuery(option.label);
    onChange(option.value, option.id);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label className="block text-xs font-semibold text-[#5a524c] mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border rounded-xl text-sm text-[#2d2926] focus:outline-none transition-colors ${
            error ? 'border-[#d95d39]' : 'border-[#e5ded0] focus:border-[#c0a060]'
          }`}
        />

        {/* Menú Desplegable con Autocompletado */}
        {isOpen && filteredOptions.length > 0 && (
          <ul className="absolute z-30 left-0 right-0 mt-1 bg-white border border-[#e5ded0] rounded-xl shadow-lg max-h-48 overflow-y-auto divide-y divide-[#e5ded0]/50">
            {filteredOptions.map((opt) => (
              <li
                key={opt.id}
                onClick={() => handleSelect(opt)}
                className="px-3.5 py-2 text-xs font-medium text-[#2d2926] hover:bg-[#f7f4ed] hover:text-[#c0a060] cursor-pointer transition-colors flex items-center justify-between"
              >
                <span>{opt.label}</span>
                <span className="text-[10px] text-[#5a524c] font-mono">{opt.id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="text-[11px] text-[#d95d39] mt-1 font-medium">{error}</p>}
    </div>
  );
}