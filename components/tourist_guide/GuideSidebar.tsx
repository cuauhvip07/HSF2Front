'use client';

import React, { useState } from 'react';
import { ATTRACTIONS_DATA } from './guideData';

interface GuideSidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export const GuideSidebar: React.FC<GuideSidebarProps> = ({ activeId, onSelect }) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const activeItem = ATTRACTIONS_DATA.find((item) => item.id === activeId) || ATTRACTIONS_DATA[0];

  const handleSelect = (id: string) => {
    onSelect(id);
    setIsOpenMobile(false); // Cierra automáticamente el menú en móvil tras seleccionar
  };

  return (
    <>
      {/* ==========================================
          1. BOTÓN Y MENÚ FLOTANTE PARA MÓVIL (< lg)
         ========================================== */}
      <div className="lg:hidden fixed bottom-5 right-5 left-5 z-40 pointer-events-auto">
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="w-full bg-[#2d2926] text-[#ffffff] px-5 py-3.5 rounded-2xl shadow-xl border border-[#c0a060]/40 flex items-center justify-between transition-all duration-200 active:scale-95"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c0a060] shrink-0 animate-pulse" />
            <div className="text-left truncate">
              <p className="text-[10px] text-[#c0a060] uppercase tracking-wider font-semibold">
                Sección Actual
              </p>
              <p className="text-sm font-medium truncate text-[#ffffff]">
                {activeItem.title}
              </p>
            </div>
          </div>
          <span className="bg-[#c0a060] text-[#2d2926] text-xs font-bold px-3 py-1.5 rounded-xl ml-2 shrink-0 flex items-center gap-1">
            🗺️ Índice
          </span>
        </button>
      </div>

      {/* MODAL BOTTOM SHEET PARA MÓVIL */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center bg-[#2d2926]/70 backdrop-blur-sm transition-opacity">
          {/* Overlay para cerrar al tocar afuera */}
          <div
            className="absolute inset-0"
            onClick={() => setIsOpenMobile(false)}
          />

          <div className="relative w-full max-w-lg bg-[#ffffff] rounded-t-3xl p-6 shadow-2xl max-h-[80vh] flex flex-col z-10 border-t border-[#e5ded0] animate-in slide-in-from-bottom duration-300">
            {/* Tirador superior / Barrita visual */}
            <div className="w-12 h-1.5 bg-[#e5ded0] rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e5ded0]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2d2926]">
                  Índice de la Guía
                </h3>
                <p className="text-xs text-[#5a524c]">
                  Toca un atractivo para ir hacia él
                </p>
              </div>
              <button
                onClick={() => setIsOpenMobile(false)}
                className="w-8 h-8 rounded-full bg-[#f7f4ed] text-[#2d2926] font-bold text-sm flex items-center justify-center hover:bg-[#e5ded0]"
              >
                ✕
              </button>
            </div>

            {/* Lista desplegable para móvil */}
            <nav className="overflow-y-auto space-y-1.5 pr-1 flex-1">
              {ATTRACTIONS_DATA.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-between ${
                      isActive
                        ? 'bg-[#2d2926] text-[#ffffff] font-semibold'
                        : 'text-[#5a524c] bg-[#f7f4ed] hover:bg-[#e5ded0]'
                    }`}
                  >
                    <span className="truncate">{item.title}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#c0a060] shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* ==========================================
          2. SIDEBAR ESCRITORIO CONVENCIONAL (>= lg)
         ========================================== */}
      <aside className="hidden lg:block w-72 bg-[#ffffff] border border-[#e5ded0] rounded-2xl p-5 shadow-sm sticky top-28 z-20 self-start">
        <div className="mb-4 pb-3 border-b border-[#e5ded0]">
          <h3 className="font-serif text-lg font-bold text-[#2d2926]">
            Guía de Chignahuapan
          </h3>
          <p className="text-xs text-[#5a524c]">
            Selecciona un atractivo para desplazarte
          </p>
        </div>

        <nav className="space-y-1 max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
          {ATTRACTIONS_DATA.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center justify-between group ${
                  isActive
                    ? 'bg-[#2d2926] text-[#ffffff] font-medium shadow-sm'
                    : 'text-[#5a524c] hover:bg-[#f7f4ed] hover:text-[#2d2926]'
                }`}
              >
                <span className="truncate">{item.title}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#c0a060] shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-6 pt-4 border-t border-[#e5ded0] bg-[#f7f4ed] p-3 rounded-xl text-center">
          <p className="text-xs text-[#5a524c]">¿Dudas sobre recorridos?</p>
          <span className="inline-block mt-1 text-xs font-semibold text-[#d95d39]">
            Recepción 24/7 disponible
          </span>
        </div>
      </aside>
    </>
  );
};