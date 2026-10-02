'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Room } from '@/types/room';
import { createRoom } from '@/services/roomService';
import ImageUploader from './ImageUploader';

interface RoomFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newRoom: Room) => void;
}

interface DayRateGroup {
  id: string;
  days: string[];
  price: number;
}

const ALL_WEEKDAYS = [
  { key: 'L', label: 'L' },
  { key: 'M', label: 'M' },
  { key: 'X', label: 'X' },
  { key: 'J', label: 'J' },
  { key: 'V', label: 'V' },
  { key: 'S', label: 'S' },
  { key: 'D', label: 'D' },
];

const roomTypes = [
  'Habitación Doble',
  'Habitación Doble Sencilla',
  'Habitación Cuádruple',
  'Habitación Triple Familiar',
];

const statusOptions = ['Disponible', 'Ocupada', 'Limpieza', 'Mantenimiento'];
const housekeepingOptions = ['Limpia', 'Pendiente'];

interface FormValues {
  title: string;
  number: string;
  type: string;
  adults: number;
  children: number;
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
  const [serverError, setServerError] = useState<string | null>(null);

  // 🟢 Lógica de Precios por Grupos de Días igual a RoomRatesModal
  const [dayRateGroups, setDayRateGroups] = useState<DayRateGroup[]>([
    { id: 'g1', days: ['L', 'M', 'X', 'J'], price: 390 },
    { id: 'g2', days: ['V', 'S', 'D'], price: 450 },
  ]);
  const [selectedNewDays, setSelectedNewDays] = useState<string[]>([]);
  const [newGroupPrice, setNewGroupPrice] = useState<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      adults: 2,
      children: 0,
      type: 'Habitación Doble',
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
        type: 'Habitación Doble',
        status: 'Disponible',
        housekeeping: 'Limpia',
        title: '',
        number: '',
        description: '',
      });
      setDayRateGroups([
        { id: 'g1', days: ['L', 'M', 'X', 'J'], price: 390 },
        { id: 'g2', days: ['V', 'S', 'D'], price: 450 },
      ]);
      setSelectedNewDays([]);
      setNewGroupPrice(0);
      setImagePreview('');
      setSelectedImageFile(null);
      setServerError(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, reset]);

  if (!isOpen) return null;

  // Manejadores de Tarifas Dinámicas por Día
  const assignedDays = dayRateGroups.flatMap((g) => g.days);
  const availableDays = ALL_WEEKDAYS.filter((d) => !assignedDays.includes(d.key));

  const handleToggleDayInGroup = (groupId: string, dayKey: string) => {
    setDayRateGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          const exists = group.days.includes(dayKey);
          return {
            ...group,
            days: exists ? group.days.filter((d) => d !== dayKey) : [...group.days, dayKey],
          };
        }
        return group;
      })
    );
  };

  const handlePriceChangeInGroup = (groupId: string, price: number) => {
    setDayRateGroups((prev) =>
      prev.map((group) => (group.id === groupId ? { ...group, price } : group))
    );
  };

  const handleRemoveGroup = (groupId: string) => {
    setDayRateGroups((prev) => prev.filter((g) => g.id !== groupId));
  };

  const handleToggleNewDay = (dayKey: string) => {
    setSelectedNewDays((prev) =>
      prev.includes(dayKey) ? prev.filter((d) => d !== dayKey) : [...prev, dayKey]
    );
  };

  const handleAddDayGroup = () => {
    if (selectedNewDays.length === 0 || newGroupPrice <= 0) {
      alert('Selecciona al menos un día y asigna un precio mayor a 0.');
      return;
    }
    setDayRateGroups([
      ...dayRateGroups,
      { id: `G-${Date.now()}`, days: selectedNewDays, price: newGroupPrice },
    ]);
    setSelectedNewDays([]);
    setNewGroupPrice(0);
  };

  const handleImageSelected = (file: File | null, previewUrl: string) => {
    setSelectedImageFile(file);
    setImagePreview(previewUrl);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (assignedDays.length === 0) {
        setServerError('Debes asignar al menos un precio para los días de la semana.');
        return;
      }

      setServerError(null);

      const payload = {
        title: data.title,
        number: data.number,
        type: data.type,
        adults: Number(data.adults),
        children: Number(data.children),
        capacity: `${data.adults} Personas`,
        description: data.description,
        status: data.status,
        housekeeping: data.housekeeping,
        image: imagePreview || '/habitaciones/habitacion1.webp',
        dayRateGroups, // 🟢 Se envía el array con la configuración de precios
      };

      const createdRoom = await createRoom(payload as any);
      onSave(createdRoom);
      onClose();
    } catch (error) {
      console.error('Error al guardar habitación:', error);
      setServerError('No se pudo conectar con el servidor para registrar la habitación.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d2926]/60 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl border border-[#e5ded0] w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col z-10">
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
          {serverError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-semibold">
              {serverError}
            </div>
          )}

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
              placeholder="Ej. Habitación Doble Sencilla"
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
                {...register('number', { required: 'El número de habitación es obligatorio' })}
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

          {/* 🟢 DISEÑADOR DE TARIFAS SEMANALES POR DÍAS (Igual a RoomRatesModal) */}
          <div className="bg-[#f7f4ed]/50 p-4 rounded-xl border border-[#e5ded0] space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c0a060]">
              Tarifas Semanales Iniciales (L, M, X, J, V, S, D)
            </h4>

            <div className="space-y-3">
              {dayRateGroups.map((group, idx) => (
                <div key={group.id} className="bg-white p-3 rounded-lg border border-[#e5ded0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#5a524c] uppercase">Grupo #{idx + 1} - Días Aplicables:</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {ALL_WEEKDAYS.map((d) => {
                        const isSelectedInThisGroup = group.days.includes(d.key);
                        const isAssignedElsewhere = !isSelectedInThisGroup && assignedDays.includes(d.key);

                        return (
                          <button
                            key={d.key}
                            type="button"
                            disabled={isAssignedElsewhere}
                            onClick={() => handleToggleDayInGroup(group.id, d.key)}
                            className={`w-7 h-7 rounded-md text-xs font-bold transition-all ${
                              isSelectedInThisGroup
                                ? 'bg-[#c0a060] text-white shadow-sm'
                                : isAssignedElsewhere
                                ? 'bg-gray-100 text-gray-300 border border-gray-200 cursor-not-allowed'
                                : 'bg-[#f7f4ed] text-[#5a524c] hover:bg-[#e5ded0] border border-[#e5ded0]'
                            }`}
                          >
                            {d.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <div>
                      <span className="text-[10px] text-[#5a524c] block font-semibold">Precio / Noche ($)</span>
                      <input
                        type="number"
                        value={group.price}
                        onChange={(e) => handlePriceChangeInGroup(group.id, Number(e.target.value))}
                        className="w-28 px-2 py-1 bg-white border border-[#e5ded0] rounded text-xs font-mono font-bold text-[#2d2926] outline-none focus:border-[#c0a060]"
                      />
                    </div>
                    {dayRateGroups.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveGroup(group.id)}
                        className="mt-3 text-red-500 font-bold hover:bg-red-50 p-1.5 rounded transition-colors"
                        title="Eliminar esta regla"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {availableDays.length > 0 ? (
              <div className="bg-white p-3 rounded-lg border border-dashed border-[#c0a060]/60 space-y-2">
                <span className="text-xs font-bold text-[#d95d39] uppercase tracking-wider block">
                  + Asignar Tarifa a Días Faltantes ({availableDays.map((d) => d.label).join(', ')})
                </span>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex gap-1.5 flex-wrap">
                    {availableDays.map((d) => {
                      const isSelected = selectedNewDays.includes(d.key);
                      return (
                        <button
                          key={d.key}
                          type="button"
                          onClick={() => handleToggleNewDay(d.key)}
                          className={`w-7 h-7 rounded-md text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-[#d95d39] text-white shadow-sm'
                              : 'bg-[#f7f4ed] text-[#5a524c] hover:bg-[#e5ded0] border border-[#e5ded0]'
                          }`}
                        >
                          {d.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <input
                      type="number"
                      placeholder="Precio $"
                      value={newGroupPrice || ''}
                      onChange={(e) => setNewGroupPrice(Number(e.target.value))}
                      className="w-full sm:w-28 px-2 py-1 text-xs bg-white border border-[#e5ded0] rounded font-mono outline-none focus:border-[#c0a060]"
                    />
                    <button
                      type="button"
                      onClick={handleAddDayGroup}
                      className="px-3 py-1 bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold rounded shadow-sm whitespace-nowrap"
                    >
                      Agregar Regla
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-[#065f46] bg-[#d1fae5] p-2 rounded border border-[#a7f3d0] font-medium text-center">
                ✓ Todos los días de la semana (L, M, X, J, V, S, D) tienen asignada una tarifa.
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
              placeholder="Detalles sobre las comodidades..."
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
              {isSubmitting ? 'Guardando...' : 'Guardar Habitación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}