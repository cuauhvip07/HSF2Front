'use client';

import React from 'react';
import Image from 'next/image';
import { RoomDetail } from './roomsData';

interface RoomCardProps {
  room: RoomDetail;
  onSelect: (room: RoomDetail) => void;
  isFirst?: boolean;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onSelect, isFirst = false }) => {
  return (
    <article className="bg-[#ffffff] border border-[#e5ded0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Foto de la Habitación con badge de capacidad */}
        <div className="relative aspect-[16/9] bg-[#2d2926]">
          <Image
            src={room.image}
            alt={room.title}
            fill
            priority={isFirst}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span className="absolute top-4 left-4 bg-[#c0a060] text-[#2d2926] text-xs font-bold px-3 py-1 rounded-md shadow-md">
            Hasta {room.capacity}
          </span>
        </div>

        {/* Detalles e información */}
        <div className="p-6">
          <h3 className="font-serif text-2xl font-bold text-[#2d2926] mb-1">
            {room.title}
          </h3>
          <p className="text-xs text-[#5a524c] font-medium mb-4">
            🛏️ {room.beds}
          </p>

          <p className="text-xs text-[#5a524c] leading-relaxed mb-4">
            {room.description}
          </p>

          {/* Badges de comodidades */}
          <div className="flex flex-wrap gap-2 mb-6">
            {room.features.map((feat, idx) => (
              <span
                key={idx}
                className="bg-[#f7f4ed] text-[#5a524c] text-[11px] px-2.5 py-1 rounded-md border border-[#e5ded0]"
              >
                {feat}
              </span>
            ))}
          </div>

          {/* Desglose de 3 Precios */}
          <div className="bg-[#f7f4ed] p-3.5 rounded-xl border border-[#e5ded0] grid grid-cols-3 gap-2 text-center text-xs mb-2">
            <div>
              <p className="text-[10px] text-[#5a524c] uppercase font-semibold">Entre Semana</p>
              <p className="font-bold text-[#d95d39] text-sm">{room.priceMin}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#5a524c] uppercase font-semibold">Fin de Semana</p>
              <p className="font-bold text-[#2d2926] text-sm">{room.priceRegular}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#5a524c] uppercase font-semibold">Temp. Alta</p>
              <p className="font-bold text-[#2d2926] text-sm">{room.priceHigh}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón que activa el modal reutilizable */}
      <div className="p-6 pt-0">
        <button
          type="button"
          onClick={() => onSelect(room)}
          className="block w-full text-center bg-[#2d2926] hover:bg-[#d95d39] text-[#ffffff] font-semibold py-3 rounded-xl transition-colors text-sm shadow-sm cursor-pointer"
        >
          Reservar / Contacto
        </button>
      </div>
    </article>
  );
};