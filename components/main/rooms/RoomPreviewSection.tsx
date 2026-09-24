'use client';

import { useState } from 'react';
import RoomCard from './RoomCard';
import RoomDetailModal, { ExtendedRoom } from './RoomDetailModal';

const mockRooms: ExtendedRoom[] = [
  {
    id: '1',
    title: 'Suite Familiar con Balcón',
    type: 'Familiar',
    description: 'Espaciosa suite para familias, con vistas panorámicas.',
    fullDescription: 'Diseñada especialmente para grupos familiares que buscan amplitud y confort. Cuenta con balcón privado con vistas al paisaje colonial, amplia sala de estar y acabados rústicos en madera.',
    pricePerNight: 2500,
    capacity: 4,
    beds: '2 Camas Matrimoniales',
    size: '45 m²',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    amenities: ['Wi-Fi Alta Velocidad', 'Balcón Privado', 'TV 55" Smart', 'Calefacción', 'Cafetera Premium', 'Agua Caliente 24/7'],
  },
  {
    id: '2',
    title: 'Habitación Clásica Colonial',
    type: 'Estándar',
    description: 'Encanto rústico con todas las comodidades.',
    fullDescription: 'Disfruta del auténtico encanto colonial con paredes de textura cálida, iluminación suave y todas las comodidades modernas para una estancia tranquila e inolvidable.',
    pricePerNight: 1800,
    capacity: 2,
    beds: '1 Cama King Size',
    size: '30 m²',
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    amenities: ['Wi-Fi Alta Velocidad', 'Caja de Seguridad', 'Escritorio de Trabajo', 'Amenidades Orgánicas', 'Secador de Pelo'],
  },
  {
    id: '3',
    title: 'Master Suite Santa Fe',
    type: 'Lujo',
    description: 'Lujo y confort máximo con amenidades premium.',
    fullDescription: 'Nuestra suite insignia ofrece la experiencia definitiva de lujo colonial. Incluye tina de hidromasaje privada, servicio a la habitación preferencial y vistas exclusivas a la propiedad.',
    pricePerNight: 3200,
    capacity: 2,
    beds: '1 Cama Super King',
    size: '60 m²',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    amenities: ['Jacuzzi Hidromasaje', 'Vista Panorámica', 'Minibar Incluido', 'Bata y Pantuflas', 'Servicio a Cuarto VIP', 'Café Gourmet'],
  },
];

export default function RoomPreviewSection() {
  const [selectedRoom, setSelectedRoom] = useState<ExtendedRoom | null>(null);

  return (
    <section className="py-12 bg-[#f8f5f0] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#c0a060] tracking-wide font-normal">
            Habitaciones <span className="font-serif italic text-[#c0a060]">&amp;</span> Suites Destacadas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mockRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onOpenDetails={(roomToView) => setSelectedRoom(roomToView)}
            />
          ))}
        </div>
      </div>

      {/* Renderizado condicional del Modal de Detalles */}
      <RoomDetailModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
      />
    </section>
  );
}