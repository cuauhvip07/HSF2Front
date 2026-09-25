'use client';

interface ReservationFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  onNewReservation?: () => void;
}

const statusOptions = ['Todos', 'Confirmado', 'Checked-in', 'Pendiente', 'Cancelado'];

export default function ReservationFilters({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedDate,
  setSelectedDate,
  onNewReservation,
}: ReservationFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#e5ded0] shadow-sm">
      {/* Buscador */}
      <div className="relative flex-1 min-w-[240px]">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por cliente o folio..."
          className="w-full pl-10 pr-4 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-sm text-[#2d2926] placeholder-[#988f86] focus:outline-none focus:border-[#c0a060] transition-colors"
        />
        <svg
          className="w-4 h-4 text-[#988f86] absolute left-3.5 top-1/2 -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Selector de Fecha */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={selectedDate || ''}
          onChange={(e) => setSelectedDate(e.target.value || null)}
          className="bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg px-3 py-2 text-xs font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
        />
        {selectedDate && (
          <button
            type="button"
            onClick={() => setSelectedDate(null)}
            className="text-xs text-[#d95d39] font-bold hover:underline whitespace-nowrap"
          >
            Limpiar fecha
          </button>
        )}
      </div>

      {/* Filtros de Estado */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
        {statusOptions.map((status) => {
          const isActive = selectedStatus === status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#2d2926] text-[#e5ded0]'
                  : 'bg-[#f7f4ed] text-[#5a524c] hover:bg-[#e5ded0]'
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>

      {/* Botón Nueva Reserva */}
      <button
        type="button"
        onClick={onNewReservation}
        className="bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all shadow-sm tracking-wider uppercase flex items-center justify-center gap-2 whitespace-nowrap"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        + NUEVA RESERVA
      </button>
    </div>
  );
}