'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Guest } from './GuestTable';
import SearchableSelect, { Option } from '@/components/ui/SearchableSelect';
import { mockCountries, mockGuests, mockStates } from './guestData';

export interface EditGuestFormData {
  firstName: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  phoneCode: string;
  phone: string;
  street: string;
  exteriorNumber: string;
  interiorNumber?: string;
  postalCode: string;
  municipality: string;
  state: string;
  country: string;
}

interface ExtendedGuest extends Guest {
  phoneCode?: string;
  countryId?: string;
  firstName?: string;
  paternalLastName?: string;
  maternalLastName?: string;
  street?: string;
  exteriorNumber?: string;
  interiorNumber?: string;
  postalCode?: string;
  municipality?: string;
  state?: string;
}

interface EditGuestModalProps {
  isOpen: boolean;
  guest: ExtendedGuest | null;
  onClose: () => void;
  onSave: (updatedGuest: Guest) => void;
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

const stateOptions = mockStates.map((s) => ({
  id: s.id,
  label: s.name,
  value: s.name,
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
  } = useForm<EditGuestFormData>({
    defaultValues: {
      phoneCode: '+52',
      country: 'México',
      state: 'Ciudad de México',
    },
  });

  useEffect(() => {
    if (guest) {
      const nameParts = (guest.name || '').trim().split(' ');
      const defaultFirstName = guest.firstName || nameParts[0] || '';
      const defaultPaternal = guest.paternalLastName || nameParts[1] || '';
      const defaultMaternal = guest.maternalLastName || nameParts.slice(2).join(' ') || '';

      const cleanPhone = guest.phone ? guest.phone.replace(/^\+\d+\s*/, '') : '';

      reset({
        firstName: defaultFirstName,
        paternalLastName: defaultPaternal,
        maternalLastName: defaultMaternal,
        email: guest.email || '',
        phoneCode: guest.phoneCode || '+52',
        phone: cleanPhone,
        street: guest.street || '',
        exteriorNumber: guest.exteriorNumber || '',
        interiorNumber: guest.interiorNumber || '',
        postalCode: guest.postalCode || '',
        municipality: guest.municipality || '',
        state: guest.state || 'Ciudad de México',
        country: guest.nationality || 'México',
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

  const phoneSearchOptions: Option[] = existingGuests.map((g) => ({
    id: g.id,
    label: g.phone,
    subLabel: `${g.name} (${g.email})`,
    value: g.phone,
    rawItem: g,
  }));

  const onSubmit = async (data: EditGuestFormData) => {
    const fullName = `${data.firstName} ${data.paternalLastName} ${data.maternalLastName}`.trim();

    // 🌟 Definición limpia y segura de updatedGuest usando guest prop
    const updatedGuestRecord: Guest = {
      ...guest,
      name: fullName,
      email: data.email,
      phone: `${data.phoneCode} ${data.phone}`,
      nationality: data.country,
      ...(data as unknown as Partial<Guest>),
    };

    onSave(updatedGuestRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d2926]/60 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl border border-[#e5ded0] w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col z-10">
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

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-6">
          {/* INFORMACIÓN PERSONAL */}
          <div>
            <h4 className="text-xs font-bold text-[#c0a060] uppercase tracking-wider mb-3">
              Información Personal
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                  Nombre(s) <span className="text-[#d95d39]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej. María"
                  {...register('firstName', {
                    required: 'El nombre es obligatorio',
                    minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                  })}
                  className={`w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border rounded-xl text-sm text-[#2d2926] focus:outline-none transition-colors ${
                    errors.firstName ? 'border-[#d95d39]' : 'border-[#e5ded0] focus:border-[#c0a060]'
                  }`}
                />
                {errors.firstName && (
                  <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                  Apellido Paterno <span className="text-[#d95d39]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej. González"
                  {...register('paternalLastName', {
                    required: 'El apellido paterno es obligatorio',
                  })}
                  className={`w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border rounded-xl text-sm text-[#2d2926] focus:outline-none transition-colors ${
                    errors.paternalLastName ? 'border-[#d95d39]' : 'border-[#e5ded0] focus:border-[#c0a060]'
                  }`}
                />
                {errors.paternalLastName && (
                  <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                    {errors.paternalLastName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                  Apellido Materno <span className="text-[#d95d39]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej. López"
                  {...register('maternalLastName', {
                    required: 'El apellido materno es obligatorio',
                  })}
                  className={`w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border rounded-xl text-sm text-[#2d2926] focus:outline-none transition-colors ${
                    errors.maternalLastName ? 'border-[#d95d39]' : 'border-[#e5ded0] focus:border-[#c0a060]'
                  }`}
                />
                {errors.maternalLastName && (
                  <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                    {errors.maternalLastName.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* CONTACTO */}
          <div>
            <h4 className="text-xs font-bold text-[#c0a060] uppercase tracking-wider mb-3">
              Datos de Contacto
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                  Correo Electrónico <span className="text-[#d95d39]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  {...register('email', {
                    required: 'El correo es obligatorio',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Correo electrónico inválido',
                    },
                  })}
                  className={`w-full px-3.5 py-2.5 bg-[#f7f4ed]/50 border rounded-xl text-sm text-[#2d2926] focus:outline-none transition-colors ${
                    errors.email ? 'border-[#d95d39]' : 'border-[#e5ded0] focus:border-[#c0a060]'
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

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

              <div>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: 'El número de teléfono es obligatorio',
                    minLength: {
                      value: 7,
                      message: 'Ingresa al menos 7 dígitos',
                    },
                  }}
                  render={({ field }) => (
                    <SearchableSelect
                      label="Número Telefónico"
                      placeholder="Escribe el número (ej. 901)..."
                      options={phoneSearchOptions}
                      value={field.value || ''}
                      onChange={(val) => field.onChange(val)}
                      error={errors.phone?.message}
                      maxResults={3}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* DIRECCIÓN PARTICULAR */}
          <div>
            <h4 className="text-xs font-bold text-[#c0a060] uppercase tracking-wider mb-3">
              Dirección Particular
            </h4>
            <div className="flex flex-col gap-4 bg-[#f7f4ed]/30 p-4 rounded-xl border border-[#e5ded0]">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                    Calle <span className="text-[#d95d39]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Av. Reforma"
                    {...register('street', { required: 'La calle es obligatoria' })}
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-[#2d2926] focus:outline-none transition-colors ${
                      errors.street ? 'border-[#d95d39]' : 'border-[#e5ded0] focus:border-[#c0a060]'
                    }`}
                  />
                  {errors.street && (
                    <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                      {errors.street.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                    N° Exterior <span className="text-[#d95d39]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    {...register('exteriorNumber', { required: 'N° ext obligatorio' })}
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-[#2d2926] focus:outline-none transition-colors ${
                      errors.exteriorNumber ? 'border-[#d95d39]' : 'border-[#e5ded0] focus:border-[#c0a060]'
                    }`}
                  />
                  {errors.exteriorNumber && (
                    <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                      {errors.exteriorNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                    N° Interior
                  </label>
                  <input
                    type="text"
                    placeholder="Piso 4-A (Opcional)"
                    {...register('interiorNumber')}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e5ded0] rounded-xl text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                    Código Postal <span className="text-[#d95d39]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="06600"
                    {...register('postalCode', {
                      required: 'El C.P. es obligatorio',
                      pattern: {
                        value: /^[0-9]{4,10}$/,
                        message: 'Código postal inválido',
                      },
                    })}
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm font-mono text-[#2d2926] focus:outline-none transition-colors ${
                      errors.postalCode ? 'border-[#d95d39]' : 'border-[#e5ded0] focus:border-[#c0a060]'
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5a524c] mb-1">
                    Municipio / Alcaldía <span className="text-[#d95d39]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Cuauhtémoc"
                    {...register('municipality', { required: 'Municipio requerido' })}
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-[#2d2926] focus:outline-none transition-colors ${
                      errors.municipality ? 'border-[#d95d39]' : 'border-[#e5ded0] focus:border-[#c0a060]'
                    }`}
                  />
                  {errors.municipality && (
                    <p className="text-[11px] text-[#d95d39] mt-1 font-medium">
                      {errors.municipality.message}
                    </p>
                  )}
                </div>

                <div>
                  <Controller
                    name="state"
                    control={control}
                    rules={{ required: 'El estado es obligatorio' }}
                    render={({ field }) => (
                      <SearchableSelect
                        label="Estado / Provincia"
                        placeholder="Buscar o escribir nuevo..."
                        options={stateOptions}
                        value={field.value || ''}
                        onChange={(val) => field.onChange(val)}
                        error={errors.state?.message}
                        maxResults={4}
                      />
                    )}
                  />
                </div>

                <div>
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: 'El país es obligatorio' }}
                    render={({ field }) => (
                      <SearchableSelect
                        label="País"
                        placeholder="Buscar país..."
                        options={countryOptions}
                        value={field.value || ''}
                        onChange={(val) => field.onChange(val)}
                        error={errors.country?.message}
                        maxResults={4}
                      />
                    )}
                  />
                </div>
              </div>
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