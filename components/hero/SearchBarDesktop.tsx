'use client';

import { useState, useRef, useEffect } from 'react';

export default function SearchBarDesktop() {
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [isGuestsOpen, setIsGuestsOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsGuestsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Aquí se puede llamar la API
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="hidden md:block w-full max-w-4xl mx-auto relative z-20">
      <form 
        onSubmit={handleSearch}
        className="flex items-center justify-between gap-3 bg-[#f7f4ed]/95 backdrop-blur-md p-3 rounded-full shadow-xl border border-[#c0a060]/40 text-[#2d2926]"
      >
        {/* Check-in */}
        <div className="flex-1 flex flex-col px-4 py-1 hover:bg-white/60 rounded-full transition-colors cursor-pointer">
          <label htmlFor="checkIn" className="text-[10px] font-bold uppercase tracking-wider text-[#d95d39]">
            Llegada
          </label>
          <div className="flex items-center gap-2 mt-0.5">
            <svg className="w-4 h-4 text-[#c0a060] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input
              id="checkIn"
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (checkOut && e.target.value >= checkOut) {
                  setCheckOut('');
                }
              }}
              className="bg-transparent text-sm font-medium focus:outline-none w-full cursor-pointer text-[#2d2926]"
            />
          </div>
        </div>

        <div className="h-8 w-[1px] bg-[#c0a060]/30" />

        {/* Check-out */}
        <div className="flex-1 flex flex-col px-4 py-1 hover:bg-white/60 rounded-full transition-colors cursor-pointer">
          <label htmlFor="checkOut" className="text-[10px] font-bold uppercase tracking-wider text-[#d95d39]">
            Salida
          </label>
          <div className="flex items-center gap-2 mt-0.5">
            <svg className="w-4 h-4 text-[#c0a060] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input
              id="checkOut"
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent text-sm font-medium focus:outline-none w-full cursor-pointer text-[#2d2926]"
            />
          </div>
        </div>

        <div className="h-8 w-[1px] bg-[#c0a060]/30" />

        {/* Selector de Huéspedes */}
        <div className="flex-1 relative" ref={popoverRef}>
          <div 
            onClick={() => setIsGuestsOpen(!isGuestsOpen)}
            className="flex flex-col px-4 py-1 hover:bg-white/60 rounded-full transition-colors cursor-pointer"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d95d39]">
              Huéspedes
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <svg className="w-4 h-4 text-[#c0a060] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm font-medium text-[#2d2926] truncate">
                {adults + childrenCount} {adults + childrenCount === 1 ? 'Persona' : 'Personas'}
              </span>
            </div>
          </div>

          {/* Popover */}
          {isGuestsOpen && (
            <div className="absolute top-full left-0 mt-3 w-72 bg-[#f7f4ed] rounded-2xl shadow-2xl p-4 border border-[#c0a060]/40 z-50 flex flex-col gap-4 text-[#2d2926]">
              {/* Adultos */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">Adultos</p>
                  <p className="text-xs text-[#2d2926]/60">13 años o más</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-8 h-8 rounded-full border border-[#c0a060] flex items-center justify-center font-bold hover:bg-[#c0a060] hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="font-semibold text-sm w-4 text-center">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="w-8 h-8 rounded-full border border-[#c0a060] flex items-center justify-center font-bold hover:bg-[#c0a060] hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="h-[1px] bg-[#c0a060]/20" />

              {/* Niños */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">Niños</p>
                  <p className="text-xs text-[#2d2926]/60">12 años o menos</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                    className="w-8 h-8 rounded-full border border-[#c0a060] flex items-center justify-center font-bold hover:bg-[#c0a060] hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="font-semibold text-sm w-4 text-center">{childrenCount}</span>
                  <button
                    type="button"
                    onClick={() => setChildrenCount(childrenCount + 1)}
                    className="w-8 h-8 rounded-full border border-[#c0a060] flex items-center justify-center font-bold hover:bg-[#c0a060] hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsGuestsOpen(false)}
                className="w-full mt-2 py-2 bg-[#d95d39] text-white text-xs font-semibold rounded-lg hover:bg-[#c24e2b] transition-colors uppercase tracking-wider"
              >
                Aceptar
              </button>
            </div>
          )}
        </div>

        {/* Botón Buscar */}
        <button
          type="submit"
          className="bg-[#c0a060] hover:bg-[#a88a4d] text-white font-semibold px-8 py-3.5 rounded-full transition-colors uppercase tracking-wider text-xs shadow-md shrink-0 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Buscar
        </button>
      </form>
    </div>
  );
}