'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const PHONE_NUMBER = "+527971405931";
  const WHATSAPP_NUMBER = "527971405931";

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
      description: 'Comodidad para pequeñas familias o tríos de viaje.',
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

  const attractions = [
    {
      title: 'Aguas Termales',
      subtitle: 'Manantiales curativos',
      image: '/aguas_termales.png',
      alt: 'Aguas Termales de Chignahuapan Puebla cerca de Hotel Santa Fe',
    },
    {
      title: 'Kiosco Mudéjar',
      subtitle: 'Centro Histórico',
      image: '/kiosco.png',
      alt: 'Kiosco Mudéjar de madera en el centro de Chignahuapan Puebla',
    },
    {
      title: 'Feria de la Esfera',
      subtitle: 'Tradición y colorido',
      image: '/esferas2.png',
      alt: 'Esferas navideñas de vidrio soplado Chignahuapan Puebla',
    },
    {
      title: 'Basílica de la Inmaculada',
      subtitle: 'Joya arquitectónica',
      image: '/basilica.png',
      alt: 'Basílica de la Inmaculada Concepción en Chignahuapan Puebla',
    },
  ];

  return (
    <section className="bg-[#f7f4ed] py-16 px-4 md:px-12 text-[#2d2926]">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* BLOQUE 1: HABITACIONES DESTACADAS */}
        <div className="text-center space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-widest text-[#c0a060] uppercase font-sans">
              NUESTRAS OPCIONES DE HOSPEDAJE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2d2926] font-normal">
              Habitaciones en Chignahuapan
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
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
                    <Image
                      src={room.image}
                      alt={`${room.title} en Hotel Santa Fe Chignahuapan Puebla`}
                      fill
                      quality={75}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 right-3 bg-[#2d2926]/80 backdrop-blur-xs text-[#f7f4ed] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {room.capacity}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#2d2926] mb-1">
                    {room.title}
                  </h3>

                  <p className="text-xs text-[#5a524c] leading-relaxed mb-4 min-h-[36px]">
                    {room.description}
                  </p>

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

                {/* Botón táctil optimizado para móviles (min-h-[48px]) */}
                <button
                  type="button"
                  onClick={() => setSelectedRoom(room)}
                  className="w-full min-h-[48px] px-4 py-3 rounded-full border border-[#c0a060] text-[#c0a060] text-xs font-bold uppercase tracking-wider hover:bg-[#c0a060] hover:text-white transition-all text-center cursor-pointer active:scale-98 flex items-center justify-center"
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-[#e5ded0] shadow-sm space-y-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-widest text-[#c0a060] uppercase font-sans">
              PUEBLO MÁGICO DE PUEBLA
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2d2926] font-light uppercase tracking-wide leading-tight">
              Descubre Chignahuapan
            </h2>
            <p className="text-xs md:text-sm text-[#5a524c] leading-relaxed">
              Sumérgete en la calidez de sus aguas termales, la magia de sus talleres de esferas y la rica tradición de la Sierra Norte de Puebla.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {attractions.map((item, index) => (
              <div
                key={index}
                className="group relative h-72 md:h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e5ded0]"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  quality={75}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity group-hover:from-black/90" />

                <div className="absolute bottom-0 inset-x-0 p-5 text-white flex flex-col justify-end h-full">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#c0a060] mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold leading-tight drop-shadow-sm">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Botón de exploración con alto táctil accesible de 48px */}
          <div className="text-center pt-2">
            <Link
              href="/guia-turistica"
              className="inline-flex items-center justify-center gap-2 bg-[#d95d39] hover:bg-[#c24e2b] text-white text-xs font-semibold min-h-[48px] px-8 py-3.5 rounded-full transition-all uppercase tracking-wider shadow-md hover:shadow-lg active:scale-98 w-full sm:w-auto"
            >
              <span>Explorar la Guía Turística</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
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
            {/* Botón de cierre con área táctil cómoda (44x44px) */}
            <button
              type="button"
              onClick={() => setSelectedRoom(null)}
              aria-label="Cerrar ventana de contacto"
              className="absolute top-3 right-4 text-[#988f86] hover:text-[#2d2926] text-xl font-bold cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
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

            {/* Botones de acción directa para el pulgar en móviles */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, me interesa solicitar una reserva para la ${selectedRoom.title} en Hotel Santa Fe Chignahuapan`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center min-h-[48px] w-full py-3.5 px-4 bg-[#25D366] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#1ebd59] transition-colors shadow-sm active:scale-98"
              >
                Reservar por WhatsApp
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center justify-center min-h-[48px] w-full py-3.5 px-4 border border-[#2d2926] text-[#2d2926] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#2d2926] hover:text-white transition-colors active:scale-98"
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