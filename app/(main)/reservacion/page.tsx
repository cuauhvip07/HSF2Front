'use client';

import { useState } from 'react';
import GuestDetailsForm, { GuestDetailsData } from '@/components/user/reservation/GuestDetailsForm';
import PaymentMethodForm, { PaymentData } from '@/components/user/reservation/PaymentMethodForm';
import ReservationSummary, { SelectedRoom } from '@/components/user/reservation/ReservationSummary';

export default function ReservationPage() {
  const [guestDetails, setGuestDetails] = useState<GuestDetailsData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: 'card',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
    termsAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Datos mock de habitaciones seleccionadas por el usuario
  const selectedRooms: SelectedRoom[] = [
    {
      id: '1',
      name: 'Suite Presidencial',
      capacity: '2 Ad, 1 Niñ',
      nightlyRate: 2400,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=150&q=80',
      quantity: 1,
    },
  ];

  const nights = 4;
  const checkIn = '20 Oct 2026';
  const checkOut = '24 Oct 2026';

  // Cálculos automáticos
  const subtotal = selectedRooms.reduce((acc, room) => acc + room.nightlyRate * room.quantity, 0) * nights;
  const iva = subtotal * 0.16;
  const ish = subtotal * 0.03;
  const total = subtotal + iva + ish;

  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setGuestDetails({ ...guestDetails, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (field: string, value: any) => {
    setPaymentData({ ...paymentData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulación de respuesta de pago
    setTimeout(() => {
      setIsSubmitting(false);
      alert('¡Reserva confirmada con éxito! Revisa tu correo electrónico.');
    }, 2000);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

  return (
    <div className="min-h-screen bg-[#f7f4ed] py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-[#2d2926] mb-8">
          Checkout de Reserva
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda: Formulario (2 columnas en desktop) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <GuestDetailsForm formData={guestDetails} onChange={handleGuestChange} />
            <PaymentMethodForm
              paymentData={paymentData}
              onChange={handlePaymentChange}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              totalAmount={formatCurrency(total)}
            />
          </div>

          {/* Columna Derecha: Resumen de Reserva */}
          <div>
            <ReservationSummary
              checkIn={checkIn}
              checkOut={checkOut}
              nights={nights}
              rooms={selectedRooms}
              subtotal={subtotal}
              iva={iva}
              ish={ish}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}