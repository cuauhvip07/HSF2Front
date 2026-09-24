'use client';

import Link from 'next/link';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#f7f4ed] py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#e5ded0] p-6 md:p-10 shadow-sm">
        
        {/* Encabezado */}
        <div className="border-b border-[#e5ded0] pb-6 mb-8 text-center md:text-left">
          <span className="text-xs font-semibold tracking-widest text-[#c0a060] uppercase font-sans">
            Información Legal y Normativa
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#2d2926] mt-1">
            Políticas de Reserva, Cancelación y Hospedaje
          </h1>
          <p className="text-sm text-[#5a524c] mt-2 font-medium">
            Hotel Santa Fe Chignahuapan
          </p>
        </div>

        {/* Contenido de Políticas */}
        <div className="flex flex-col gap-8 text-[#2d2926] text-sm leading-relaxed">
          
          {/* Sección 1 */}
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-serif font-bold text-[#2d2926] flex items-center gap-2">
              <span className="text-[#c0a060] font-sans">1.</span> Políticas de Reserva y Pago
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2 text-[#5a524c]">
              <li>
                <strong className="text-[#2d2926]">Garantía de Reserva:</strong> Para confirmar y garantizar la reservación, se requiere el pago del 100% (o un anticipo del 50%, según la tarifa seleccionada) mediante transferencia, tarjeta de crédito o débito al momento de realizar la reserva.
              </li>
              <li>
                <strong className="text-[#2d2926]">Confirmación:</strong> La reserva quedará confirmada únicamente tras la recepción del comprobante de pago o la aprobación de la transacción bancaria.
              </li>
            </ul>
          </section>

          {/* Sección 2 */}
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-serif font-bold text-[#2d2926] flex items-center gap-2">
              <span className="text-[#c0a060] font-sans">2.</span> Políticas de Cancelación y Reembolso
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2 text-[#5a524c]">
              <li>
                <strong className="text-[#2d2926]">Cancelaciones con más de 7 días de anticipación (1 semana):</strong> Si el cliente solicita la cancelación con un mínimo de 7 días naturales de anticipación a la fecha de entrada (Check-in), se otorgará un reembolso del 100% del monto pagado (o el monto restante tras deducir cargos administrativos por procesamiento bancario si aplican).
              </li>
              <li>
                <strong className="text-[#2d2926]">Cancelaciones con menos de 7 días de anticipación:</strong> Cancelaciones realizadas con menos de 7 días de anticipación a la fecha de llegada no aplicarán para ningún tipo de reembolso ni devolución monetaria.
              </li>
              <li>
                <strong className="text-[#2d2926]">No Presentarse (No-Show):</strong> Si el huésped no se presenta en la fecha de llegada confirmada sin previo aviso, la reserva se cancelará automáticamente, cobrándose la totalidad de la estancia y sin posibilidad de reembolso ni reprogramación.
              </li>
              <li>
                <strong className="text-[#2d2926]">Salidas Anticipadas:</strong> Las salidas antes de la fecha programada (Check-out anticipado) no serán sujetas a reembolso ni crédito a favor.
              </li>
            </ul>
          </section>

          {/* Sección 3 */}
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-serif font-bold text-[#2d2926] flex items-center gap-2">
              <span className="text-[#c0a060] font-sans">3.</span> Check-in y Check-out
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2 text-[#5a524c]">
              <li>
                <strong className="text-[#2d2926]">Horario de Check-in (Entrada):</strong> A partir de las 15:00 hrs.
              </li>
              <li>
                <strong className="text-[#2d2926]">Horario de Check-out (Salida):</strong> Hasta las 12:00 hrs.
              </li>
              <li>
                <strong className="text-[#2d2926]">Identificación Oficial:</strong> Es obligatorio presentar una identificación oficial vigente con fotografía (INE o Pasaporte) de todos los huéspedes adultos al momento del registro.
              </li>
              <li>
                <strong className="text-[#2d2926]">Salida Tardía (Late Check-out):</strong> Sujeta a disponibilidad y con un costo adicional por hora o equivalente a una noche de estancia extra.
              </li>
            </ul>
          </section>

          {/* Sección 4 */}
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-serif font-bold text-[#2d2926] flex items-center gap-2">
              <span className="text-[#c0a060] font-sans">4.</span> Depósito de Garantía y Daños
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2 text-[#5a524c]">
              <li>
                <strong className="text-[#2d2926]">Depósito de Seguridad:</strong> Al momento del Check-in, se podrá solicitar un depósito de garantía (en efectivo o bloqueo en tarjeta de crédito) para cubrir posibles consumos extras o daños a la propiedad.
              </li>
              <li>
                <strong className="text-[#2d2926]">Daños o Faltantes:</strong> El huésped titular será responsable por cualquier daño, avería o extravío de bienes y equipamiento de la habitación causado durante su estancia, autorizando al hotel a realizar el cobro correspondiente.
              </li>
            </ul>
          </section>

          {/* Sección 5 */}
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-serif font-bold text-[#2d2926] flex items-center gap-2">
              <span className="text-[#c0a060] font-sans">5.</span> Reglas Generales del Hotel
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2 text-[#5a524c]">
              <li>
                <strong className="text-[#2d2926]">Capacidad Máxima:</strong> No se permite rebasar la capacidad máxima de personas asignada a cada tipo de habitación. En caso de personas extras no declaradas, se cobrará una tarifa adicional o se denegará el acceso.
              </li>
              <li>
                <strong className="text-[#2d2926]">Límites de Ruido y Convivencia:</strong> Con el fin de garantizar el descanso de todos los huéspedes, queda estrictamente prohibido el ruido excesivo, música alta o fiestas después de las 22:00 hrs.
              </li>
              <li>
                <strong className="text-[#2d2926]">Fumar:</strong> Por disposición legal y para comodidad de todos, está strictly prohibido fumar dentro de las habitaciones y áreas cerradas. Quien infrinja esta norma se hará acreedor a un cargo por limpieza profunda y sanitización.
              </li>
              <li>
                <strong className="text-[#2d2926]">Objetos de Valor:</strong> El hotel no se hace responsable por objetos de valor o dinero en efectivo dejados en las habitaciones fuera de las cajas de seguridad destinadas para ello.
              </li>
            </ul>
          </section>

          {/* Sección 6 */}
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-serif font-bold text-[#2d2926] flex items-center gap-2">
              <span className="text-[#c0a060] font-sans">6.</span> Fuerza Mayor
            </h2>
            <p className="text-[#5a524c] pl-5">
              En casos fortuitos o de fuerza mayor (desastres naturales, contingencias sanitarias, fallas graves en servicios públicos ajenos al establecimiento), el hotel se reserva el derecho de ofrecer la reprogramación de las fechas de estancia sujetas a disponibilidad, sin que esto implique reembolsos directos en efectivo.
            </p>
          </section>

        </div>

        {/* Pie de página con botón para volver a la reserva */}
        <div className="border-t border-[#e5ded0] pt-6 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#988f86]">
            Última actualización: Septiembre 2026
          </p>
          <Link
            href="/reservar"
            className="bg-[#2d2926] hover:bg-[#383330] text-[#e5ded0] text-xs font-bold px-6 py-2.5 rounded-xl transition-all uppercase tracking-wider"
          >
            Volver al Checkout
          </Link>
        </div>

      </div>
    </div>
  );
}