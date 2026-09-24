'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export interface ExtendedRoom {
  id: string;
  title: string;
  type: string;
  pricePerNight: number;
  imageUrl: string;
  description: string;
  fullDescription: string;
  capacity: number;
  beds: string;
  size: string;
  amenities: string[];
}

interface RoomDetailModalProps {
  room: ExtendedRoom | null;
  onClose: () => void;
}

export default function RoomDetailModal({ room, onClose }: RoomDetailModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Efecto para activar la animación suave al montar el componente
  useEffect(() => {
    if (room) {
      // Pequeño retardo para asegurar la transición de entrada
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
    }
  }, [room]);

  if (!room) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200); // Coincide con la duración de la animación de salida
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Contenedor del Modal con animación de escala y opacidad */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#f8f5f0] w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col md:flex-row border border-[#e5ded0] transform transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Botón de Cierre */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        {/* Imagen Lateral o Superior */}
        <div className="relative h-64 md:h-auto md:w-1/2 min-h-[250px]">
          <Image
            src={room.imageUrl}
            alt={room.title}
            fill
            className="object-cover"
          />
          <span className="absolute bottom-4 left-4 bg-[#c0a060] text-white text-[10px] tracking-widest font-bold px-3 py-1 rounded-full uppercase shadow">
            {room.type}
          </span>
        </div>

        {/* Detalles e Información */}
        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between overflow-y-auto">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#5a4d41] mb-2">
              {room.title}
            </h3>

            <p className="text-[#8c7e72] text-xs leading-relaxed mb-4 font-light">
              {room.fullDescription}
            </p>

            {/* Especificaciones rápidas */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#e5ded0] my-4 text-center">
              <div>
                <span className="block text-[10px] text-[#8c7e72] uppercase tracking-wider">Capacidad</span>
                <span className="text-xs font-semibold text-[#5a4d41]">{room.capacity} Personas</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#8c7e72] uppercase tracking-wider">Camas</span>
                <span className="text-xs font-semibold text-[#5a4d41]">{room.beds}</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#8c7e72] uppercase tracking-wider">Espacio</span>
                <span className="text-xs font-semibold text-[#5a4d41]">{room.size}</span>
              </div>
            </div>

            {/* Amenidades */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-[#5a4d41] uppercase tracking-wider mb-2">
                Amenidades incluidas
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {room.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="bg-[#efe8dc] text-[#5a4d41] text-[11px] px-2.5 py-1 rounded-md border border-[#e5ded0]"
                  >
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Precio y Botón de Acción */}
          <div className="pt-4 border-t border-[#e5ded0] flex items-center justify-between">
            <div>
              <span className="block text-[10px] text-[#8c7e72] uppercase">Precio por noche</span>
              <span className="text-xl font-bold text-[#c0a060]">
                ${room.pricePerNight.toLocaleString('es-MX')} MXN
              </span>
            </div>

            <button className="bg-[#c0a060] hover:bg-[#a88a4d] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors shadow">
              Reservar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}