'use client';

import React from 'react';
import Image from 'next/image';
import { CALENDAR_EVENTS } from './guideData';

export const EventsCalendar: React.FC = () => {
  return (
    <section id="calendario-eventos" className="scroll-mt-28 mb-12">
      <div className="bg-[#2d2926] p-8 rounded-2xl border border-[#e5ded0]/10 shadow-lg relative overflow-hidden">
        {/* Fondo decorativo sutil (Hexágonos) */}
        <div className="absolute inset-0 opacity-5 z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
                <polygon points="25,0 50,14.4 50,29 25,43.4 0,29 0,14.4" fill="none" stroke="#e5ded0" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#c0a060] uppercase tracking-widest bg-[#ffffff]/10 px-3 py-1 rounded-full">
              Fechas Importantes
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#ffffff] mt-4 mb-3">
              Calendario de Eventos en Chignahuapan
            </h2>
            <p className="text-[#e5ded0]/80 text-sm">
              Chignahuapan es un pueblo lleno de vida y tradiciones. Planea tu visita para coincidir con nuestras festividades más emblemáticas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CALENDAR_EVENTS.map((event) => (
              <div key={event.id} className="bg-[#ffffff]/5 rounded-xl border border-[#e5ded0]/10 p-5 flex flex-col items-center text-center group hover:bg-[#ffffff]/10 transition-all duration-300">
                
                {/* Icono de Calendario Estilizado */}
                <div className="w-16 h-16 rounded-xl bg-[#c0a060] flex flex-col items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform duration-300 relative">
                    <span className="text-xs font-black text-[#2d2926] uppercase tracking-tighter leading-none mt-1">
                        {event.date.split(' ')[1] || event.date}
                    </span>
                    <span className="text-2xl font-black text-[#2d2926] leading-none">
                        {event.date.split(' ')[0]}
                    </span>
                  {/* Clip decorativo */}
                  <div className="absolute -top-2 left-4 w-1 h-3 bg-[#ffffff] rounded-full"></div>
                  <div className="absolute -top-2 right-4 w-1 h-3 bg-[#ffffff] rounded-full"></div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="font-serif text-lg font-bold text-[#ffffff] mb-2 leading-tight">
                    {event.title}
                  </h4>
                  <p className="text-xs text-[#e5ded0]/80 leading-relaxed flex-1">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};