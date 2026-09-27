'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Reservation } from './ReservationTable';

interface EditReservationModalProps {
  isOpen: boolean;
  reservation: Reservation | null;
  onClose: () => void;
  onSave: (updatedReservation: Reservation) => void;
}

const statusOptions: Reservation['status'][] = [
  'Confirmado',
  'Checked-in',
  'Pendiente',
  'Cancelado',
];

const roomOptions = [
  'Habitación Doble',
  'Habitación Doble Sencilla',
  'Habitación Cuádruple',
  'Habitación Triple Familiar',
];

export default function EditReservationModal({
  isOpen,
  reservation,
  onClose,
  onSave,
}: EditReservationModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Reservation>();

  useEffect(() => {
    if (reservation) {
      reset({ ...reservation });
    }
  }, [reservation, reset]);

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

  if (!isOpen || !reservation) return null;

  const onSubmit = (data: Reservation) => {
    const formattedOccupants = `${data.adults} Ad${
      data.children > 0 ? `, ${data.children} Niñ` : ''
    }`;

    onSave({
      ...data,
      adults: Number(data.adults),
      children: Number(data.children),
      occupants: formattedOccupants,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d2926]/60 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl border border-[#e5ded0] w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col z-10">
        <div className="p-6 border-b border-[#e5ded0] flex items-center justify-between sticky top-0 bg-white z-20">
          <div>
            <span className="text-xs font-mono font-bold text-[#c0a060] uppercase tracking-wider">
              Editar Folio: {reservation.id}
            </span>
            <h3 className="text-xl font-serif font-bold text-[#2d2926]">
              Modificar Reservación
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
          {/* INFORMACIÓN DEL HUÉSPED BLOQUEADA PARA EDICIÓN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f7f4ed]/60 p-4 rounded-xl border border-[#e5ded0]">
            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Nombre del Huésped (Solo lectura)
              </label>
              <input
                type="text"
                {...register('guestName')}
                disabled
                className="w-full px-3.5 py-2.5 bg-white/70 border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#5a524c] cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Teléfono de Contacto (Solo lectura)
              </label>
              <input
                type="text"
                {...register('guestPhone')}
                disabled
                placeholder="Sin teléfono registrado"
                className="w-full px-3.5 py-2.5 bg-white/70 border border-[#e5ded0] rounded-xl text-sm font-mono text-[#5a524c] cursor-not-allowed"
              />
            </div>
          </div>

          {/* Habitación y Estado */}
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
                Estado de la Reserva <span className="text-[#d95d39]">*</span>
              </label>
              <select
                {...register('status', { required: 'Selecciona un estado' })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              >
                {statusOptions.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fechas Check-In y Check-Out */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Fecha Check-In <span className="text-[#d95d39]">*</span>
              </label>
              <input
                type="date"
                {...register('checkIn', { required: 'La fecha de entrada es obligatoria' })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Fecha Check-Out <span className="text-[#d95d39]">*</span>
              </label>
              <input
                type="date"
                {...register('checkOut', { required: 'La fecha de salida es obligatoria' })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              />
            </div>
          </div>

          {/* Ocupantes y Monto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Adultos <span className="text-[#d95d39]">*</span>
              </label>
              <select
                {...register('adults', { valueAsNumber: true })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Adulto' : 'Adultos'}
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
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Niño' : 'Niños'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Monto Total <span className="text-[#d95d39]">*</span>
              </label>
              <input
                type="text"
                placeholder="Ej. $1,350 MXN"
                {...register('amount', { required: 'El monto total es obligatorio' })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              />
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
              className="px-6 py-2.5 rounded-xl bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold transition-all shadow-sm tracking-wider uppercase disabled:opacity-50"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}