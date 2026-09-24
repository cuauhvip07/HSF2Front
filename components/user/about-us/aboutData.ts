export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  note?: string; // Campo opcional para notas con letras pequeñas
}

export const ABOUT_FEATURES: FeatureItem[] = [
  {
    icon: "📍",
    title: "Ubicación Inmejorable",
    description: "Ubicados en Calle Lerdo #47, a solo 10 minutos a pie del Kiosko Mudéjar y el Centro Histórico."
  },
  {
    icon: "🚗",
    title: "Estacionamiento Privado",
    description: "Espacio seguro y gratuito dentro de las instalaciones para tu vehículo.",
    note: "*Sujeto a disponibilidad."
  },
  {
    icon: "🏷️",
    title: "Tarifas Accesibles",
    description: "Hospedaje cómodo con excelente relación calidad-precio, desde $390 MXN por noche."
  },
  {
    icon: "📶",
    title: "Servicios Esenciales",
    description: "Wi-Fi en áreas comunes, agua caliente 24 hrs y habitaciones equipadas para tu descanso."
  },
  {
    icon: "🗺️",
    title: "Asesoría Turística Local",
    description: "Te orientamos directamente en recepción sobre termas, talleres de esferas y cascadas."
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Ambiente 100% Familiar",
    description: "Habitaciones amplias con capacidad para recibir grupos pequeños y familias de hasta 6 personas."
  }
];

export const HOTEL_STATS = [
  { value: "24/7", label: "Recepción & Atención" },
  { value: "10 min", label: "Al centro de chignahuapan" },
  { value: "Gratis*", label: "Estacionamiento Privado", subtext: "*Sujeto a disponibilidad" }
];