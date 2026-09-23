'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 1. Definimos la interfaz del objeto Room
interface Room {
  id: number;
  title: string;
  capacity: string;
  description: string;
  priceMin: string;
  priceRegular: string;
  priceHigh: string;
  image: string;
}

export default function FeaturedSections() {
  // 2. Le indicamos a useState que puede ser un objeto Room o null
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Configura aquí tus datos de contacto
  const PHONE_NUMBER = "+521234567890"; // Reemplaza por tu número
  const WHATSAPP_NUMBER = "521234567890"; // Reemplaza por tu número sin '+'

  const rooms: Room[] = [
    {
      id: 1,
      title: 'Habitación Doble',
      capacity: '2 Personas',
      description: 'Ideal para parejas o viajes individuales de descanso.',
      priceMin: '$390 MXN',
      priceRegular: '$450 MXN',
      priceHigh: '$450 MXN',
      image: '/habitaciones/habitacion2.jpeg',
    },
    {
      id: 2,
      title: 'Habitación Doble Sencilla',
      capacity: '3 Personas',
      description: 'Comodidad para pequeñas familias o trios de viaje.',
      priceMin: '$550 MXN',
      priceRegular: '$650 MXN',
      priceHigh: '$590 MXN',
      image: '/habitaciones/habitacion1.jpeg',
    },
    {
      id: 3,
      title: 'Habitación Cuádruple',
      capacity: '4 Personas',
      description: 'Amplio espacio pensado para el confort de familias.',
      priceMin: '$590 MXN',
      priceRegular: '$750 MXN',
      priceHigh: '$690 MXN',
      image: '/habitaciones/habitacion3.jpeg',
    },
    {
      id: 4,
      title: 'Habitación Triple Familiar',
      capacity: '6 Personas',
      description: 'Máxima capacidad para grupos grandes con la mejor comodidad.',
      priceMin: '$890 MXN',
      priceRegular: '$1,050 MXN',
      priceHigh: '$990 MXN',
      image: '/habitaciones/habitacion1.jpeg',
    },
  ];

  return (
    <section className="bg-[#f7f4ed] py-16 px-4 md:px-12 text-[#2d2926]">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* BLOQUE 1: HABITACIONES DESTACADAS */}
        <div className="text-center space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-widest text-[#c0a060] uppercase font-sans">
              NUESTRAS OPCIONES DE HOSPEDAJE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2d2926] font-normal">
              Habitaciones
            </h2>
          </div>

          {/* Grid de 4 Habitaciones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white p-5 rounded-2xl border border-[#e5ded0] shadow-sm flex flex-col justify-between items-center text-center group hover:shadow-md transition-shadow"
              >
                <div className="w-full">
                  {/* Imagen */}
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 right-3 bg-[#2d2926]/80 backdrop-blur-xs text-[#f7f4ed] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {room.capacity}
                    </span>
                  </div>

                  {/* Título y Descripción */}
                  <h3 className="font-serif text-lg font-bold text-[#2d2926] mb-1">
                    {room.title}
                  </h3>

                  <p className="text-xs text-[#5a524c] leading-relaxed mb-4 min-h-[36px]">
                    {room.description}
                  </p>

                  {/* PRECIOS Y TARIFAS */}
                  <div className="bg-[#f7f4ed]/60 p-3 rounded-xl border border-[#e5ded0] mb-5 space-y-1.5">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#988f86] block">
                        Desde
                      </span>
                      <span className="text-2xl font-serif font-bold text-[#d95d39]">
                        {room.priceMin}
                      </span>
                      <span className="text-[10px] text-[#5a524c]"> / noche</span>
                    </div>

                    <div className="pt-1.5 border-t border-[#e5ded0] flex justify-between items-center text-[11px] text-[#5a524c]">
                      <div>
                        <span className="block text-[9px] text-[#988f86]">Fin de semana:</span>
                        <strong className="text-[#2d2926]">{room.priceRegular}</strong>
                      </div>
                      <div className="text-right">
                        <span className="block text-[9px] text-[#988f86]">Temp. Alta/Puentes:</span>
                        <strong className="text-[#c0a060]">{room.priceHigh}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón que activa el Modal */}
                <button
                  type="button"
                  onClick={() => setSelectedRoom(room)}
                  className="w-full py-2.5 rounded-full border border-[#c0a060] text-[#c0a060] text-xs font-bold uppercase tracking-wider hover:bg-[#c0a060] hover:text-white transition-colors text-center cursor-pointer"
                >
                  Reservar / Contacto
                </button>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[#988f86] italic text-center">
            * Las tarifas promocionales entre semana no aplican en días festivos ni puentes oficiales.
          </p>
        </div>

        {/* BLOQUE 2: DESCUBRE CHIGNAHUAPAN */}
        <div className="text-center space-y-8 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="/aguas_termales.png"
                alt="Aguas Termales Chignahuapan"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="/kiosco.png"
                alt="Taller de Artesanías"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-4 h-48 md:h-56">
              <div className="relative flex-1 rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src="/esferas2.png"
                  alt="Esferas artesanales"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative flex-1 rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src="/esfera.png"
                  alt="Detalle de esferas"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="/basilica.png"
                alt="Basílica de Chignahuapan"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <h2 className="font-serif text-3xl md:text-5xl text-[#d95d39] tracking-wider uppercase font-light leading-tight">
              DESCUBRE CHIGNAHUAPAN, <br />
              PUEBLO MÁGICO.
            </h2>

            <Link
              href="/guia-turistica"
              className="inline-block bg-[#d95d39] hover:bg-[#c24e2b] text-white text-xs font-semibold px-8 py-3 rounded-full transition-colors uppercase tracking-wider shadow-md"
            >
              EXPLORAR EL PUEBLO
            </Link>
          </div>
        </div>

      </div>

      {/* MODAL EMERGENTE DE CONTACTO */}
      {selectedRoom && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={() => setSelectedRoom(null)}
        >
          <div 
            className="bg-[#f7f4ed] rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative border border-[#e5ded0]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-3 right-4 text-[#988f86] hover:text-[#2d2926] text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[10px] font-bold text-[#c0a060] uppercase tracking-widest block">
              {selectedRoom.capacity}
            </span>

            <h3 className="font-serif text-xl font-bold text-[#2d2926]">
              {selectedRoom.title}
            </h3>
            
            <p className="text-xs text-[#5a524c] leading-relaxed">
              Para verificar disponibilidad y realizar tu reserva, ponte en contacto directo con recepción:
            </p>

            <div className="space-y-2.5 pt-2">
              {/* Opción WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, me interesa solicitar una reserva para la ${selectedRoom.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-[#25D366] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#1ebd59] transition-colors shadow-sm"
              >
                Reservar por WhatsApp
              </a>

              {/* Opción Llamada Directa */}
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="block w-full py-3 border border-[#2d2926] text-[#2d2926] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#2d2926] hover:text-white transition-colors"
              >
                Llamar por Teléfono
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}