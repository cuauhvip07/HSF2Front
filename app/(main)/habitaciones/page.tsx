'use client';

import React, { useState } from 'react';
import { Room } from '@/types/room';
import { ROOMS_DATA, RoomDetail } from '@/components/user/rooms/roomsData';
import { RoomCard } from '@/components/user/rooms/RoomCard';
import { BookingModal } from '@/components/user/rooms/BookingModal';

export default function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <main className="min-h-screen bg-[#f7f4ed] pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#c0a060] uppercase tracking-widest bg-[#2d2926] px-3.5 py-1.5 rounded-full">
            Hospedaje y Tarifas
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2d2926] mt-4 mb-3">
            Nuestras Habitaciones
          </h1>
          <p className="text-[#5a524c] text-base leading-relaxed">
            Encuentra la opción ideal para tu viaje en pareja, en familia o en grupo. Todas nuestras opciones cuentan con baño privado, agua caliente 24/7 y Wi-Fi.
          </p>
        </div>

        {/* Grid de 2x2 con el diseño amplio original */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ROOMS_DATA.map((room, index) => (
            <RoomCard
              key={room.id}
              room={room}
              onSelect={(r: RoomDetail) => setSelectedRoom(r)}
              isFirst={index === 0}
            />
          ))}
        </div>

        {/* Aclaraciones y Políticas Legales */}
        <div className="text-center text-xs text-[#988f86] max-w-2xl mx-auto space-y-1 pt-4 border-t border-[#e5ded0]">
          <p>* Check-in: 15:00 hrs | Check-out: 12:00 hrs.</p>
          <p>* Estacionamiento privado gratis sujeto a disponibilidad.</p>
          <p>* Las tarifas promocionales entre semana no aplican en días festivos ni puentes oficiales.</p>
        </div>
      </div>

      {/* Modal Reutilizable de Reserva por WhatsApp o Teléfono */}
      <BookingModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
      />
    </main>
  );
}