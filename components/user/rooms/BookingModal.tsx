'use client';

import React from 'react';
import { Room } from '@/types/room';

interface BookingModalProps {
  room: Room | null;
  onClose: () => void;
  phoneNumber?: string;
  whatsappNumber?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  room,
  onClose,
  phoneNumber = "+521234567890", // Número real del hotel
  whatsappNumber = "521234567890", // WhatsApp real sin '+'
}) => {
  if (!room) return null;

  const whatsappMessage = encodeURIComponent(
    `Hola, me interesa solicitar una reserva para la ${room.title}`
  );

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#f7f4ed] rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative border border-[#e5ded0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Cerrar modal"
          className="absolute top-3 right-4 text-[#988f86] hover:text-[#2d2926] text-xl font-bold cursor-pointer transition-colors"
        >
          ✕
        </button>

        <span className="text-[10px] font-bold text-[#c0a060] uppercase tracking-widest block">
          {room.capacity}
        </span>

        <h3 className="font-serif text-xl font-bold text-[#2d2926]">
          {room.title}
        </h3>

        <p className="text-xs text-[#5a524c] leading-relaxed">
          Para verificar disponibilidad y realizar tu reserva, ponte en contacto directo con recepción:
        </p>

        <div className="space-y-2.5 pt-2">
          {/* Opción WhatsApp */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 bg-[#25D366] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#1ebd59] transition-colors shadow-sm text-center"
          >
            Reservar por WhatsApp
          </a>

          {/* Opción Llamada Directa */}
          <a
            href={`tel:${phoneNumber}`}
            className="block w-full py-3 border border-[#2d2926] text-[#2d2926] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#2d2926] hover:text-white transition-colors text-center"
          >
            Llamar por Teléfono
          </a>
        </div>
      </div>
    </div>
  );
};