import { Room } from '@/types/room';

export interface RoomDetail extends Room {
  beds: string;
  features: string[];
}

export const ROOMS_DATA: RoomDetail[] = [
  {
    id: 1,
    title: 'Habitación Doble',
    capacity: '2 Personas',
    description: 'Ideal para parejas o viajes individuales de descanso.',
    priceMin: '$390 MXN',
    priceRegular: '$450 MXN',
    priceHigh: '$450 MXN',
    image: '/habitaciones/habitacion2.webp',
    beds: '1 Cama Matrimonial',
    features: ['Baño privado', 'Agua caliente 24/7', 'Wi-Fi gratis', 'TV por cable']
  },
  {
    id: 2,
    title: 'Habitación Doble Sencilla',
    capacity: '3 Personas',
    description: 'Comodidad para pequeñas familias o tríos de viaje.',
    priceMin: '$550 MXN',
    priceRegular: '$650 MXN',
    priceHigh: '$590 MXN',
    image: '/habitaciones/habitacion1.webp',
    beds: '1 Cama Matrimonial + 1 Individual',
    features: ['Baño privado', 'Agua caliente 24/7', 'Wi-Fi gratis', 'TV por cable']
  },
  {
    id: 3,
    title: 'Habitación Cuádruple',
    capacity: '4 Personas',
    description: 'Amplio espacio pensado para el confort de familias.',
    priceMin: '$590 MXN',
    priceRegular: '$750 MXN',
    priceHigh: '$690 MXN',
    image: '/habitaciones/habitacion3.webp',
    beds: '2 Camas Matrimoniales',
    features: ['Espaciosa', 'Baño privado', 'Agua caliente 24/7', 'Wi-Fi gratis']
  },
  {
    id: 4,
    title: 'Habitación Triple Familiar',
    capacity: '6 Personas',
    description: 'Máxima capacidad para grupos grandes con la mejor comodidad.',
    priceMin: '$890 MXN',
    priceRegular: '$1,050 MXN',
    priceHigh: '$990 MXN',
    image: '/habitaciones/habitacion5.webp',
    beds: '3 Camas Matrimoniales',
    features: ['Ideal familias/grupos', 'Baño privado', 'Agua caliente 24/7', 'Wi-Fi gratis']
  }
];