import React from 'react';
import { RoomCard } from '@/components/user/rooms/RoomCard';
import { ROOMS_DATA } from '@/components/user/rooms/roomsData';

export const metadata = {
  title: 'Habitaciones y Tarifas | Hotel Santa Fe Chignahuapan',
  description: 'Conoce nuestras tarifas desde $390 MXN para 2, 3, 4 y hasta 6 personas en el centro de Chignahuapan, Puebla.',
};

export default function RoomsPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ed] pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#c0a060] uppercase tracking-widest bg-[#2d2926] px-3.5 py-1.5 rounded-full">
            Hospedaje y Tarifas
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2d2926] mt-4 mb-3">
            Nuestras Habitaciones
          </h1>
          <p className="text-[#5a524c] text-base leading-relaxed">
            Elige la habitación que mejor se adapte a tus necesidades. Todas cuentan con baño privado, agua caliente las 24 horas y Wi-Fi en áreas comunes.
          </p>
        </div>

        {/* Grid de 4 Habitaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {ROOMS_DATA.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {/* Aclaración de políticas */}
        <div className="text-center text-xs text-[#988f86] max-w-2xl mx-auto space-y-1">
          <p>* Check-in: 15:00 hrs | Check-out: 12:00 hrs.</p>
          <p>* Estacionamiento privado gratis sujeto a disponibilidad.</p>
          <p>* Tarifas sujetas a IVA (16%) e ISH (3%) aplicables durante el proceso de reserva.</p>
        </div>
      </div>
    </main>
  );
}