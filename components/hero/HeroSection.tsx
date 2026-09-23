'use client';

import Image from 'next/image';
import Link from 'next/link';
import SearchBarDesktop from './SearchBarDesktop';
import MobileHeroActions from './MobileHeroActions';

export default function HeroSection() {
  return (
    <section className="relative top-0 w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Fondo de la Imagen sin paddings ni márgenes arriba */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image-hero.png"
          alt="Fondo Hotel Santa Fe Chignahuapan"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-[#2d2926]/40" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center text-[#f7f4ed] flex flex-col items-center gap-6 pt-16">
        <h1 className="text-4xl md:text-6xl font-serif tracking-wider uppercase font-light drop-shadow-md leading-tight">
          Tu refugio de calidez y confort
        </h1>
        <p className="text-lg md:text-xl font-light tracking-wide max-w-xl opacity-90 drop-shadow">
          Un espacio auténtico para reconectar
        </p>

        <div className="w-full mt-6">
          {/* <SearchBarDesktop /> */}

          {/* CTA para Desktop mientras el buscador esté desactivado */}
          <div className="hidden md:flex justify-center items-center">
            <Link
              href="/habitaciones"
              className="bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold px-8 py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl uppercase tracking-widest border border-white/20 hover:scale-105"
            >
              EXPLORAR HABITACIONES
            </Link>
          </div>

          {/* Acciones para vista celular */}
          <MobileHeroActions />
        </div>
      </div>
    </section>
  );
}