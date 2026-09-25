import GuestsClient from '@/components/admin/guests/GuestsClient';
import { Guest } from '@/components/admin/guests/GuestTable';

const mockGuests: Guest[] = [
  {
    id: '121097',
    name: 'Griselda Morales',
    email: 'gris@gmail.com',
    phone: '901-233-6770',
    nationality: 'Chile',
    lastReservation: '07/23 - 05/23',
    type: 'Frecuente',
    totalReservations: 3,
  },
  {
    id: '121092',
    name: 'John Smith',
    email: 'smith@mail.com',
    phone: '901-235-6770',
    nationality: 'Portugal',
    lastReservation: '02/23 - 05/23',
    type: 'Nuevo',
    totalReservations: 2,
  },
  {
    id: '121093',
    name: 'Carlos Ramírez',
    email: 'carlos.ramirez@gmail.com',
    phone: '901-235-6770',
    nationality: 'México',
    lastReservation: '02/23 - 05/23',
    type: 'Nuevo',
    totalReservations: 1,
  },
  {
    id: '121094',
    name: 'Mark Amtlin',
    email: 'mark@gmail.com',
    phone: '901-233-6730',
    nationality: 'México',
    lastReservation: '02/23 - 05/23',
    type: 'Nuevo',
    totalReservations: 1,
  },
  {
    id: '121096',
    name: 'Robert Marriah',
    email: 'marri@gmail.com',
    phone: '901-233-6770',
    nationality: 'Chile',
    lastReservation: '05/23 - 05/23',
    type: 'Frecuente',
    totalReservations: 2,
  },
  {
    id: '121056',
    name: 'Amia Raras',
    email: 'arias@gmail.com',
    phone: '901-335-6770',
    nationality: 'México',
    lastReservation: '05/23 - 05/23',
    type: 'VIP',
    totalReservations: 1,
  },
];

export default async function GuestsPage() {
  // Cuando agregues Backend / Base de Datos:
  // const guests = await getGuestsFromDB();

  return <GuestsClient initialGuests={mockGuests} />;
}