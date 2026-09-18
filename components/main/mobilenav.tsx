'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Función para cerrar el menú al hacer clic en un enlace
  const handleClose = () => setIsOpen(false);

  return (
    <header className="relative w-full bg-[#f7f4ed] px-4 py-3 border-b border-[#e5ded0]">
      <div className="flex items-center justify-between">
        {/* Logo e Identidad */}
        <Link href="/" onClick={handleClose} className="flex items-center gap-2">
          <svg 
            className="w-8 h-8 text-[#c0a060]" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M18.364 18.364l-1.414-1.414M7.05 7.05L5.636 5.636" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 17a6 6 0 1112 0" />
          </svg>

          <div className="flex flex-col leading-none">
            <span className="text-[9px] tracking-widest text-[#5a524c] uppercase font-sans">
              HOTEL
            </span>
            <span className="font-serif text-base font-bold text-[#2d2926] tracking-tight">
              Hotel Santa Fe Chignahuapan
            </span>
          </div>
        </Link>

        {/* Controles del lado derecho */}
        <div className="flex items-center gap-3">
          {/* Botón Reservar */}
          <Link
            href="/reservar"
            onClick={handleClose}
            className="bg-[#d95d39] text-white text-xs font-bold px-5 py-2 rounded-full hover:bg-[#c44f2e] transition-colors shadow-sm tracking-wider uppercase"
          >
            RESERVAR
          </Link>

          {/* Menú Hamburguesa / Cerrar */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            className="text-[#2d2926] p-1 focus:outline-none z-50"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="absolute top-full left-0 w-full bg-[#f7f4ed] border-b border-[#e5ded0] shadow-lg py-6 px-6 z-40 animate-fadeIn">
          <ul className="flex flex-col gap-5 text-sm font-semibold tracking-wider text-[#2d2926] uppercase">
            <li>
              <Link href="/habitaciones" onClick={handleClose} className="block hover:text-[#c0a060] transition-colors">
                Habitaciones
              </Link>
            </li>
            <li>
              <Link href="/gastronomia" onClick={handleClose} className="block hover:text-[#c0a060] transition-colors">
                Gastronomía
              </Link>
            </li>
            <li>
              <Link href="/experiencias" onClick={handleClose} className="block hover:text-[#c0a060] transition-colors">
                Experiencias
              </Link>
            </li>
            <li>
              <Link href="/servicios" onClick={handleClose} className="block hover:text-[#c0a060] transition-colors">
                Servicios
              </Link>
            </li>
            <li>
              <Link href="/ubicacion" onClick={handleClose} className="block hover:text-[#c0a060] transition-colors">
                Ubicación
              </Link>
            </li>
            <li className="pt-4 border-t border-[#e5ded0] flex justify-between items-center text-xs text-[#5a524c]">
              <Link href="/login" onClick={handleClose} className="hover:text-[#2d2926] font-bold">
                LOGIN / MI RESERVA
              </Link>
              {/* <div className="flex gap-2 font-medium">
                <span className="font-bold text-[#2d2926]">ES</span>
                <span>/</span>
                <span className="text-[#988f86]">EN</span>
              </div> */}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}