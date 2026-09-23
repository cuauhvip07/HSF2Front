"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function FeaturedSections() {

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿Cómo realizar una reserva?',
      answer: 'Puedes reservar directamente desde nuestro sitio web seleccionando tus fechas o llamándonos por teléfono.',
    },
    {
      question: '¿Qué amenidades incluye la estancia?',
      answer: 'Todas nuestras habitaciones incluyen Wi-Fi, desayuno continental, acceso a áreas comunes y estacionamiento.',
    },
    {
      question: '¿Qué actividades hay cerca del hotel?',
      answer: 'Estamos cerca del centro histórico de Chignahuapan, la fábrica de esferas y las aguas termales.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const rooms = [
    {
      id: 1,
      title: 'Suite Familiar con Balcón',
      description: 'Espaciosa suite para familias, con vistas panorámicas.',
      price: '$2,500 MXN',
      image: '/image-hero.png',
      link: '/habitaciones/suite-familiar',
    },
    {
      id: 2,
      title: 'Habitación Clásica Colonial',
      description: 'Encanto rústico con todas las comodidades.',
      price: '$1,800 MXN',
      image: '/image-hero.png',
      link: '/habitaciones/clasica-colonial',
    },
    {
      id: 3,
      title: 'Master Suite Santa Fe',
      description: 'Lujo y confort máximo con amenidades premium.',
      price: '$3,200 MXN',
      image: '/image-hero.png',
      link: '/habitaciones/master-suite',
    },
  ];

  return (

    <>
      <section className="bg-[#f7f4ed] py-16 px-4 md:px-12 text-[#2d2926]">
        <div className="max-w-6xl mx-auto space-y-20">

          {/* BLOQUE 1: HABITACIONES & SUITES DESTACADAS */}
          <div className="text-center space-y-10">
            <h2 className="font-serif text-3xl md:text-4xl text-[#c0a060] tracking-wide font-normal">
              Habitaciones &amp; Suites Destacadas
            </h2>

            {/* Grid de Habitaciones */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <div key={room.id} className="flex flex-col items-center text-center group">
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-sm mb-4">
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#2d2926] mb-2">
                    {room.title}
                  </h3>

                  <p className="text-xs text-[#2d2926]/70 leading-relaxed max-w-xs mb-1">
                    {room.description}
                  </p>

                  <p className="text-xs font-semibold text-[#2d2926] mb-4">
                    Desde <span className="font-bold">{room.price}</span> / noche.
                  </p>

                  <Link
                    href={room.link}
                    className="px-6 py-2 rounded-full border border-[#c0a060] text-[#c0a060] text-xs font-semibold uppercase tracking-wider hover:bg-[#c0a060] hover:text-white transition-colors"
                  >
                    VER DETALLES
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* BLOQUE 2: DESCUBRE CHIGNAHUAPAN */}
          <div className="text-center space-y-8 pt-6">
            {/* Mosaico de Imágenes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {/* Imagen 1: Aguas Termales */}
              <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src="/aguas_termales.png"
                  alt="Aguas Termales Chignahuapan"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Imagen 2: Kiosco */}
              <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src="/kiosco.png"
                  alt="Taller de Artesanías"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Columna Doble: Esferas Navideñas */}
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

              {/* Imagen 4: Basílica / Parroquia */}
              <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src="/basilica.png"
                  alt="Basílica de Chignahuapan"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Título y Botón */}
            <div className="space-y-6 pt-2">
              <h2 className="font-serif text-3xl md:text-5xl text-[#d95d39] tracking-wider uppercase font-light leading-tight">
                DESCUBRE CHIGNAHUAPAN, <br />
                PUEBLO MÁGICO.
              </h2>

              <Link
                href="/experiencias"
                className="inline-block bg-[#d95d39] hover:bg-[#c24e2b] text-white text-xs font-semibold px-8 py-3 rounded-full transition-colors uppercase tracking-wider shadow-md"
              >
                EXPLORAR EL PUEBLO
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* SECCIÓN 1: FAQ Y MAPA / EXPERIENCIAS */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-t border-[#c0a060]/20">
        <div className="gap-12 items-center">


          {/* Preguntas Frecuentes */}
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#c0a060] font-medium uppercase tracking-wider mb-6">
              PREGUNTAS FRECUENTES Y INFORMACIÓN DE INTERÉS
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#c0a060]/30 pb-3">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center text-left text-sm font-semibold text-[#2d2926] hover:text-[#d95d39] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`w-4 h-4 text-[#c0a060] transform transition-transform ${openFaq === index ? 'rotate-180' : ''
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <p className="mt-2 text-xs text-[#2d2926]/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </>

  );
}