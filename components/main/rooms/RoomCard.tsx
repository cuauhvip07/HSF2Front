'use client';

import Image from 'next/image';
import { ExtendedRoom } from './RoomDetailModal';

interface RoomCardProps {
  room: ExtendedRoom;
  onOpenDetails: (room: ExtendedRoom) => void;
}

export default function RoomCard({ room, onOpenDetails }: RoomCardProps) {
  return (
    <div className="flex flex-col items-center text-center group">
      {/* Contenedor de Imagen */}
      <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 shadow-sm">
        <Image
          src={room.imageUrl}
          alt={room.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Título */}
      <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#5a4d41] mb-2">
        {room.title}
      </h3>

      {/* Descripción corta */}
      <p className="text-[#8c7e72] text-xs md:text-sm mb-2 max-w-xs font-light line-clamp-2">
        {room.description}
      </p>

      {/* Precio */}
      <p className="text-xs md:text-sm text-[#5a4d41] font-medium mb-5">
        Desde <span className="font-bold">${room.pricePerNight.toLocaleString('es-MX')} MXN</span> / noche.
      </p>

      {/* Botón Ver Detalles que activa el Modal */}
      <button
        onClick={() => onOpenDetails(room)}
        className="border border-[#c0a060] text-[#c0a060] hover:bg-[#c0a060] hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-widest px-8 py-2.5 rounded-full"
      >
        VER DETALLES
      </button>
    </div>
  );
}