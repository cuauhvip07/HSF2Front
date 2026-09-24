'use client';

import React from 'react';

export const AboutHero: React.FC = () => {
  return (
    <section className="relative bg-[#2d2926] text-[#ffffff] pt-32 pb-20 px-4 md:px-8 text-center overflow-hidden">
      {/* Fondo Decorativo sutil */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c0a060_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <span className="text-xs font-bold text-[#c0a060] uppercase tracking-widest bg-[#ffffff]/10 px-3.5 py-1.5 rounded-full border border-[#c0a060]/30 inline-block mb-4">
          Tradición &amp; Calidez en Chignahuapan
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#ffffff] mb-4 leading-tight">
          Tu Hogar Lejos de Casa
        </h1>
        <p className="text-[#e5ded0] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Un refugio acogedor diseñado para brindarte descanso, historia y atención personalizada a solo unos pasos del centro de nuestro Pueblo Mágico.
        </p>
      </div>
    </section>
  );
};