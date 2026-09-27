import { Guest } from './GuestTable';

export interface CountryOption {
  id: string;
  name: string;
  code: string; // Lada internacional
}

// Lista de países con sus Ladas internacionales para los selectores reutilizables
export const mockCountries: CountryOption[] = [
  { id: 'MX', name: 'México', code: '+52' },
  { id: 'US', name: 'Estados Unidos', code: '+1' },
  { id: 'CA', name: 'Canadá', code: '+1' },
  { id: 'CL', name: 'Chile', code: '+56' },
  { id: 'PT', name: 'Portugal', code: '+351' },
  { id: 'ES', name: 'España', code: '+34' },
  { id: 'AR', name: 'Argentina', code: '+54' },
  { id: 'CO', name: 'Colombia', code: '+57' },
  { id: 'FR', name: 'Francia', code: '+33' },
  { id: 'DE', name: 'Alemania', code: '+49' },
];

// Lista Mock de Huéspedes Registrados
export const mockGuests: Guest[] = [
  {
    id: '121097',
    name: 'Griselda Morales',
    email: 'gris.morales@gmail.com',
    phone: '901-233-6770',
    nationality: 'Chile',
    lastReservation: '23/07/2026 - 28/07/2026',
    type: 'Frecuente',
    totalReservations: 3,
    adults: 2,
    children: 0,
  },
  {
    id: '121092',
    name: 'John Smith',
    email: 'smith.john@mail.com',
    phone: '901-235-6770',
    nationality: 'Portugal',
    lastReservation: '15/05/2026 - 18/05/2026',
    type: 'Nuevo',
    totalReservations: 2,
    adults: 2,
    children: 1,
  },
  {
    id: '121093',
    name: 'Carlos Ramírez',
    email: 'carlos.ramirez@gmail.com',
    phone: '901-238-9911',
    nationality: 'México',
    lastReservation: '01/08/2026 - 05/08/2026',
    type: 'VIP',
    totalReservations: 7,
    adults: 4,
    children: 2,
  },
  {
    id: '121094',
    name: 'Sofia Mendoza',
    email: 'sofia.mendoza@outlook.com',
    phone: '901-240-1122',
    nationality: 'México',
    lastReservation: '10/09/2026 - 12/09/2026',
    type: 'Frecuente',
    totalReservations: 4,
    adults: 1,
    children: 0,
  },
  {
    id: '121095',
    name: 'Pierre Dubois',
    email: 'p.dubois@hoteles.fr',
    phone: '901-244-3388',
    nationality: 'Francia',
    lastReservation: '02/06/2026 - 09/06/2026',
    type: 'Nuevo',
    totalReservations: 1,
    adults: 2,
    children: 0,
  },
  {
    id: '121096',
    name: 'Ana María Torres',
    email: 'anita.torres@yahoo.es',
    phone: '901-249-7744',
    nationality: 'España',
    lastReservation: '18/04/2026 - 22/04/2026',
    type: 'VIP',
    totalReservations: 5,
    adults: 2,
    children: 2,
  },
];