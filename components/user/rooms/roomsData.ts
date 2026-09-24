export interface Room {
  id: string;
  name: string;
  capacity: number;
  beds: string;
  image: string;
  priceWeekday: number;
  priceWeekend: number;
  priceHighSeason: number;
  features: string[];
}

export const ROOMS_DATA: Room[] = [
  {
    id: 'doble',
    name: 'Habitación Doble',
    capacity: 2,
    beds: '1 Cama Matrimonial',
    image: '/habitaciones/habitacion1.jpeg',
    priceWeekday: 390,
    priceWeekend: 450,
    priceHighSeason: 450,
    features: ['Baño privado', 'Agua caliente 24/7', 'Wi-Fi gratis', 'TV por cable']
  },
  {
    id: 'doble-sencilla',
    name: 'Habitación Doble Sencilla',
    capacity: 3,
    beds: '1 Cama Matrimonial + 1 Individual',
    image: '/habitaciones/habitacion2.jpeg',
    priceWeekday: 550,
    priceWeekend: 650,
    priceHighSeason: 590,
    features: ['Baño privado', 'Agua caliente 24/7', 'Wi-Fi gratis', 'TV por cable']
  },
  {
    id: 'cuadruple',
    name: 'Habitación Cuádruple',
    capacity: 4,
    beds: '2 Camas Matrimoniales',
    image: '/habitaciones/habitacion3.jpeg',
    priceWeekday: 590,
    priceWeekend: 750,
    priceHighSeason: 690,
    features: ['Espaciosa', 'Baño privado', 'Agua caliente 24/7', 'Wi-Fi gratis']
  },
  {
    id: 'triple-familiar',
    name: 'Habitación Triple Familiar',
    capacity: 6,
    beds: '3 Camas Matrimoniales',
    image: '/habitaciones/habitacion5.jpeg', // Usamos la imagen 5 para la familiar de 6 personas
    priceWeekday: 890,
    priceWeekend: 1050,
    priceHighSeason: 990,
    features: ['Ideal familias/grupos', 'Baño privado', 'Agua caliente 24/7', 'Wi-Fi']
  }
];