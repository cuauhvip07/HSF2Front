'use client';

import Link from "next/link";

export interface PaymentData {
  method: 'card' | 'mercadopago' | 'spei';
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
  termsAccepted: boolean;
}

interface PaymentMethodFormProps {
  paymentData: PaymentData;
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  totalAmount: string;
}

export default function PaymentMethodForm({
  paymentData,
  onChange,
  onSubmit,
  isSubmitting = false,
  totalAmount,
}: PaymentMethodFormProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#e5ded0] shadow-sm flex flex-col gap-5">
      <h2 className="text-xl font-serif font-bold text-[#2d2926] border-b border-[#e5ded0] pb-3">
        Método de Pago
      </h2>

      {/* Selector de Método */}
      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => onChange('method', 'card')}
          className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
            paymentData.method === 'card'
              ? 'border-[#c0a060] bg-[#f7f4ed] text-[#2d2926] shadow-sm'
              : 'border-[#e5ded0] text-[#5a524c] hover:bg-[#f7f4ed]/50'
          }`}
        >
          <span>💳 Tarjeta</span>
        </button>

        <button
          type="button"
          onClick={() => onChange('method', 'mercadopago')}
          className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
            paymentData.method === 'mercadopago'
              ? 'border-[#c0a060] bg-[#f7f4ed] text-[#2d2926] shadow-sm'
              : 'border-[#e5ded0] text-[#5a524c] hover:bg-[#f7f4ed]/50'
          }`}
        >
          <span>🤝 Mercado Pago</span>
        </button>

        <button
          type="button"
          onClick={() => onChange('method', 'spei')}
          className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
            paymentData.method === 'spei'
              ? 'border-[#c0a060] bg-[#f7f4ed] text-[#2d2926] shadow-sm'
              : 'border-[#e5ded0] text-[#5a524c] hover:bg-[#f7f4ed]/50'
          }`}
        >
          <span>🏦 SPEI / Transf.</span>
        </button>
      </div>

      {/* Formulario de Tarjeta */}
      {paymentData.method === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#5a524c] uppercase tracking-wider mb-1">
              Número de Tarjeta
            </label>
            <input
              type="text"
              maxLength={19}
              value={paymentData.cardNumber}
              onChange={(e) => onChange('cardNumber', e.target.value)}
              placeholder="0000 0000 0000 0000"
              className="w-full px-3.5 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5a524c] uppercase tracking-wider mb-1">
              Nombre en la Tarjeta
            </label>
            <input
              type="text"
              value={paymentData.cardName}
              onChange={(e) => onChange('cardName', e.target.value)}
              placeholder="COMO APARECE EN LA TARJETA"
              className="w-full px-3.5 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-[#5a524c] uppercase tracking-wider mb-1">
                Vencimiento
              </label>
              <input
                type="text"
                placeholder="MM/AA"
                maxLength={5}
                value={paymentData.expiry}
                onChange={(e) => onChange('expiry', e.target.value)}
                className="w-full px-3 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#5a524c] uppercase tracking-wider mb-1">
                CVC / CVV
              </label>
              <input
                type="password"
                placeholder="123"
                maxLength={4}
                value={paymentData.cvc}
                onChange={(e) => onChange('cvc', e.target.value)}
                className="w-full px-3 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-sm text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Términos y Condiciones */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          id="terms"
          checked={paymentData.termsAccepted}
          onChange={(e) => onChange('termsAccepted', e.target.checked)}
          className="rounded border-[#e5ded0] text-[#d95d39] focus:ring-[#d95d39]"
        />
        <label htmlFor="terms" className="text-xs text-[#5a524c] cursor-pointer">
          Acepto los <Link href="/terminos-y-condiciones" className="underline font-semibold text-[#2d2926]">términos y condiciones</Link> de cancelación y reserva del hotel.
        </label>
      </div>

      {/* Botón de Pago Principal */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting || !paymentData.termsAccepted}
        className="w-full bg-[#d95d39] hover:bg-[#c44f2e] disabled:opacity-50 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md uppercase tracking-wider flex items-center justify-center gap-2 mt-2 cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        {isSubmitting ? 'Procesando Reserva...' : `PAGAR Y CONFIRMAR RESERVA (${totalAmount})`}
      </button>
    </div>
  );
}