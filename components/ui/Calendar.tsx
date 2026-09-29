'use client';

import React, { useState } from 'react';

export interface CalendarDayItem {
  id: string;
  label?: string;
  colorClass?: string;
}

interface CalendarProps {
  selectedDate: string | null;
  onSelectDate: (dateStr: string) => void;
  getItemsForDate: (dateStr: string) => CalendarDayItem[];
}

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export default function Calendar({
  selectedDate,
  onSelectDate,
  getItemsForDate,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Domingo

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(parseInt(e.target.value, 10), month, 1));
  };
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(year, parseInt(e.target.value, 10), 1));
  };

  const yearsOptions = Array.from({ length: 7 }, (_, i) => 2024 + i);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5ded0] p-4 md:p-6 flex flex-col gap-6">
      {/* Selector de Mes y Año */}
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

      {/* Celdas del Calendario */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {/* Días vacíos iniciales */}
        {Array.from({ length: firstDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="h-12 md:h-24 bg-[#f7f4ed]/20 rounded-lg border border-transparent" />
        ))}

        {/* Días del mes */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const formattedDay = day < 10 ? `0${day}` : `${day}`;
          const formattedMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
          const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

          const items = getItemsForDate(dateStr);
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelectDate(dateStr)}
              className={`h-12 md:h-24 p-1 md:p-2 rounded-lg border text-left flex flex-col justify-between transition-all relative ${
                isSelected
                  ? 'border-[#d95d39] ring-2 ring-[#d95d39]/30 bg-[#f7f4ed]'
                  : 'border-[#e5ded0] hover:border-[#c0a060] bg-white'
              }`}
            >
              <span className={`text-xs md:text-sm font-bold ${isSelected ? 'text-[#d95d39]' : 'text-[#2d2926]'}`}>
                {day}
              </span>

              {items.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-auto">
                  <span className="bg-[#2d2926] text-[#e5ded0] text-[9px] md:text-[10px] font-extrabold px-1.5 py-0.5 rounded-full truncate">
                    {items.length} {items.length === 1 ? 'tarea' : 'tareas'}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}