'use client';

import React from 'react';

export const LocationCTA: React.FC = () => {
  const googleMapsUrl = "https://maps.google.com/?q=19.8401276,-98.025914";

  return (
    <section className="py-16 px-4 md:px-8 bg-[#f7f4ed]">
      <div className="max-w-5xl mx-auto bg-[#2d2926] text-[#ffffff] rounded-3xl p-8 md:p-12 shadow-xl border border-[#e5ded0]/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-bold text-[#c0a060] uppercase tracking-wider">
              Ubicación Real en Google Maps
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#ffffff]">
              Calle Lerdo #47, Col. Centro
            </h3>
            <p className="text-xs md:text-sm text-[#e5ded0]/80">
              C.P. 73300, Chignahuapan, Puebla, México.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#d95d39] hover:bg-[#c44f2e] text-[#ffffff] text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-md"
            >
              <span>📍 Ver en Google Maps</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};