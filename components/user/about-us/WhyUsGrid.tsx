'use client';

import React from 'react';
import { ABOUT_FEATURES } from './aboutData';

export const WhyUsGrid: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-[#ffffff] border-y border-[#e5ded0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#c0a060] uppercase tracking-widest">
            Tu Mejor Opción
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2d2926] mt-2">
            ¿Por qué hospedarte con nosotros?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ABOUT_FEATURES.map((item, index) => (
            <div
              key={index}
              className="bg-[#f7f4ed] p-6 rounded-2xl border border-[#e5ded0] hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffffff] border border-[#e5ded0] flex items-center justify-center text-2xl mb-4 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2d2926] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[#5a524c] leading-relaxed">
                  {item.description}
                </p>
                
                {/* Nota en letras pequeñas */}
                {item.note && (
                  <p className="text-[10px] md:text-xs text-[#988f86] italic mt-2">
                    {item.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};