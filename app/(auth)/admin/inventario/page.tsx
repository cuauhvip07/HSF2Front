import InventoryClient from '@/components/admin/inventory/InventoryClient';
import { InventoryItem } from '@/types/inventory';

// Datos de demostración (Simulan una consulta a la Base de Datos / API)
const mockInventory: InventoryItem[] = [
  {
    id: 'INV-101',
    name: 'Jabón Corporal Miel & Lavanda 30g',
    category: 'amenities',
    quantity: 120,
    minStock: 30,
    unit: 'piezas',
    costPerUnit: 12.5,
    location: 'Bodega Principal',
    lastRestocked: '2026-09-20',
  },
  {
    id: 'INV-102',
    name: 'Toalla de Baño Extra Grande Blanco',
    category: 'blancos',
    quantity: 8,
    minStock: 15, // ALERTA: Stock bajo
    unit: 'piezas',
    costPerUnit: 240.0,
    location: 'Lencería Central',
    lastRestocked: '2026-09-15',
  },
  {
    id: 'INV-103',
    name: 'Agua Ciel Mineral 600ml (Minibar)',
    category: 'minibar',
    quantity: 45,
    minStock: 20,
    unit: 'piezas',
    costPerUnit: 18.0,
    location: 'Almacén Minibar',
    lastRestocked: '2026-09-25',
  },
  {
    id: 'INV-104',
    name: 'Tomate Bola Fresco',
    category: 'alimentos',
    quantity: 3.5,
    minStock: 5.0, // ALERTA: Stock bajo
    unit: 'kg',
    costPerUnit: 35.0,
    location: 'Cocina / Refrigerador 1',
    lastRestocked: '2026-09-27',
  },
  {
    id: 'INV-105',
    name: 'Papel Higiénico Doble Hoja Institucional',
    category: 'amenities',
    quantity: 200,
    minStock: 50,
    unit: 'piezas',
    costPerUnit: 9.0,
    location: 'Bodega Principal',
    lastRestocked: '2026-09-22',
  },
];

export default async function InventoryPage() {

  return <InventoryClient initialItems={mockInventory} />;
}