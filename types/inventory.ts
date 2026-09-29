export type InventoryCategory = 'amenities' | 'blancos' | 'minibar' | 'alimentos';

export type UnitOfMeasure = 'piezas' | 'kg' | 'litros' | 'cajas' | 'paquetes';

export interface InventoryItem {
  id: string; // ej: "INV-001"
  name: string;
  category: InventoryCategory;
  quantity: number;
  minStock: number; // Umbral para alerta de reabastecimiento
  unit: UnitOfMeasure;
  costPerUnit: number; // Precio de compra o costo unitario
  location: string; // ej: "Almacén General", "Minibar Central", "Bodega Piso 2"
  lastRestocked: string; // Fecha formato YYYY-MM-DD
}

export interface InventoryFormData {
  name: string;
  category: InventoryCategory;
  quantity: number;
  minStock: number;
  unit: UnitOfMeasure;
  costPerUnit: number;
  location: string;
}