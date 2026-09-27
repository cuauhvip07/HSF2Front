'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Guest } from './GuestTable';
import SearchableSelect from '@/components/ui/SearchableSelect';
import { mockCountries } from './guestData';

interface ExtendedGuest extends Guest {
  phoneCode?: string;
  countryId?: string;
}

interface EditGuestModalProps {
  isOpen: boolean;
  guest: ExtendedGuest | null;
  onClose: () => void;
  onSave: (updatedGuest: ExtendedGuest) => void;
}

const guestTypes = ['Nuevo', 'Frecuente', 'VIP'];

// Opciones de ladas formateadas
const phoneCodeOptions = mockCountries.map((c) => ({
  id: c.id,
  label: `${c.code} (${c.name})`,
  value: c.code,
}));

// Opciones de países formateadas
const countryOptions = mockCountries.map((c) => ({
  id: c.id,
  label: c.name,
  value: c.name,
}));

export default function EditGuestModal({
  isOpen,
  guest,
  onClose,
  onSave,
}: EditGuestModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExtendedGuest>();

  useEffect(() => {
    if (guest) {
      reset({
        ...guest,
        phoneCode: guest.phoneCode || '+52',
        countryId: guest.countryId || 'MX',
      });
    }
  }, [guest, reset]);

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

  if (!isOpen || !guest) return null;

  const onSubmit = (data: ExtendedGuest) => {
    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d2926]/60 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl border border-[#e5ded0] w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col z-10">
        <div className="p-6 border-b border-[#e5ded0] flex items-center justify-between sticky top-0 bg-white z-20">
          <div>
            <span className="text-xs font-mono font-bold text-[#c0a060] uppercase tracking-wider">
              ID Huésped: #{guest.id}
            </span>
            <h3 className="text-xl font-serif font-bold text-[#2d2926]">
              Editar Datos del Huésped
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
          {/* Nombre completo */}
          <div>
            <label className="block text-xs font-semibold text-[#5a524c] mb-1">
              Nombre Completo <span className="text-[#d95d39]">*</span>
            </label>
            <input
              type="text"
              {...register('name', { required: 'El nombre es obligatorio' })}
              className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[#5a524c] mb-1">
              Correo Electrónico <span className="text-[#d95d39]">*</span>
            </label>
            <input
              type="email"
              {...register('email', { required: 'El correo es obligatorio' })}
              className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
            />
          </div>

          {/* LADA Y TELÉFONO BÚSQUEDA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Controller
                name="phoneCode"
                control={control}
                rules={{ required: 'Lada requerida' }}
                render={({ field }) => (
                  <SearchableSelect
                    label="Lada Ext."
                    placeholder="+52"
                    options={phoneCodeOptions}
                    value={field.value || ''}
                    onChange={(val) => field.onChange(val)}
                    error={errors.phoneCode?.message}
                    maxResults={3}
                  />
                )}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Número Telefónico <span className="text-[#d95d39]">*</span>
              </label>
              <input
                type="text"
                {...register('phone', { required: 'Teléfono obligatorio' })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              />
            </div>
          </div>

          {/* NACIONALIDAD AUTOCOMPLETADO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Controller
                name="nationality"
                control={control}
                rules={{ required: 'La nacionalidad es obligatoria' }}
                render={({ field }) => (
                  <SearchableSelect
                    label="Nacionalidad"
                    placeholder="Escribe para buscar (ej. México)..."
                    options={countryOptions}
                    value={field.value || ''}
                    onChange={(val, countryId) => {
                      field.onChange(val);
                      // Guardar id del país si está disponible
                      if (countryId) {
                        control._fields.countryId?._f && control.register('countryId');
                      }
                    }}
                    error={errors.nationality?.message}
                    maxResults={5}
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                Tipo de Huésped <span className="text-[#d95d39]">*</span>
              </label>
              <select
                {...register('type', { required: 'Selecciona una categoría' })}
                className="w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              >
                {guestTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
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
              className="px-6 py-2.5 rounded-xl bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold transition-all shadow-sm tracking-wider uppercase"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}