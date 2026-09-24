'use client';

import React from 'react';
import Image from 'next/image';
import { HOTEL_STATS } from './aboutData';

export const AboutStory: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-[#f7f4ed]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Columna Izquierda: Collage de Fotografías */}
        <div className="lg:col-span-6 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Imagen Principal */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-4 border-[#ffffff] shadow-lg bg-[#2d2926]">
              <Image
                src="/inside.png" 
                alt="Hotel Santa Fe Chignahuapan"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            
            <div className="absolute -bottom-8 -right-4 md:-right-6 w-3/5 aspect-[4/3] rounded-2xl overflow-hidden border-4 border-[#ffffff] shadow-2xl bg-[#2d2926] hidden sm:block">
              <Image
                src="/habitaciones/habitacion2.jpeg" 
                alt="Detalle de instalaciones"
                fill
                className="object-cover"
                sizes="30vw"
              />
            </div>

            {/* Elemento decorativo en esquina */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c0a060]/20 rounded-full blur-xl -z-10" />
          </div>
        </div>

        {/* Columna Derecha: Contenido y Filosofía */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-bold text-[#d95d39] uppercase tracking-wider">
            Sobre Hotel Santa Fe
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2d2926] leading-tight">
            Hospitalidad con Alma Magica
          </h2>

          <div className="space-y-4 text-[#5a524c] text-sm md:text-base leading-relaxed">
            <p>
              Ubicados en la céntrica <strong>Calle Lerdo #47</strong>, en Hotel Santa Fe nos dedicamos a ofrecer una estancia placentera, tranquila y segura a familias, parejas y viajeros que buscan descubrir los encantos de Chignahuapan.
            </p>
            <p>
              Nos enorgullece combinar el ambiente tradicional de la Sierra Norte de Puebla con instalaciones funcionales y una atención cercana. Queremos que tu única preocupación sea disfrutar del clima, los talleres de esferas y la calidez de nuestras tradiciones.
            </p>
          </div>

          {/* Métricas Destacadas en AboutStory.tsx */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#e5ded0]">
            {HOTEL_STATS.map((stat, idx) => (
              <div key={idx} className="bg-[#ffffff] p-4 rounded-xl border border-[#e5ded0] text-center shadow-sm flex flex-col justify-center">
                <p className="font-serif text-xl md:text-2xl font-bold text-[#c0a060]">
                  {stat.value}
                </p>
                <p className="text-[11px] md:text-xs text-[#5a524c] font-medium mt-1">
                  {stat.label}
                </p>
                {stat.subtext && (
                  <p className="text-[9px] text-[#988f86] italic mt-0.5">
                    {stat.subtext}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};