import RoomsClient from '@/components/admin/rooms/RoomsClient';
import { Room } from '@/components/admin/rooms/RoomTable';

const mockRooms: Room[] = [
  {
    id: '121097',
    image: '/image-hero.png',
    number: '230',
    type: 'Suite Presidencial',
    capacity: '2 Ad, 1 Niñ',
    price: '$2,400 MXN',
    status: 'Disponible',
    housekeeping: 'Limpia',
  },
  {
    id: '121092',
    image: '/image-hero.png',
    number: '27',
    type: 'Habitación Doble',
    capacity: '2 Ad',
    price: '$1,200 MXN',
    status: 'Ocupada',
    housekeeping: 'Limpia',
  },
  {
    id: '121093',
    image: '/image-hero.png',
    number: '20',
    type: 'Habitación Estándar',
    capacity: '2 Ad',
    price: '$1,200 MXN',
    status: 'Limpieza',
    housekeeping: 'Pendiente',
  },
  {
    id: '121094',
    image: '/image-hero.png',
    number: '13',
    type: 'Habitación Estándar',
    capacity: '2 Ad',
    price: '$1,200 MXN',
    status: 'Limpieza',
    housekeeping: 'Pendiente',
  },
  {
    id: '121095',
    image: '/image-hero.png',
    number: '14',
    type: 'Habitación Estándar',
    capacity: '2 Ad',
    price: '$1,200 MXN',
    status: 'Ocupada',
    housekeeping: 'Limpia',
  },
  {
    id: '121099',
    image: '/image-hero.png',
    number: '336',
    type: 'Suite Jr.',
    capacity: '2 Ad',
    price: '$1,200 MXN',
    status: 'Mantenimiento',
    housekeeping: 'Limpia',
  },
];

export default async function RoomsPage() {

  return <RoomsClient initialRooms={mockRooms} />;
}