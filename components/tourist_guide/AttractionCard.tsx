'use client';

import React from 'react';
import Image from 'next/image';
import { TouristAttraction } from './guideData';

interface AttractionCardProps {
    attraction: TouristAttraction;
}

export const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {

    // --- LÓGICA DE LAYOUT DINÁMICO (Estilo Libreto) ---
    const isFullImageBackground = attraction.id === 'bienvenida-y-clima';
    const isCollageLayout = attraction.category === 'Cultura & Historia' && attraction.id !== 'bienvenida-y-clima';
    const isNatureLayout = attraction.category === 'Naturaleza & Relax';
    const isDefaultLayout = !isFullImageBackground && !isCollageLayout && !isNatureLayout;

    // --- COMPONENTE DE TÍTULO Y DESCRIPCIÓN ---
    const TextContent = () => (
        <div className={`flex flex-col ${isFullImageBackground ? 'p-8 md:p-12 text-white' : 'p-6 md:p-8'}`}>
            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${isFullImageBackground ? 'text-[#c0a060]' : 'text-[#d95d39]'}`}>
                        {attraction.category}
                    </span>
                </div>

                <h2 className={`font-serif text-2xl md:text-3xl font-bold mb-1 ${isFullImageBackground ? 'text-white' : 'text-[#2d2926]'}`}>
                    {attraction.title}
                </h2>

                {attraction.subtitle && (
                    <p className="text-sm font-medium text-[#c0a060] italic mb-4">
                        {attraction.subtitle}
                    </p>
                )}

                <p className={`text-sm leading-relaxed ${isFullImageBackground ? 'text-[#e5ded0]' : 'text-[#5a524c]'}`}>
                    {attraction.description}
                </p>
            </div>

            {/* Tips */}
            {!isFullImageBackground && attraction.tips && attraction.tips.length > 0 && (
                <div className="mt-6 pt-4 border-t border-[#e5ded0] bg-[#f7f4ed] -mx-6 -mb-6 md:-mx-8 md:-mb-8 p-4 md:p-6 rounded-b-2xl">
                    <h4 className="text-xs font-bold uppercase text-[#2d2926] tracking-wide mb-2 flex items-center gap-2">
                        <span className="text-[#d95d39]">💡</span> Tips:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-xs text-[#5a524c]">
                        {attraction.tips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

    return (
        <article
            id={attraction.id}
            className="scroll-mt-28 bg-[#ffffff] border border-[#e5ded0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 mb-8 relative"
        >
            {/* ESTILO 1: Fondo Completo */}
            {isFullImageBackground && (
                <div className="relative min-h-[400px] flex items-center">
                    <Image
                        src={attraction.image}
                        alt={attraction.title}
                        fill
                        className="object-cover z-0"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-[#2d2926]/60 z-10" />
                    <div className="relative z-20 max-w-2xl">
                        <TextContent />
                    </div>
                    {attraction.badge && (
                        <span className="absolute top-4 right-4 z-30 bg-[#c0a060] text-[#ffffff] text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                            {attraction.badge}
                        </span>
                    )}
                </div>
            )}

            {/* ESTILO 2: Collage "Pueblo Mágico" */}
            {isCollageLayout && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
                    <div className="md:col-span-5 p-6 flex justify-center items-center relative">
                        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-[#e5ded0] shadow-xl z-10">
                            <Image
                                src={attraction.image}
                                alt={attraction.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 30vw"
                            />
                        </div>
                        <div className="absolute top-10 left-10 w-20 h-20 bg-[#d95d39]/10 rounded-full blur-2xl z-0" />
                    </div>
                    <div className="md:col-span-7">
                        <TextContent />
                    </div>
                </div>
            )}

            {/* ESTILO 3: Naturaleza */}
            {isNatureLayout && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                    <div className="md:col-span-7">
                        <TextContent />
                    </div>
                    <div className="md:col-span-5 grid grid-cols-2 gap-2 p-2 bg-[#2d2926]">
                        {/* Foto 1: Imagen Principal */}
                        <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-[#e5ded0]/20">
                            <Image
                                src={attraction.image}
                                alt={`${attraction.title} 1`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 20vw"
                            />
                        </div>
                        {/* Foto 2: Imagen Secundaria (independiente) */}
                        <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-[#e5ded0]/20 mt-4">
                            <Image
                                src={attraction.secondaryImage || attraction.image}
                                alt={`${attraction.title} 2`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 20vw"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ESTILO 4: Default/Experiencias */}
            {isDefaultLayout && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                    <div className="md:col-span-5 relative min-h-[260px] bg-[#2d2926]">
                        <Image
                            src={attraction.image}
                            alt={attraction.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                        />
                        {attraction.badge && (
                            <span className="absolute top-4 left-4 bg-[#c0a060] text-[#ffffff] text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                {attraction.badge}
                            </span>
                        )}
                    </div>
                    <div className="md:col-span-7">
                        <TextContent />
                    </div>
                </div>
            )}
        </article>
    );
};