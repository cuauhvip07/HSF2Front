'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Guest } from './GuestTable';
import SearchableSelect, { Option } from '@/components/ui/SearchableSelect';
import { mockCountries, mockGuests } from './guestData';

interface ExtendedGuest extends Guest {
  phoneCode?: string;
  countryId?: string;
}

interface EditGuestModalProps {
  isOpen: boolean;
  guest: ExtendedGuest | null;
  onClose: () => void;
  onSave: (updatedGuest: ExtendedGuest) => void;
  existingGuests?: Guest[];
}

const phoneCodeOptions = mockCountries.map((c) => ({
  id: c.id,
  label: `${c.code} (${c.name})`,
  value: c.code,
}));

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
  existingGuests = mockGuests, 
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

  // Generación dinámica de opciones de teléfono
  const phoneSearchOptions: Option[] = existingGuests.map((g) => ({
    id: g.id,
    label: g.phone,
    subLabel: `${g.name} (${g.email})`,
    value: g.phone,
    rawItem: g,
  }));

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
            {errors.name && (
              <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                {errors.name.message}
              </p>
            )}
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
            {errors.email && (
              <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* LADA Y BÚSQUEDA DE TELÉFONO */}
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
              <Controller
                name="phone"
                control={control}
                rules={{ required: 'Teléfono obligatorio' }}
                render={({ field }) => (
                  <SearchableSelect
                    label="Número Telefónico"
                    placeholder="Escribe para buscar (ej. 901)..."
                    options={phoneSearchOptions}
                    value={field.value || ''}
                    onChange={(val, selectedOption) => {
                      field.onChange(val);
                      // Auto-completar nombre y correo si se selecciona un registro del mock
                      if (selectedOption?.rawItem) {
                        const selectedGuest: Guest = selectedOption.rawItem;
                        control._fields.name && control.register('name');
                        control._fields.email && control.register('email');
                      }
                    }}
                    error={errors.phone?.message}
                    maxResults={3}
                  />
                )}
              />
            </div>
          </div>

          {/* NACIONALIDAD AUTOCOMPLETADO */}
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
                  onChange={(val) => field.onChange(val)}
                  error={errors.nationality?.message}
                  maxResults={5}
                />
              )}
            />
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