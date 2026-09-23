"use client"
import { useState } from "react";


export default function QuestionsSection() {


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

    return (
        <>

            {/* SECCIÓN 1: FAQ Y MAPA / EXPERIENCIAS */}
            <section className="max-w-6xl mx-auto px-4 py-12 border-t border-[#c0a060]/20" >
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
            </section >

        </>


    )
}
