'use client';

export interface GuestDetailsData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface GuestDetailsFormProps {
  formData: GuestDetailsData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function GuestDetailsForm({ formData, onChange }: GuestDetailsFormProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#e5ded0] shadow-sm flex flex-col gap-5">
      <h2 className="text-xl font-serif font-bold text-[#2d2926] border-b border-[#e5ded0] pb-3">
        Detalles del Huésped
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre Completo */}
        <div>
          <label className="block text-xs font-semibold text-[#5a524c] uppercase tracking-wider mb-1">
            Nombre Completo *
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={onChange}
            placeholder="Ej. Juan Pérez González"
            className="w-full px-3.5 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060] transition-colors"
          />
        </div>

        {/* Correo Electrónico */}
        <div>
          <label className="block text-xs font-semibold text-[#5a524c] uppercase tracking-wider mb-1">
            Correo Electrónico *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={onChange}
            placeholder="ejemplo@correo.com"
            className="w-full px-3.5 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060] transition-colors"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-xs font-semibold text-[#5a524c] uppercase tracking-wider mb-1">
            Teléfono *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={onChange}
            placeholder="55 1234 5678"
            className="w-full px-3.5 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060] transition-colors"
          />
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-xs font-semibold text-[#5a524c] uppercase tracking-wider mb-1">
            Dirección
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Calle y número"
            className="w-full px-3.5 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060] transition-colors"
          />
        </div>

        {/* Ciudad */}
        <div>
          <label className="block text-xs font-semibold text-[#5a524c] uppercase tracking-wider mb-1">
            Ciudad
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            placeholder="Ciudad de México"
            className="w-full px-3.5 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060] transition-colors"
          />
        </div>

        {/* Estado y Código Postal */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-[#5a524c] uppercase tracking-wider mb-1">
              Estado
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChange}
              placeholder="Puebla"
              className="w-full px-3 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#5a524c] uppercase tracking-wider mb-1">
              C.P.
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={onChange}
              placeholder="73300"
              className="w-full px-3 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060] transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}