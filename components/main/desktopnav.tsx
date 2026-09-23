'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DesktopNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full transition-all duration-300 select-none">
      {/* 1. TOP BAR BEIGE SUPERIOR */}
      <div
        className={`bg-[#f7f4ed] text-[#5a524c] text-xs px-8 flex justify-between items-center transition-all duration-300 ease-in-out ${
          isScrolled
            ? '-translate-y-full h-0 py-0 opacity-0 pointer-events-none'
            : 'translate-y-0 h-9 py-2 border-b border-[#e5ded0]/40'
        }`}
      >
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-[#c0a060]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <svg className="w-3.5 h-3.5 text-[#c0a060]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>

          <span className="font-medium">
            ¡Bienvenidos a Hotel Santa Fe! <span className="mx-1">•</span>
            <a href="https://wa.me/527971405931" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Enviar mensaje por WhatsApp
            </a>
            <span className="mx-1">•</span>
            <a href="tel:+527971405931" className="hover:underline">
              Llámanos: 797 140 5931
            </a>
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-medium tracking-wide">
          <Link href="/login" className="hover:text-[#2d2926] tracking-wider uppercase font-semibold">
            LOGIN
          </Link>
        </div>
      </div>

      {/* 2. BARRA PRINCIPAL DE NAVEGACIÓN */}
      <div
        className={`px-8 py-4 flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? 'bg-[#2d2926]/90 backdrop-blur-md shadow-lg text-white'
            : 'bg-black/30 backdrop-blur-xs text-white'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <svg className="w-10 h-10 text-[#c0a060]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M18.364 18.364l-1.414-1.414M7.05 7.05L5.636 5.636" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 17a6 6 0 1112 0" />
          </svg>

          <div className="flex flex-col leading-none text-white">
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#e5ded0]">
              HOTEL
            </span>
            <span className="font-serif text-xl font-bold tracking-tight">
              Santa Fe Chignahuapan
            </span>
          </div>
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-8 text-xs font-semibold tracking-widest text-white uppercase">
          <Link href="/habitaciones" className="hover:text-[#c0a060] transition-colors">
            HABITACIONES
          </Link>
          <Link href="/gastronomia" className="hover:text-[#c0a060] transition-colors">
            GASTRONOMÍA
          </Link>
          <Link href="/experiencias" className="hover:text-[#c0a060] transition-colors">
            EXPERIENCIAS
          </Link>
          <Link href="/servicios" className="hover:text-[#c0a060] transition-colors">
            SERVICIOS
          </Link>
          <Link href="/ubicacion" className="hover:text-[#c0a060] transition-colors">
            UBICACIÓN
          </Link>
        </nav>

        {/* Botón CTA */}
        <Link
          href="/reservar"
          className="bg-[#d95d39] text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#c44f2e] transition-colors shadow-md tracking-wider uppercase"
        >
          RESERVAR AHORA
        </Link>
      </div>
    </div>
  );
}