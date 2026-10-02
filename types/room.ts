// types/room.ts

export interface SeasonRate {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  pricePerNight: number;
}

export interface SpecialDateRate {
  id: string;
  date: string;
  pricePerNight: number;
  reason?: string;
}

export interface DayRateGroup {
  id: string;
  days: string[];
  price: number;
}

// ✅ Se unifica RoomRatesConfig en una sola interfaz
export interface RoomRatesConfig {
  baseWeekdayPrice: number;
  baseWeekendPrice: number;
  dayRateGroups?: DayRateGroup[];
  seasons: SeasonRate[];
  specialDates: SpecialDateRate[];
}

export interface Room {
  id: number | string;
  number?: string;
  title?: string; 
  type?: string;
  adults?: number;
  children?: number;
  capacity?: string; 
  description?: string; 
  priceMin?: string;
  priceRegular?: string;
  priceHigh?: string;
  price?: string;
  image: string;
  status?: 'Disponible' | 'Ocupada' | 'Reservada' | 'Limpieza' | 'Mantenimiento' | string;
  housekeeping?: 'Limpia' | 'Sucio' | 'En Limpieza' | 'Pendiente' | 'Inspeccionada' | string;
  ratesConfig?: RoomRatesConfig;
}