'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InventoryItem, InventoryFormData } from '@/types/inventory';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: InventoryFormData) => void;
  initialData?: InventoryItem | null;
}

const CATEGORY_OPTIONS = [
  { value: 'amenities', label: 'Amenities & Baño (Jabones, Shampoo)' },
  { value: 'blancos', label: 'Lencería & Blancos (Toallas, Sábanas)' },
  { value: 'minibar', label: 'Minibar & Bebidas (Aguas, Refrescos)' },
  { value: 'alimentos', label: 'Cocina & Alimentos (Tomate, Insumos)' },
];

const UNIT_OPTIONS = [
  { value: 'piezas', label: 'Piezas (Pzs)' },
  { value: 'kg', label: 'Kilogramos (Kg)' },
  { value: 'litros', label: 'Litros (L)' },
  { value: 'cajas', label: 'Cajas' },
  { value: 'paquetes', label: 'Paquetes' },
];

export default function InventoryModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: InventoryModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<InventoryFormData>({
    defaultValues: {
      name: '',
      category: 'amenities',
      quantity: 0,
      minStock: 5,
      unit: 'piezas',
      costPerUnit: 0,
      location: 'Almacén General',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        category: initialData.category,
        quantity: initialData.quantity,
        minStock: initialData.minStock,
        unit: initialData.unit,
        costPerUnit: initialData.costPerUnit,
        location: initialData.location,
      });
    } else {
      reset({
        name: '',
        category: 'amenities',
        quantity: 0,
        minStock: 5,
        unit: 'piezas',
        costPerUnit: 0,
        location: 'Almacén General',
      });
    }
  }, [initialData, reset, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2926]/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl border border-[#e5ded0] overflow-hidden">
        {/* Header */}
        <div className="bg-[#f7f4ed] px-6 py-4 border-b border-[#e5ded0] flex justify-between items-center">
          <h2 className="font-serif text-xl font-bold text-[#2d2926]">
            {initialData ? 'Editar Insumo / Producto' : 'Registrar Nuevo Insumo'}
          </h2>
          <button
            onClick={onClose}
            className="text-[#988f86] hover:text-[#2d2926] text-2xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSave)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre del Producto */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5a524c] mb-1">
                Nombre del Insumo / Producto *
              </label>
              <input
                type="text"
                placeholder="Ej. Jabón de tocador 30g, Tomate Bola, Toalla de Cuerpo"
                {...register('name', { required: 'El nombre es requerido' })}
                className="w-full px-3 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-[#2d2926] placeholder-[#988f86] focus:outline-none focus:border-[#c0a060]"
              />
              {errors.name && (
                <span className="text-xs text-[#d95d39] mt-1">{errors.name.message}</span>
              )}
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5a524c] mb-1">
                Categoría *
              </label>
              <select
                {...register('category', { required: true })}
                className="w-full px-3 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Unidad de Medida */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5a524c] mb-1">
                Unidad de Medida *
              </label>
              <select
                {...register('unit', { required: true })}
                className="w-full px-3 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              >
                {UNIT_OPTIONS.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Cantidad Actual */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5a524c] mb-1">
                Stock Actual *
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0"
                {...register('quantity', {
                  required: 'La cantidad es requerida',
                  min: { value: 0, message: 'No puede ser negativo' },
                })}
                className="w-full px-3 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              />
              {errors.quantity && (
                <span className="text-xs text-[#d95d39] mt-1">{errors.quantity.message}</span>
              )}
            </div>

            {/* Stock Mínimo (Alerta) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5a524c] mb-1">
                Stock Mínimo (Alerta) *
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="5"
                {...register('minStock', {
                  required: 'El stock mínimo es requerido',
                  min: { value: 0, message: 'No puede ser negativo' },
                })}
                className="w-full px-3 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              />
              {errors.minStock && (
                <span className="text-xs text-[#d95d39] mt-1">{errors.minStock.message}</span>
              )}
            </div>

            {/* Costo Unitario */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5a524c] mb-1">
                Costo Unitario ($ MXN)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('costPerUnit', {
                  min: { value: 0, message: 'No puede ser negativo' },
                })}
                className="w-full px-3 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              />
            </div>

            {/* Ubicación / Bodega */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5a524c] mb-1">
                Ubicación / Almacén
              </label>
              <input
                type="text"
                placeholder="Ej. Bodega General, Cocina, Piso 1"
                {...register('location')}
                className="w-full px-3 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              />
            </div>
          </div>

          {/* Footer del Modal */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#e5ded0] mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-[#e5ded0] text-[#5a524c] rounded-lg font-medium hover:bg-[#f7f4ed] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#d95d39] text-white rounded-lg font-medium hover:bg-[#c44f2e] transition-colors shadow-sm"
            >
              {initialData ? 'Guardar Cambios' : 'Agregar a Inventario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}