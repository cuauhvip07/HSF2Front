import ReservationsClient from '@/components/admin/reservations/ReservationClient';
import { Reservation } from '@/components/admin/reservations/ReservationTable';

// Mock temporal
const mockReservations: Reservation[] = [
  {
    id: 'RS-1092',
    guestName: 'Griselda Morales',
    guestEmail: 'gris@gmail.com',
    roomType: 'Habitación Doble',
    checkIn: '2026-03-05',
    checkOut: '2026-03-08',
    occupants: '2 Ad',
    amount: '$1,350 MXN',
    status: 'Confirmado',
  },
  {
    id: 'RS-1093',
    guestName: 'Carlos Ramírez',
    guestEmail: 'carlos.ramirez@gmail.com',
    roomType: 'Habitación Triple Familiar',
    checkIn: '2026-03-12',
    checkOut: '2026-03-15',
    occupants: '4 Ad, 2 Niñ',
    amount: '$3,150 MXN',
    status: 'Checked-in',
  },
  {
    id: 'RS-1094',
    guestName: 'Sofía Castro',
    guestEmail: 'sofia.c@gmail.com',
    roomType: 'Habitación Doble Sencilla',
    checkIn: '2026-03-15',
    checkOut: '2026-03-17',
    occupants: '2 Ad, 1 Niñ',
    amount: '$1,300 MXN',
    status: 'Pendiente',
  },
  {
    id: 'RS-1095',
    guestName: 'Miguel Ángel Torres',
    guestEmail: 'torres.m@gmail.com',
    roomType: 'Habitación Cuádruple',
    checkIn: '2026-03-20',
    checkOut: '2026-03-22',
    occupants: '4 Ad',
    amount: '$1,500 MXN',
    status: 'Confirmado',
  },
];

export default async function ReservationsPage() {
  // Cuando integres el Backend/Base de datos, aquí podrás hacer llamadas como:
  // const reservations = await getReservationsFromDB();

  return <ReservationsClient initialReservations={mockReservations} />;
}