'use client';

import React, { useState, useEffect } from 'react';
import { GuideSidebar } from '@/components/tourist_guide/GuideSidebar';
import { AttractionCard } from '@/components/tourist_guide/AttractionCard';
import { EventsCalendar } from '@/components/tourist_guide/EventsCalendar';
import { ATTRACTIONS_DATA } from '@/components/tourist_guide/guideData';

export default function TouristGuidePage() {
  const [activeId, setActiveId] = useState<string>(
    ATTRACTIONS_DATA.length > 0 ? ATTRACTIONS_DATA[0].id : ''
  );

  const handleSelectAttraction = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    ATTRACTIONS_DATA.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    const calendarEl = document.getElementById('calendario-eventos');
    if (calendarEl) observer.observe(calendarEl);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-[#f7f4ed] min-h-screen pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Banner de Encabezado */}
        <header className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#c0a060] uppercase tracking-widest bg-[#2d2926] px-3 py-1 rounded-full">
            Cultura y Tradición
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2d2926] mt-4 mb-3">
            Guía Turística Chignahuapan & Alrededores
          </h1>
          <p className="text-[#5a524c] text-base leading-relaxed">
            Explora las maravillas de nuestro Pueblo Mágico y sitios vecinos desde nuestro libreto digital interactivo.
          </p>
        </header>

        {/* Layout Principal */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <GuideSidebar activeId={activeId} onSelect={handleSelectAttraction} />

          <div className="flex-1 w-full space-y-2">
            {/* Tarjetas de atractivos en formato Libreto Dinámico */}
            {ATTRACTIONS_DATA.map((attraction, index) => (
              <AttractionCard 
                key={attraction.id} 
                attraction={attraction} 
                isFirstCard={index === 0}
              />
            ))}

            {/* Calendario de Eventos */}
            <EventsCalendar />

            {/* Banner Cierre / Asistencia de Recepción */}
            <section className="bg-[#2d2926] text-[#f7f4ed] rounded-2xl p-8 md:p-12 text-center border border-[#e5ded0]/10 shadow-md">
              <h3 className="font-serif text-3xl font-bold text-[#c0a060] mb-3">
                ¡Gracias por tu visita!
              </h3>
              <p className="text-[#e5ded0]/80 max-w-xl mx-auto text-sm leading-relaxed mb-6">
                Cualquier duda sobre algún atractivo, lugar para comer o transporte, acude a la recepción del Hotel Santa Fe. ¡Estamos para servirte 24/7!
              </p>
              <a
                href="https://wa.me/527971405931?text=Hola,%20me%20gustar%C3%ADa%20consultar%20informaci%C3%B3n%20sobre%20los%20atractivos%20tur%C3%ADsticos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#d95d39] hover:bg-[#c44f2e] text-[#ffffff] font-semibold px-6 py-3 rounded-xl transition-colors duration-200 text-sm shadow-md"
              >
                Consultar en Recepción
              </a>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}