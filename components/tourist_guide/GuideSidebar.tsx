'use client';

import React from 'react';
import { ATTRACTIONS_DATA } from './guideData';

interface GuideSidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export const GuideSidebar: React.FC<GuideSidebarProps> = ({ activeId, onSelect }) => {
  return (
    <aside className="w-full lg:w-72 bg-[#ffffff] border border-[#e5ded0] rounded-2xl p-5 shadow-sm sticky top-24 self-start">
      <div className="mb-4 pb-3 border-b border-[#e5ded0]">
        <h3 className="font-serif text-lg font-bold text-[#2d2926]">
          Guía de Chignahuapan
        </h3>
        <p className="text-xs text-[#5a524c]">
          Selecciona un atractivo para desplazarte
        </p>
      </div>

      <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
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
        <p className="text-xs text-[#5a524c]">¿Necesitas ayuda o recomendaciones?</p>
        <span className="inline-block mt-1 text-xs font-semibold text-[#d95d39]">
          Consulta en Recepción 24/7
        </span>
      </div>
    </aside>
  );
};