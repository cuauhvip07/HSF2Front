'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import SearchableSelect, { Option } from '@/components/ui/SearchableSelect';
import { Reservation } from './ReservationTable';
import { Guest } from '../guests/GuestTable';

interface NewReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newReservation: Reservation) => void;
  existingGuests: Guest[];
}

const roomOptions = [
  'Habitación Doble',
  'Habitación Doble Sencilla',
  'Habitación Cuádruple',
  'Habitación Triple Familiar',
];

export default function NewReservationModal({
  isOpen,
  onClose,
  onSave,
  existingGuests,
}: NewReservationModalProps) {
  // Estado para saber si los datos del cliente provinieron de la lista existente
  const [isExistingGuest, setIsExistingGuest] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Reservation & { guestSearch?: string }>();

  useEffect(() => {
    if (isOpen) {
      setIsExistingGuest(false);
      reset({
        guestName: '',
        guestPhone: '',
        guestEmail: '',
        adults: 2,
        children: 0,
        status: 'Confirmado',
        roomType: roomOptions[0],
      });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, reset]);

  if (!isOpen) return null;

  // Lista de sugerencias para el autocompletado
  const guestSearchOptions: Option[] = existingGuests.map((g) => ({
    id: g.id,
    label: g.name,
    subLabel: `Tel: ${g.phone} | ${g.email}`,
    value: g.name,
    rawItem: g,
  }));

  // Limpiar/Desbloquear cliente para escribir uno nuevo desde cero
  const handleResetGuestSelection = () => {
    setIsExistingGuest(false);
    setValue('guestSearch', '');
    setValue('guestName', '');
    setValue('guestPhone', '');
    setValue('guestEmail', '');
  };

  const onSubmit = (data: any) => {
    const formattedOccupants = `${data.adults} Ad${
      data.children > 0 ? `, ${data.children} Niñ` : ''
    }`;

    const newRes: Reservation = {
      id: `RS-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: data.guestName,
      guestPhone: data.guestPhone || '',
      guestEmail: data.guestEmail || '',
      roomType: data.roomType,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      adults: Number(data.adults),
      children: Number(data.children),
      occupants: formattedOccupants,
      amount: data.amount,
      status: data.status,
    };

    onSave(newRes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d2926]/60 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl border border-[#e5ded0] w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col z-10">
        {/* Encabezado */}
        <div className="p-6 border-b border-[#e5ded0] flex items-center justify-between sticky top-0 bg-white z-20">
          <div>
            <span className="text-xs font-mono font-bold text-[#c0a060] uppercase tracking-wider">
              Nueva Reservación
            </span>
            <h3 className="text-xl font-serif font-bold text-[#2d2926]">
              Registrar Reserva
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
          {/* SECCIÓN DE BÚSQUEDA DE HUÉSPED EXISTENTE */}
          <div className="bg-[#f7f4ed] p-4 rounded-xl border border-[#e5ded0]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[#5a524c]">
                Buscar Huésped Registrado
              </span>
              {isExistingGuest && (
                <button
                  type="button"
                  onClick={handleResetGuestSelection}
                  className="text-xs font-bold text-[#d95d39] hover:underline flex items-center gap-1"
                >
                  ✕ Cambiar cliente / Crear nuevo
                </button>
              )}
            </div>

            <Controller
              name="guestSearch"
              control={control}
              render={({ field }) => (
                <SearchableSelect
                  placeholder="Escribe el nombre o teléfono del cliente..."
                  options={guestSearchOptions}
                  value={field.value || ''}
                  onChange={(val, selectedOption) => {
                    field.onChange(val);
                    if (selectedOption?.rawItem) {
                      const guest: Guest = selectedOption.rawItem;
                      setValue('guestName', guest.name);
                      setValue('guestPhone', guest.phone);
                      setValue('guestEmail', guest.email);
                      setIsExistingGuest(true); // Bloquea los campos
                    }
                  }}
                  maxResults={5}
                />
              )}
            />
            <p className="text-[11px] text-[#5a524c] mt-1.5">
              Si el cliente ya existe, selecciónalo de la lista. Si es un cliente nuevo, omite este buscador y llena los campos de abajo.
            </p>
          </div>

          {/* DATOS DEL HUÉSPED (BLOQUEADOS SI ES EXISTENTE, EDITABLES SI ES NUEVO) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Nombre del Huésped <span className="text-[#d95d39]">*</span>
              </label>
              <input
                type="text"
                disabled={isExistingGuest}
                {...register('guestName', { required: 'El nombre es obligatorio' })}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
                  isExistingGuest
                    ? 'bg-gray-100/80 border border-[#e5ded0] text-[#5a524c] font-semibold cursor-not-allowed'
                    : 'bg-[#f7f4ed]/50 border border-[#e5ded0] text-[#2d2926] focus:outline-none focus:border-[#c0a060]'
                }`}
              />
              {errors.guestName && (
                <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                  {errors.guestName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Teléfono de Contacto <span className="text-[#d95d39]">*</span>
              </label>
              <input
                type="text"
                disabled={isExistingGuest}
                placeholder="Ej. 901-233-6770"
                {...register('guestPhone', { required: 'El teléfono es obligatorio' })}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-mono transition-colors ${
                  isExistingGuest
                    ? 'bg-gray-100/80 border border-[#e5ded0] text-[#5a524c] font-semibold cursor-not-allowed'
                    : 'bg-[#f7f4ed]/50 border border-[#e5ded0] text-[#2d2926] focus:outline-none focus:border-[#c0a060]'
                }`}
              />
              {errors.guestPhone && (
                <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                  {errors.guestPhone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5a524c] mb-1">
              Correo Electrónico <span className="text-[#d95d39]">*</span>
            </label>
            <input
              type="email"
              disabled={isExistingGuest}
              placeholder="ejemplo@correo.com"
              {...register('guestEmail', { required: 'El correo electrónico es obligatorio' })}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
                isExistingGuest
                  ? 'bg-gray-100/80 border border-[#e5ded0] text-[#5a524c] font-semibold cursor-not-allowed'
                  : 'bg-[#f7f4ed]/50 border border-[#e5ded0] text-[#2d2926] focus:outline-none focus:border-[#c0a060]'
              }`}
            />
            {errors.guestEmail && (
              <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                {errors.guestEmail.message}
              </p>
            )}
          </div>

          {/* HABITACIÓN Y ESTADO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Tipo de Habitación <span className="text-[#d95d39]">*</span>
              </label>
              <select
                {...register('roomType', { required: 'Selecciona una habitación' })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              >
                {roomOptions.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Estado Inicial <span className="text-[#d95d39]">*</span>
              </label>
              <select
                {...register('status', { required: 'Selecciona un estado' })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              >
                <option value="Confirmado">Confirmado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Checked-in">Checked-in</option>
              </select>
            </div>
          </div>

          {/* FECHAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Check-In <span className="text-[#d95d39]">*</span>
              </label>
              <input
                type="date"
                {...register('checkIn', { required: 'Fecha requerida' })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Check-Out <span className="text-[#d95d39]">*</span>
              </label>
              <input
                type="date"
                {...register('checkOut', { required: 'Fecha requerida' })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              />
            </div>
          </div>

          {/* OCUPANTES Y MONTO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Adultos <span className="text-[#d95d39]">*</span>
              </label>
              <select
                {...register('adults', { valueAsNumber: true })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Niños
              </label>
              <select
                {...register('children', { valueAsNumber: true })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              >
                {[0, 1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Monto ($ MXN) <span className="text-[#d95d39]">*</span>
              </label>
              <input
                type="text"
                placeholder="$1,350 MXN"
                {...register('amount', { required: 'El monto es obligatorio' })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              />
            </div>
          </div>

          {/* BOTONES */}
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
              className="px-6 py-2.5 rounded-xl bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold transition-all shadow-sm tracking-wider uppercase disabled:opacity-50"
            >
              Guardar Reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}