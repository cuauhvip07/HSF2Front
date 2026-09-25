'use client';

import React from 'react';
import { CALENDAR_EVENTS } from './guideData';

export const EventsCalendar: React.FC = () => {
  return (
    <section id="calendario-eventos" className="scroll-mt-28 mb-12">
      <div className="bg-[#2d2926] p-6 md:p-10 rounded-3xl border border-[#e5ded0]/15 shadow-2xl relative overflow-hidden">
        
        {/* Fondo decorativo sutil de hexágonos y luces */}
        <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons-cal" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
                <polygon points="25,0 50,14.4 50,29 25,43.4 0,29 0,14.4" fill="none" stroke="#e5ded0" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons-cal)" />
          </svg>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#c0a060]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Encabezado de la Sección */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#c0a060] uppercase tracking-widest bg-[#ffffff]/10 px-4 py-1.5 rounded-full border border-[#c0a060]/30 inline-block mb-3">
              Fechas Importantes &amp; Tradición
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#ffffff] mb-3">
              Calendario de Eventos en Chignahuapan
            </h2>
            <p className="text-[#e5ded0]/80 text-sm leading-relaxed">
              Chignahuapan es un Pueblo Mágico lleno de vida y festividades. Planea tu viaje para disfrutar de nuestras tradiciones más emblemáticas.
            </p>
          </div>

          {/* Grid de Eventos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CALENDAR_EVENTS.map((event) => (
              <article
                key={event.id}
                className="bg-[#ffffff]/5 rounded-2xl border border-[#e5ded0]/10 p-6 group hover:bg-[#ffffff]/10 hover:border-[#c0a060]/50 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 relative"
              >
                <div>
                  {/* Badge Estilizado de Fecha */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#e5ded0]/10">
                    <div className="flex items-center gap-2 bg-[#c0a060]/10 border border-[#c0a060]/30 px-3 py-1 rounded-lg">
                      <span className="w-2 h-2 rounded-full bg-[#d95d39] animate-pulse" />
                      <span className="text-xs font-bold tracking-wider uppercase text-[#c0a060]">
                        {event.date}
                      </span>
                    </div>
                    <span className="text-lg opacity-40 group-hover:opacity-100 transition-opacity">
                      🗓️
                    </span>
                  </div>

                  {/* Título y Descripción */}
                  <h3 className="font-serif text-lg font-bold text-[#ffffff] group-hover:text-[#c0a060] transition-colors leading-snug mb-2">
                    {event.title}
                  </h3>
                  <p className="text-xs text-[#e5ded0]/75 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Pie de tarjeta */}
                <div className="pt-4 mt-4 border-t border-[#e5ded0]/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-[#c0a060] font-semibold">
                    Tradición Local
                  </span>
                  <span className="text-xs text-[#e5ded0]/50 group-hover:text-[#ffffff] transition-colors">
                    Chignahuapan 📍
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};