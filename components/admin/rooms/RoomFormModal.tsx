'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Room } from './RoomTable';
import ImageUploader from './ImageUploader';

interface RoomFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newRoom: Room) => void;
}

const roomTypes = [
  'Suite Presidencial',
  'Suite Jr.',
  'Habitación Doble',
  'Habitación Estándar',
  'Habitación Cuádruple',
];

const statusOptions = ['Disponible', 'Ocupada', 'Limpieza', 'Mantenimiento'];
const housekeepingOptions = ['Limpia', 'Pendiente'];

interface FormValues {
  title: string;
  number: string;
  type: string;
  adults: number;
  children: number;
  priceRegular: string;
  description: string;
  status: string;
  housekeeping: string;
}

export default function RoomFormModal({
  isOpen,
  onClose,
  onSave,
}: RoomFormModalProps) {
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      adults: 2,
      children: 0,
      type: 'Habitación Estándar',
      status: 'Disponible',
      housekeeping: 'Limpia',
    },
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      reset({
        adults: 2,
        children: 0,
        type: 'Habitación Estándar',
        status: 'Disponible',
        housekeeping: 'Limpia',
        title: '',
        number: '',
        description: '',
        priceRegular: '',
      });
      setImagePreview('');
      setSelectedImageFile(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const handleImageSelected = (file: File | null, previewUrl: string) => {
    setSelectedImageFile(file);
    setImagePreview(previewUrl);
  };

  const onSubmit = (data: FormValues) => {
    const formattedCapacity = `${data.adults} Ad${
      data.children > 0 ? `, ${data.children} Niñ` : ''
    }`;

    // Objeto compatible con la interfaz Room de RoomTable.tsx
    const newRoom: Room = {
      id: Date.now().toString(),
      number: data.number,
      type: data.type,
      adults: Number(data.adults),
      children: Number(data.children),
      capacity: formattedCapacity,
      price: data.priceRegular.startsWith('$') ? data.priceRegular : `$${data.priceRegular} MXN`,
      status: data.status,
      housekeeping: data.housekeeping,
      image: imagePreview || '/image-hero.webp',
    };

    onSave(newRoom);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d2926]/60 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl border border-[#e5ded0] w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col z-10">
        <div className="p-6 border-b border-[#e5ded0] flex items-center justify-between sticky top-0 bg-white z-20">
          <div>
            <span className="text-xs font-mono font-bold text-[#c0a060] uppercase tracking-wider">
              ADMINISTRACIÓN
            </span>
            <h3 className="text-xl font-serif font-bold text-[#2d2926]">
              Registrar Nueva Habitación
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#5a524c] hover:text-[#2d2926] hover:bg-[#f7f4ed] rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-5">
          {/* UPLOADER DE IMAGEN */}
          <ImageUploader
            currentImage={imagePreview}
            onImageSelected={handleImageSelected}
          />

          {/* Nombre / Título */}
          <div>
            <label className="block text-xs font-semibold text-[#5a524c] mb-1">
              Nombre / Título de la Habitación <span className="text-[#d95d39]">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej. Master Suite Santa Fe"
              {...register('title', { required: 'El título es obligatorio' })}
              className={`w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none transition-colors ${
                errors.title ? 'border-[#d95d39]' : 'border-[#e5ded0] focus:border-[#c0a060]'
              }`}
            />
            {errors.title && (
              <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Número y Tipo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Número / Código <span className="text-[#d95d39]">*</span>
              </label>
              <input
                type="text"
                placeholder="Ej. 101"
                {...register('number', {
                  required: 'El número de habitación es obligatorio',
                  pattern: {
                    value: /^[0-9A-Za-z-]+$/,
                    message: 'Solo se permiten números y letras sin espacios',
                  },
                })}
                className={`w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border rounded-xl text-sm font-bold text-[#2d2926] focus:outline-none transition-colors ${
                  errors.number ? 'border-[#d95d39]' : 'border-[#e5ded0] focus:border-[#c0a060]'
                }`}
              />
              {errors.number && (
                <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                  {errors.number.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Tipo de Habitación <span className="text-[#d95d39]">*</span>
              </label>
              <select
                {...register('type', { required: 'Selecciona una categoría' })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              >
                {roomTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* CAPACIDAD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f7f4ed]/40 p-4 rounded-xl border border-[#e5ded0]">
            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Capacidad Adultos <span className="text-[#d95d39]">*</span>
              </label>
              <select
                {...register('adults', { valueAsNumber: true })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Adulto' : 'Adultos'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Capacidad Niños
              </label>
              <select
                {...register('children', { valueAsNumber: true })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              >
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Niño' : 'Niños'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* TARIFA */}
          <div>
            <label className="block text-xs font-semibold text-[#5a524c] mb-1">
              Precio por Noche ($ MXN) <span className="text-[#d95d39]">*</span>
            </label>
            <input
              type="text"
              placeholder="$1,500 MXN"
              {...register('priceRegular', { required: 'El precio por noche es obligatorio' })}
              className={`w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none transition-colors ${
                errors.priceRegular ? 'border-[#d95d39]' : 'border-[#e5ded0] focus:border-[#c0a060]'
              }`}
            />
            {errors.priceRegular && (
              <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                {errors.priceRegular.message}
              </p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-semibold text-[#5a524c] mb-1">
              Descripción
            </label>
            <textarea
              rows={3}
              placeholder="Detalles sobre la vista, comodidades y acabados..."
              {...register('description')}
              className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
            />
          </div>

          {/* ESTADO Y LIMPIEZA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Estado Inicial
              </label>
              <select
                {...register('status')}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              >
                {statusOptions.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Estado de Limpieza
              </label>
              <select
                {...register('housekeeping')}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              >
                {housekeepingOptions.map((hk) => (
                  <option key={hk} value={hk}>
                    {hk}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex items-center justify-end gap-3 border-t border-[#e5ded0] pt-5 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#e5ded0] text-xs font-semibold text-[#5a524c] hover:bg-[#f7f4ed] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#c0a060] hover:bg-[#a88a4d] text-white text-xs font-bold transition-all shadow-sm tracking-wider uppercase disabled:opacity-50"
            >
              Guardar Habitación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}