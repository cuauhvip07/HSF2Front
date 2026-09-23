'use client';

import Image from 'next/image';

export interface SelectedRoom {
    id: string;
    name: string;
    capacity: string;
    nightlyRate: number;
    image: string;
    quantity: number;
}

interface ReservationSummaryProps {
    checkIn: string;
    checkOut: string;
    nights: number;
    rooms: SelectedRoom[];
    subtotal: number;
    iva: number;
    ish: number;
    total: number;
}

export default function ReservationSummary({
    checkIn,
    checkOut,
    nights,
    rooms,
    subtotal,
    iva,
    ish,
    total,
}: ReservationSummaryProps) {
    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

    return (
        <div className="bg-white rounded-xl border border-[#e5ded0] p-6 shadow-sm sticky top-24 flex flex-col gap-5">
            <div className="flex justify-between items-center border-b border-[#e5ded0] pb-3">
                <h3 className="text-xl font-serif font-bold text-[#2d2926]">
                    Tu Reserva
                </h3>
                <span className="text-xs font-semibold bg-[#f7f4ed] text-[#c0a060] px-2.5 py-1 rounded-md border border-[#e5ded0]">
                    {nights} {nights === 1 ? 'Noche' : 'Noches'}
                </span>
            </div>

            {/* Lista de habitaciones seleccionadas */}
            <div className="flex flex-col gap-3">
                {rooms.map((room) => (
                    <div key={room.id} className="flex gap-3 items-center">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-[#e5ded0]">
                            <Image
                                src="/image-hero.png"
                                alt="Fotografía principal del Hotel Santa Fe"
                                fill
                                className="object-cover"
                                priority // Recomendado si es la imagen principal del Hero
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-[#2d2926] leading-tight">{room.quantity}x {room.name}</h4>
                            <p className="text-xs text-[#5a524c] mt-0.5">{room.capacity}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-sm font-bold text-[#2d2926]">
                                {formatCurrency(room.nightlyRate * room.quantity)}
                            </span>
                            <span className="block text-[10px] text-[#988f86]">/ noche</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Fechas de entrada y salida */}
            <div className="bg-[#f7f4ed]/60 p-3 rounded-lg border border-[#e5ded0] text-xs text-[#5a524c] flex justify-between items-center">
                <div>
                    <span className="block font-bold text-[#2d2926]">Entrada:</span>
                    <span>{checkIn}</span>
                </div>
                <div className="text-right">
                    <span className="block font-bold text-[#2d2926]">Salida:</span>
                    <span>{checkOut}</span>
                </div>
            </div>

            {/* Desglose Financiero */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#e5ded0] text-xs text-[#5a524c]">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-[#2d2926]">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span>IVA (16%):</span>
                    <span className="font-semibold text-[#2d2926]">{formatCurrency(iva)}</span>
                </div>
                <div className="flex justify-between">
                    <span>ISH (Tax: 3%):</span>
                    <span className="font-semibold text-[#2d2926]">{formatCurrency(ish)}</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-[#e5ded0] mt-1">
                    <span className="text-sm font-bold text-[#2d2926]">Total a Pagar:</span>
                    <span className="text-xl font-bold font-serif text-[#d95d39]">{formatCurrency(total)}</span>
                </div>
            </div>
        </div>
    );
}