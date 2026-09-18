'use client';

import Image from 'next/image';
import SearchBarDesktop from './SearchBarDesktop';
import MobileHeroActions from './MobileHeroActions';

export default function HeroSection() {
    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">

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

            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center text-[#f7f4ed] flex flex-col items-center gap-6">
                <h1 className="text-4xl md:text-6xl font-serif tracking-wider uppercase font-light drop-shadow-md">
                    Tu refugio de calidez y confort
                </h1>
                <p className="text-lg md:text-xl font-light tracking-wide max-w-xl opacity-90 drop-shadow">
                    Un espacio auténtico para reconectar
                </p>

                <div className="w-full mt-6">
                    <SearchBarDesktop />
                    <MobileHeroActions />
                </div>
            </div>
        </section>
    );
}