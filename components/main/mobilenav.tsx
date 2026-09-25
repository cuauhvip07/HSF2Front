'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    let ticking = false;

    // Optimización 1: Scroll pasivo coordinado con la tasa de refresco del navegador
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled((prev) => {
            const nextState = currentScrollY > 20;
            return prev !== nextState ? nextState : prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Optimización 2: Cambio de estilos en body diferido para evitar reflow forzado
    const frameId = requestAnimationFrame(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    });

    return () => {
      cancelAnimationFrame(frameId);
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
      <div
        className={`flex items-center justify-between px-4 py-3 transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#2d2926]/90 backdrop-blur-md text-white border-b border-[#403a36]'
            : 'bg-[#f7f4ed] text-[#2d2926] border-b border-[#e5ded0]'
        }`}
      >
        {/* Logo */}
        <Link href="/" onClick={handleClose} className="flex items-center gap-2">
          <svg className="w-8 h-8 text-[#c0a060] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M18.364 18.364l-1.414-1.414M7.05 7.05L5.636 5.636" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 17a6 6 0 1112 0" />
          </svg>
          <div className="flex flex-col leading-none">
            <span className={`text-[9px] tracking-widest uppercase font-sans ${isScrolled ? 'text-[#e5ded0]' : 'text-[#5a524c]'}`}>
              HOTEL
            </span>
            <span className="font-serif text-base font-bold tracking-tight">
              Hotel Santa Fe Chignahuapan
            </span>
          </div>
        </Link>

        {/* Botones */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            className="p-3 -mr-2 text-current bg-transparent border-0 cursor-pointer touch-manipulation select-none rounded-full"
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

      {/* Modal Desplegable Móvil */}
      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[999999] flex flex-col bg-[#f7f4ed]">
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

          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <ul className="flex flex-col gap-6 text-base font-semibold tracking-wider text-[#2d2926] uppercase">
              <li>
                <Link href="/" onClick={handleClose} className="block py-2 border-b border-[#e5ded0]/50 hover:text-[#c0a060]">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/habitaciones" onClick={handleClose} className="block py-2 border-b border-[#e5ded0]/50 hover:text-[#c0a060]">
                  Habitaciones
                </Link>
              </li>
              <li>
                <Link href="/guia-turistica" onClick={handleClose} className="block py-2 border-b border-[#e5ded0]/50 hover:text-[#c0a060]">
                  Guia Turistica
                </Link>
              </li>
              <li>
                <Link href="/nosotros" onClick={handleClose} className="block py-2 border-b border-[#e5ded0]/50 hover:text-[#c0a060]">
                  Nosotros
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