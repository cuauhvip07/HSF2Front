'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InventoryItem, InventoryFormData } from '@/types/inventory';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: InventoryFormData) => void;
  initialData?: InventoryItem | null;
}

const CATEGORY_OPTIONS = [
  { value: 'amenities', label: 'Amenities & Baño (Jabones, Shampoo)' },
  { value: 'blancos', label: 'Blancos (Toallas, Sábanas)' },
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
    formState: { errors, isSubmitting },
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

  // Bloqueo del Scroll del Body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  const onSubmit = async (data: InventoryFormData) => {
    /* ========================================================================
       PETICIÓN AL BACKEND (FETCH OPCIONAL)
       Crear: POST http://localhost:4000/api/v1/inventory
       Editar: PUT http://localhost:4000/api/v1/inventory/${initialData.id}
       ========================================================================

    try {
      const url = initialData
        ? `http://localhost:4000/api/v1/inventory/${initialData.id}`
        : 'http://localhost:4000/api/v1/inventory';

      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el insumo en el servidor');
      }

      const savedData = await response.json();
      onSave(savedData);
      onClose();
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('Hubo un error al guardar el ítem de inventario.');
    }
    ======================================================================== */

    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2926]/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-[#e5ded0] overflow-hidden flex flex-col z-10 max-h-[90vh]">
        {/* Header con Icono de Cierre SVG */}
        <div className="bg-[#f7f4ed] px-6 py-4 border-b border-[#e5ded0] flex justify-between items-center sticky top-0 z-20">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#c0a060] uppercase tracking-wider block">
              {initialData ? `ID: #${initialData.id}` : 'NUEVO INSUMO'}
            </span>
            <h2 className="font-serif text-xl font-bold text-[#2d2926]">
              {initialData ? 'Editar Insumo / Producto' : 'Registrar Nuevo Insumo'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#5a524c] hover:text-[#2d2926] hover:bg-[#e5ded0]/50 rounded-lg transition-colors"
            title="Cerrar modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre del Producto */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5a524c] mb-1">
                Nombre del Insumo / Producto <span className="text-[#d95d39]">*</span>
              </label>
              <input
                type="text"
                placeholder="Ej. Jabón de tocador 30g, Tomate Bola, Toalla de Cuerpo"
                {...register('name', { required: 'El nombre es requerido' })}
                className={`w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border rounded-xl text-sm font-semibold text-[#2d2926] placeholder-[#988f86] focus:outline-none transition-colors ${
                  errors.name ? 'border-[#d95d39]' : 'border-[#e5ded0] focus:border-[#c0a060]'
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-[#d95d39] mt-1 font-medium">{errors.name.message}</p>
              )}
            </div>

            {/* Categoría (Solución al texto que se corta con truncate) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5a524c] mb-1">
                Categoría <span className="text-[#d95d39]">*</span>
              </label>
              <select
                {...register('category', { required: true })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-xs font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060] truncate cursor-pointer"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.value} value={cat.value} title={cat.label}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Unidad de Medida */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5a524c] mb-1">
                Unidad de Medida <span className="text-[#d95d39]">*</span>
              </label>
              <select
                {...register('unit', { required: true })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-xs font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060] cursor-pointer"
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
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5a524c] mb-1">
                Stock Actual <span className="text-[#d95d39]">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0"
                {...register('quantity', {
                  valueAsNumber: true,
                  required: 'La cantidad es requerida',
                  min: { value: 0, message: 'No puede ser negativo' },
                })}
                className={`w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none transition-colors ${
                  errors.quantity ? 'border-[#d95d39]' : 'border-[#e5ded0] focus:border-[#c0a060]'
                }`}
              />
              {errors.quantity && (
                <p className="text-[11px] text-[#d95d39] mt-1 font-medium">{errors.quantity.message}</p>
              )}
            </div>

            {/* Stock Mínimo (Alerta) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5a524c] mb-1">
                Stock Mínimo (Alerta) <span className="text-[#d95d39]">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="5"
                {...register('minStock', {
                  valueAsNumber: true,
                  required: 'El stock mínimo es requerido',
                  min: { value: 0, message: 'No puede ser negativo' },
                })}
                className={`w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none transition-colors ${
                  errors.minStock ? 'border-[#d95d39]' : 'border-[#e5ded0] focus:border-[#c0a060]'
                }`}
              />
              {errors.minStock && (
                <p className="text-[11px] text-[#d95d39] mt-1 font-medium">{errors.minStock.message}</p>
              )}
            </div>

            {/* Costo Unitario */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5a524c] mb-1">
                Costo Unitario ($ MXN)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('costPerUnit', {
                  valueAsNumber: true,
                  min: { value: 0, message: 'No puede ser negativo' },
                })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              />
            </div>

            {/* Ubicación / Almacén */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5a524c] mb-1">
                Ubicación / Almacén
              </label>
              <input
                type="text"
                placeholder="Ej. Bodega General, Cocina, Piso 1"
                {...register('location')}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              />
            </div>
          </div>

          {/* Footer del Modal */}
          <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#e5ded0] mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-[#e5ded0] text-xs font-semibold text-[#5a524c] rounded-xl hover:bg-[#f7f4ed] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm disabled:opacity-50"
            >
              {initialData ? 'Guardar Cambios' : 'Agregar a Inventario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}