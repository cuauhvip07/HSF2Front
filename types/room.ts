// types/room.ts

export interface SeasonRate {
  id: string;
  name: string; // ej: "Temporada Alta - Navidades", "Verano Boutique"
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  pricePerNight: number;
}

export interface SpecialDateRate {
  id: string;
  date: string; // YYYY-MM-DD
  pricePerNight: number;
  reason?: string; // ej: "Concierto / Puente / Alta Demanda"
}

export interface RoomRatesConfig {
  baseWeekdayPrice: number; // Lunes a Jueves
  baseWeekendPrice: number; // Viernes a Domingo
  seasons: SeasonRate[];
  specialDates: SpecialDateRate[];
}

export interface Room {
  id: number | string;
  number?: string;
  title: string; // ej: "Habitación Deluxe 101"
  type?: string;
  adults?: number;
  children?: number;
  capacity: string; // ej: "2 Adultos, 1 Niño"
  description: string;
  priceMin: string; // Tarifa Mínima / Baja
  priceRegular: string; // Tarifa Regular (L-J)
  priceHigh: string; // Tarifa Alta / Fin de Semana
  price?: string; // 🌟 AÑADIDO: Propiedad opcional para precio general/mostrado
  image: string;
  status?: 'Disponible' | 'Ocupada' | 'Reservada' | 'Mantenimiento' | string;
  housekeeping?: 'Limpia' | 'Sucio' | 'En Limpieza' | 'Inspeccionada' | string;
  ratesConfig?: RoomRatesConfig;
}

export interface DayRateGroup {
  id: string;
  days: string[]; // ['L', 'M', 'X', 'J', 'V', 'S', 'D']
  price: number;
}

export interface RoomRatesConfig {
  baseWeekdayPrice: number;
  baseWeekendPrice: number;
  dayRateGroups?: DayRateGroup[]; // 🌟 Nuevo arreglo de reglas matriciales por días
  seasons: SeasonRate[];
  specialDates: SpecialDateRate[];
}