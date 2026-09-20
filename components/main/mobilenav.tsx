'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Garantizar que React se haya montado en el cliente antes de usar Portals
  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquear el scroll de la página cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <header className="relative w-full bg-[#f7f4ed] border-b border-[#e5ded0] z-50">
        <div className="flex items-center justify-between px-4 py-3 bg-[#f7f4ed]">
          
          {/* Logo */}
          <Link href="/" onClick={handleClose} className="flex items-center gap-2">
            <svg className="w-8 h-8 text-[#c0a060] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M18.364 18.364l-1.414-1.414M7.05 7.05L5.636 5.636" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 17a6 6 0 1112 0" />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] tracking-widest text-[#5a524c] uppercase font-sans">HOTEL</span>
              <span className="font-serif text-base font-bold text-[#2d2926] tracking-tight">Hotel Santa Fe Chignahuapan</span>
            </div>
          </Link>

          {/* Botones */}
          <div className="flex items-center gap-2">
            <Link
              href="/reservar"
              onClick={handleClose}
              className="bg-[#d95d39] text-white text-xs font-bold px-3 py-2 rounded-full active:bg-[#c44f2e] transition-colors shadow-sm tracking-wider uppercase"
            >
              RESERVAR
            </Link>

            {/* Botón Hamburguesa */}
            <button 
              type="button"
              onClick={toggleMenu}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              className="p-3 -mr-2 text-[#2d2926] bg-transparent border-0 cursor-pointer touch-manipulation select-none active:bg-black/10 rounded-full"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {isOpen ? (
                <svg className="w-7 h-7 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* RENDERIZADO FUERA DEL CÓDIGO MEDIANTE PORTAL */}
      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[999999] flex flex-col bg-[#f7f4ed]">
          {/* Cabecera interna del portal para mantener estética y botón de cierre */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5ded0] bg-[#f7f4ed]">
            <Link href="/" onClick={handleClose} className="flex items-center gap-2">
              <span className="font-serif text-base font-bold text-[#2d2926]">Hotel Santa Fe</span>
            </Link>
            <button 
              type="button" 
              onClick={handleClose}
              className="p-3 text-[#2d2926] text-xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Enlaces de navegación */}
          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <ul className="flex flex-col gap-6 text-base font-semibold tracking-wider text-[#2d2926] uppercase">
              <li>
                <Link href="/habitaciones" onClick={handleClose} className="block py-2 border-b border-[#e5ded0]/50 hover:text-[#c0a060]">
                  Habitaciones
                </Link>
              </li>
              <li>
                <Link href="/gastronomia" onClick={handleClose} className="block py-2 border-b border-[#e5ded0]/50 hover:text-[#c0a060]">
                  Gastronomía
                </Link>
              </li>
              <li>
                <Link href="/experiencias" onClick={handleClose} className="block py-2 border-b border-[#e5ded0]/50 hover:text-[#c0a060]">
                  Experiencias
                </Link>
              </li>
              <li>
                <Link href="/servicios" onClick={handleClose} className="block py-2 border-b border-[#e5ded0]/50 hover:text-[#c0a060]">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/ubicacion" onClick={handleClose} className="block py-2 border-b border-[#e5ded0]/50 hover:text-[#c0a060]">
                  Ubicación
                </Link>
              </li>
              <li className="pt-4">
                <Link href="/login" onClick={handleClose} className="block py-3 text-sm font-bold text-[#5a524c] bg-[#e5ded0]/40 text-center rounded-lg">
                  LOGIN / MI RESERVA
                </Link>
              </li>
            </ul>
          </nav>
        </div>,
        document.body
      )}
    </>
  );
}