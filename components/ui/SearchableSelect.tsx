'use client';

import { useState, useRef, useEffect } from 'react';

export interface Option {
  id: string;
  label: string;     
  subLabel?: string;  
  value: string;     
  rawItem?: any;      
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string, selectedOption?: Option) => void;
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

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtrado flexible por label o subLabel
  const filteredOptions = options
    .filter(
      (opt) =>
        opt.label.toLowerCase().includes(query.toLowerCase()) ||
        (opt.subLabel && opt.subLabel.toLowerCase().includes(query.toLowerCase())) ||
        opt.value.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, maxResults);

  const handleSelect = (option: Option) => {
    setQuery(option.label);
    onChange(option.value, option);
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

        {isOpen && filteredOptions.length > 0 && (
          <ul className="absolute z-30 left-0 right-0 mt-1 bg-white border border-[#e5ded0] rounded-xl shadow-lg max-h-52 overflow-y-auto divide-y divide-[#e5ded0]/50">
            {filteredOptions.map((opt) => (
              <li
                key={opt.id}
                onClick={() => handleSelect(opt)}
                className="px-3.5 py-2.5 text-xs font-medium text-[#2d2926] hover:bg-[#f7f4ed] hover:text-[#c0a060] cursor-pointer transition-colors flex flex-col gap-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#2d2926]">{opt.label}</span>
                  <span className="text-[10px] text-[#5a524c] font-mono">#{opt.id}</span>
                </div>
                {opt.subLabel && (
                  <span className="text-[11px] text-[#5a524c]">{opt.subLabel}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="text-[11px] text-[#d95d39] mt-1 font-medium">{error}</p>}
    </div>
  );
}