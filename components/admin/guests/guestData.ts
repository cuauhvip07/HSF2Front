export interface Country {
  id: string;
  name: string;
  code: string; // Lada telefónica (ej. +52)
}

export const mockCountries: Country[] = [
  { id: 'MX', name: 'México', code: '+52' },
  { id: 'US', name: 'Estados Unidos', code: '+1' },
  { id: 'CA', name: 'Canadá', code: '+1-CA' },
  { id: 'CL', name: 'Chile', code: '+56' },
  { id: 'PT', name: 'Portugal', code: '+351' },
];