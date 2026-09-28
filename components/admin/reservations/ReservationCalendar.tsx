'use client';

import { useState } from 'react';
import { Reservation } from './ReservationTable';

interface ReservationCalendarProps {
  reservations: Reservation[];
  selectedDate: string | null;
  onSelectDate: (dateStr: string) => void;
}

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export default function ReservationCalendar({
  reservations,
  selectedDate,
  onSelectDate,
}: ReservationCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // Marzo 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Domingo

  // Cambiar de mes
  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(parseInt(e.target.value, 10), month, 1));
  };
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(year, parseInt(e.target.value, 10), 1));
  };

  // Obtener reservaciones activas para un día específico (YYYY-MM-DD)
  const getReservationsForDay = (day: number) => {
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

    return {
      dateStr,
      items: reservations.filter((r) => r.checkIn <= dateStr && r.checkOut >= dateStr),
    };
  };

  const yearsOptions = Array.from({ length: 7 }, (_, i) => 2024 + i);

  // Obtener detalles del día seleccionado actualmente para mostrarlo abajo en móvil
  const selectedDayReservations = selectedDate
    ? reservations.filter((r) => r.checkIn <= selectedDate && r.checkOut >= selectedDate)
    : [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5ded0] p-4 md:p-6 flex flex-col gap-6">
      {/* Controles del Selector de Mes y Año */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#e5ded0] pb-4">
        <div className="flex items-center gap-2 justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <select
              value={month}
              onChange={handleMonthChange}
              className="bg-[#f7f4ed] border border-[#e5ded0] rounded-lg px-3 py-2 text-xs md:text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
            >
              {MONTHS.map((m, idx) => (
                <option key={m} value={idx}>
                  {m}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={handleYearChange}
              className="bg-[#f7f4ed] border border-[#e5ded0] rounded-lg px-3 py-2 text-xs md:text-sm font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
            >
              {yearsOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setCurrentDate(new Date())}
            className="sm:hidden px-3 py-2 text-xs font-semibold bg-[#f7f4ed] hover:bg-[#e5ded0] rounded-lg text-[#5a524c]"
          >
            Hoy
          </button>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2">
          <button
            type="button"
            onClick={() => setCurrentDate(new Date())}
            className="hidden sm:inline-block px-3 py-1.5 text-xs font-semibold bg-[#f7f4ed] hover:bg-[#e5ded0] rounded-lg text-[#5a524c]"
          >
            Hoy
          </button>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="px-4 py-2 bg-[#f7f4ed] hover:bg-[#e5ded0] rounded-lg text-[#2d2926] transition-colors font-bold text-sm"
              title="Mes anterior"
            >
              ← Ant
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="px-4 py-2 bg-[#f7f4ed] hover:bg-[#e5ded0] rounded-lg text-[#2d2926] transition-colors font-bold text-sm"
              title="Mes siguiente"
            >
              Sig →
            </button>
          </div>
        </div>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 text-center text-[10px] md:text-xs font-bold uppercase text-[#5a524c]">
        <div>Dom</div>
        <div>Lun</div>
        <div>Mar</div>
        <div>Mié</div>
        <div>Jue</div>
        <div>Vie</div>
        <div>Sáb</div>
      </div>

      {/* Celdas del Calendario (Responsivas) */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {/* Espacios vacíos de inicio de mes */}
        {Array.from({ length: firstDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="h-12 md:h-28 bg-[#f7f4ed]/20 rounded-lg border border-transparent" />
        ))}

        {/* Días activos */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const { dateStr, items } = getReservationsForDay(day);
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelectDate(dateStr)}
              className={`h-12 md:h-28 p-1 md:p-2 rounded-lg border text-left flex flex-col justify-between transition-all relative ${
                isSelected
                  ? 'border-[#d95d39] ring-2 ring-[#d95d39]/30 bg-[#f7f4ed]'
                  : 'border-[#e5ded0] hover:border-[#c0a060] bg-white'
              }`}
            >
              {/* Número del día */}
              <span className={`text-xs md:text-sm font-bold ${isSelected ? 'text-[#d95d39]' : 'text-[#2d2926]'}`}>
                {day}
              </span>

              {/* MÓVIL: Indicador compacto de punto / Badge pequeño */}
              {items.length > 0 && (
                <div className="md:hidden flex items-center justify-center w-full mt-auto">
                  <span className="bg-[#d95d39] text-white text-[9px] font-extrabold px-1 py-0.5 rounded-full min-w-[18px] text-center">
                    {items.length}
                  </span>
                </div>
              )}

              {/* DESKTOP/TABLET: Texto completo de reservaciones */}
              {items.length > 0 && (
                <div className="hidden md:flex flex-col gap-1 w-full mt-1">
                  <span className="bg-[#d95d39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded text-center truncate">
                    {items.length} {items.length === 1 ? 'Reserva' : 'Reservas'}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* PANEL INFORMATIVO EN MÓVIL: Muestra las reservaciones del día seleccionado */}
      {selectedDate && (
        <div className="md:hidden bg-[#f7f4ed] p-4 rounded-xl border border-[#e5ded0] flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-[#e5ded0] pb-2">
            <span className="text-xs font-bold text-[#2d2926]">
              Reservaciones del día: {selectedDate}
            </span>
            <span className="text-[10px] bg-[#2d2926] text-[#e5ded0] px-2 py-0.5 rounded-full font-bold">
              {selectedDayReservations.length}
            </span>
          </div>

          {selectedDayReservations.length === 0 ? (
            <p className="text-xs text-[#5a524c]">No hay reservaciones para esta fecha.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {selectedDayReservations.map((res) => (
                <div
                  key={res.id}
                  className="bg-white p-3 rounded-lg border border-[#e5ded0] flex flex-col gap-1 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2d2926]">{res.guestName}</span>
                    <span className="text-[10px] font-mono text-[#5a524c]">{res.id}</span>
                  </div>
                  <div className="text-[11px] text-[#5a524c]">
                    {res.roomType} • {res.checkIn} al {res.checkOut}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-bold text-[#2d2926]">{res.amount}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#d1fae5] text-[#065f46]">
                      {res.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}