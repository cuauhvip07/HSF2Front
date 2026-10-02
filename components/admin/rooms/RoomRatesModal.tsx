'use client';

import React, { useState, useEffect } from 'react';
import { Room, SeasonRate, SpecialDateRate, RoomRatesConfig } from '@/types/room';

interface DayRateGroup {
  id: string;
  days: string[];
  price: number;
}

interface RoomRatesModalProps {
  isOpen: boolean;
  room: Room | null;
  onClose: () => void;
  onSaveRates: (roomId: string | number, config: RoomRatesConfig) => void;
}

const ALL_WEEKDAYS = [
  { key: 'L', label: 'L' },
  { key: 'M', label: 'M' },
  { key: 'X', label: 'X' },
  { key: 'J', label: 'J' },
  { key: 'V', label: 'V' },
  { key: 'S', label: 'S' },
  { key: 'D', label: 'D' },
];

const PRESET_COLORS = [
  '#c0a060', // Dorado Elegante
  '#d95d39', // Terracota / Naranja
  '#2563eb', // Azul Marino
  '#059669', // Verde Esmeralda
  '#7c3aed', // Púrpura / Morado
  '#db2777', // Rosa Fucsia
  '#4b5563', // Gris Pizarra
];

export default function RoomRatesModal({
  isOpen,
  room,
  onClose,
  onSaveRates,
}: RoomRatesModalProps) {
  const [dayRateGroups, setDayRateGroups] = useState<DayRateGroup[]>([
    { id: '1', days: ['L', 'M', 'X', 'J'], price: 390 },
    { id: '2', days: ['V', 'S', 'D'], price: 450 },
  ]);

  const [selectedNewDays, setSelectedNewDays] = useState<string[]>([]);
  const [newGroupPrice, setNewGroupPrice] = useState<number>(0);

  // Temporadas
  const [seasons, setSeasons] = useState<SeasonRate[]>([]);
  const [editingSeasonId, setEditingSeasonId] = useState<string | null>(null);

  // Formulario de Temporadas (incluye selección de color en creación y edición)
  const [seasonForm, setSeasonForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    pricePerNight: 0,
    weekendPricePerNight: 0,
    selectedWeekendDays: ['S', 'D'],
    color: PRESET_COLORS[0],
  });

  // Días Especiales
  const [specialDates, setSpecialDates] = useState<SpecialDateRate[]>([]);
  const [newSpecial, setNewSpecial] = useState({ date: '', pricePerNight: 0, reason: '' });

  useEffect(() => {
    if (room && isOpen) {
      setSeasons(room.ratesConfig?.seasons || []);
      setSpecialDates(room.ratesConfig?.specialDates || []);

      if (room.ratesConfig?.dayRateGroups && room.ratesConfig.dayRateGroups.length > 0) {
        setDayRateGroups(room.ratesConfig.dayRateGroups);
      } else {
        const defaultReg = Number(room.priceRegular?.replace(/[^0-9.]/g, '')) || 390;
        const defaultHigh = Number(room.priceHigh?.replace(/[^0-9.]/g, '')) || 450;
        setDayRateGroups([
          { id: 'g1', days: ['L', 'M', 'X', 'J'], price: room.ratesConfig?.baseWeekdayPrice || defaultReg },
          { id: 'g2', days: ['V', 'S', 'D'], price: room.ratesConfig?.baseWeekendPrice || defaultHigh },
        ]);
      }
    }
  }, [room, isOpen]);

  if (!isOpen || !room) return null;

  // --- TARIFAS SEMANALES ---
  const assignedDays = dayRateGroups.flatMap((g) => g.days);
  const availableDays = ALL_WEEKDAYS.filter((d) => !assignedDays.includes(d.key));

  const handleToggleDayInGroup = (groupId: string, dayKey: string) => {
    setDayRateGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          const exists = group.days.includes(dayKey);
          return {
            ...group,
            days: exists ? group.days.filter((d) => d !== dayKey) : [...group.days, dayKey],
          };
        }
        return group;
      })
    );
  };

  const handlePriceChangeInGroup = (groupId: string, price: number) => {
    setDayRateGroups((prev) =>
      prev.map((group) => (group.id === groupId ? { ...group, price } : group))
    );
  };

  const handleRemoveGroup = (groupId: string) => {
    setDayRateGroups((prev) => prev.filter((g) => g.id !== groupId));
  };

  const handleToggleNewDay = (dayKey: string) => {
    setSelectedNewDays((prev) =>
      prev.includes(dayKey) ? prev.filter((d) => d !== dayKey) : [...prev, dayKey]
    );
  };

  const handleAddDayGroup = () => {
    if (selectedNewDays.length === 0 || newGroupPrice <= 0) {
      alert('Selecciona al menos un día y asigna un precio mayor a 0.');
      return;
    }
    setDayRateGroups([
      ...dayRateGroups,
      { id: `G-${Date.now()}`, days: selectedNewDays, price: newGroupPrice },
    ]);
    setSelectedNewDays([]);
    setNewGroupPrice(0);
  };

  // --- TEMPORADAS ---
  const handleToggleSeasonWeekendDay = (dayKey: string) => {
    setSeasonForm((prev) => {
      const exists = prev.selectedWeekendDays.includes(dayKey);
      return {
        ...prev,
        selectedWeekendDays: exists
          ? prev.selectedWeekendDays.filter((d) => d !== dayKey)
          : [...prev.selectedWeekendDays, dayKey],
      };
    });
  };

  const handleSaveSeason = () => {
    if (!seasonForm.name || !seasonForm.startDate || !seasonForm.endDate || seasonForm.pricePerNight <= 0) {
      alert('Por favor completa el nombre, fechas y la tarifa base de la temporada.');
      return;
    }

    if (editingSeasonId) {
      // Editar temporada existente
      setSeasons((prev) =>
        prev.map((s) =>
          String(s.id) === String(editingSeasonId)
            ? ({
                ...s,
                name: seasonForm.name,
                startDate: seasonForm.startDate,
                endDate: seasonForm.endDate,
                pricePerNight: seasonForm.pricePerNight,
                weekendPricePerNight: seasonForm.weekendPricePerNight || undefined,
                weekendDays: seasonForm.selectedWeekendDays,
                color: seasonForm.color,
              } as any)
            : s
        )
      );
      setEditingSeasonId(null);
    } else {
      // Crear nueva temporada asignando el color elegido en el formulario
      setSeasons([
        ...seasons,
        {
          id: `SEA-${Date.now()}`,
          name: seasonForm.name,
          startDate: seasonForm.startDate,
          endDate: seasonForm.endDate,
          pricePerNight: seasonForm.pricePerNight,
          weekendPricePerNight: seasonForm.weekendPricePerNight || undefined,
          weekendDays: seasonForm.selectedWeekendDays,
          color: seasonForm.color,
        } as any,
      ]);
    }

    // Reset del formulario con color dinámico rotativo para la siguiente creación
    const nextColorIndex = (seasons.length + 1) % PRESET_COLORS.length;
    setSeasonForm({
      name: '',
      startDate: '',
      endDate: '',
      pricePerNight: 0,
      weekendPricePerNight: 0,
      selectedWeekendDays: ['S', 'D'],
      color: PRESET_COLORS[nextColorIndex],
    });
  };

  const handleStartEditSeason = (season: any) => {
    setEditingSeasonId(String(season.id));
    setSeasonForm({
      name: season.name || '',
      startDate: season.startDate || '',
      endDate: season.endDate || '',
      pricePerNight: season.pricePerNight || 0,
      weekendPricePerNight: season.weekendPricePerNight || 0,
      selectedWeekendDays: season.weekendDays || ['S', 'D'],
      color: season.color || '#c0a060',
    });
  };

  const handleCancelSeasonEdit = () => {
    setEditingSeasonId(null);
    setSeasonForm({
      name: '',
      startDate: '',
      endDate: '',
      pricePerNight: 0,
      weekendPricePerNight: 0,
      selectedWeekendDays: ['S', 'D'],
      color: PRESET_COLORS[seasons.length % PRESET_COLORS.length],
    });
  };

  const handleRemoveSeason = (seasonId: string | number) => {
    setSeasons((prev) => prev.filter((s) => String(s.id) !== String(seasonId)));
    if (editingSeasonId === String(seasonId)) {
      handleCancelSeasonEdit();
    }
  };

  // --- DÍAS ESPECIALES ---
  const handleAddSpecialDate = () => {
    if (!newSpecial.date || newSpecial.pricePerNight <= 0) return;
    setSpecialDates([...specialDates, { ...newSpecial, id: `SPC-${Date.now()}` }]);
    setNewSpecial({ date: '', pricePerNight: 0, reason: '' });
  };

  const handleSave = () => {
    const weekdayGroup = dayRateGroups.find((g) => g.days.includes('L')) || dayRateGroups[0];
    const weekendGroup = dayRateGroups.find((g) => g.days.includes('S')) || dayRateGroups[dayRateGroups.length - 1];

    const config: RoomRatesConfig = {
      baseWeekdayPrice: weekdayGroup ? weekdayGroup.price : 0,
      baseWeekendPrice: weekendGroup ? weekendGroup.price : 0,
      dayRateGroups,
      seasons,
      specialDates,
    };

    onSaveRates(room.id, config);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d2926]/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl border border-[#e5ded0] w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#e5ded0] flex justify-between items-center bg-[#f7f4ed]">
          <div>
            <span className="text-xs font-mono font-bold text-[#c0a060]">GESTIÓN DINÁMICA DE TARIFAS</span>
            <h3 className="text-xl font-serif font-bold text-[#2d2926]">
              {room.title || `Habitación N° ${room.number}`}
            </h3>
          </div>
          <button onClick={onClose} className="text-[#988f86] hover:text-[#2d2926] text-xl font-bold">&times;</button>
        </div>

        <div className="p-6 space-y-6">
          {/* 1. Precios Semanales */}
          <div className="bg-[#f7f4ed]/50 p-4 rounded-xl border border-[#e5ded0] space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c0a060]">
              1. Tarifas Semanales Habituales (L, M, X, J, V, S, D)
            </h4>

            <div className="space-y-3">
              {dayRateGroups.map((group, idx) => (
                <div key={group.id} className="bg-white p-3 rounded-lg border border-[#e5ded0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#5a524c] uppercase">Grupo #{idx + 1} - Días Aplicables:</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {ALL_WEEKDAYS.map((d) => {
                        const isSelectedInThisGroup = group.days.includes(d.key);
                        const isAssignedElsewhere = !isSelectedInThisGroup && assignedDays.includes(d.key);

                        return (
                          <button
                            key={d.key}
                            type="button"
                            disabled={isAssignedElsewhere}
                            onClick={() => handleToggleDayInGroup(group.id, d.key)}
                            className={`w-7 h-7 rounded-md text-xs font-bold transition-all ${
                              isSelectedInThisGroup
                                ? 'bg-[#c0a060] text-white shadow-sm'
                                : isAssignedElsewhere
                                ? 'bg-gray-100 text-gray-300 border border-gray-200 cursor-not-allowed'
                                : 'bg-[#f7f4ed] text-[#5a524c] hover:bg-[#e5ded0] border border-[#e5ded0]'
                            }`}
                          >
                            {d.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <div>
                      <span className="text-[10px] text-[#5a524c] block font-semibold">Precio / Noche ($)</span>
                      <input
                        type="number"
                        value={group.price}
                        onChange={(e) => handlePriceChangeInGroup(group.id, Number(e.target.value))}
                        className="w-28 px-2 py-1 bg-white border border-[#e5ded0] rounded text-xs font-mono font-bold text-[#2d2926] outline-none focus:border-[#c0a060]"
                      />
                    </div>
                    {dayRateGroups.length > 1 && (
                      <button
                        onClick={() => handleRemoveGroup(group.id)}
                        className="mt-3 text-red-500 font-bold hover:bg-red-50 p-1.5 rounded transition-colors"
                        title="Eliminar esta regla"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {availableDays.length > 0 ? (
              <div className="bg-white p-3 rounded-lg border border-dashed border-[#c0a060]/60 space-y-2">
                <span className="text-xs font-bold text-[#d95d39] uppercase tracking-wider block">
                  + Asignar Tarifa a Días Faltantes ({availableDays.map((d) => d.label).join(', ')})
                </span>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex gap-1.5 flex-wrap">
                    {availableDays.map((d) => {
                      const isSelected = selectedNewDays.includes(d.key);
                      return (
                        <button
                          key={d.key}
                          type="button"
                          onClick={() => handleToggleNewDay(d.key)}
                          className={`w-7 h-7 rounded-md text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-[#d95d39] text-white shadow-sm'
                              : 'bg-[#f7f4ed] text-[#5a524c] hover:bg-[#e5ded0] border border-[#e5ded0]'
                          }`}
                        >
                          {d.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <input
                      type="number"
                      placeholder="Precio $"
                      value={newGroupPrice || ''}
                      onChange={(e) => setNewGroupPrice(Number(e.target.value))}
                      className="w-full sm:w-28 px-2 py-1 text-xs bg-white border border-[#e5ded0] rounded font-mono outline-none focus:border-[#c0a060]"
                    />
                    <button
                      type="button"
                      onClick={handleAddDayGroup}
                      className="px-3 py-1 bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold rounded shadow-sm whitespace-nowrap"
                    >
                      Agregar Regla
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-[#065f46] bg-[#d1fae5] p-2 rounded border border-[#a7f3d0] font-medium text-center">
                ✓ Todos los días de la semana (L, M, X, J, V, S, D) tienen asignada una tarifa.
              </p>
            )}
          </div>

          {/* 2. Temporadas */}
          <div className="bg-[#f7f4ed]/50 p-4 rounded-xl border border-[#e5ded0] space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c0a060]">
              2. Temporadas Especiales (Vacaciones / Puentes)
            </h4>

            {/* Listado de Temporadas Existentes */}
            <div className="space-y-3">
              {seasons.map((s: any, idx) => {
                const isBeingEdited = editingSeasonId === String(s.id);

                return (
                  <div
                    key={s.id}
                    className={`bg-white p-3.5 rounded-lg border transition-all ${
                      isBeingEdited ? 'border-[#c0a060] ring-2 ring-[#c0a060]/20' : 'border-[#e5ded0]'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-[#f7f4ed] pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: s.color || '#c0a060' }}
                        />
                        <span className="text-[11px] font-bold text-[#c0a060] uppercase">
                          Temporada #{idx + 1}
                        </span>
                        <h5 className="text-xs font-bold text-[#2d2926]">{s.name}</h5>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleStartEditSeason(s)}
                          className="text-xs font-bold text-[#c0a060] hover:underline"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveSeason(s.id)}
                          className="text-red-500 font-bold hover:bg-red-50 px-1.5 py-0.5 rounded transition-colors text-xs"
                          title="Eliminar Temporada"
                        >
                          &times;
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5a524c]">
                      <div>
                        <span className="text-[10px] text-[#988f86] block">Rango de Fechas:</span>
                        <p className="font-semibold text-[#2d2926]">
                          {s.startDate} al {s.endDate}
                        </p>
                      </div>
                      <div className="flex justify-between items-center bg-[#f7f4ed]/60 p-2 rounded">
                        <div>
                          <span className="text-[10px] text-[#988f86] block">Tarifa Base:</span>
                          <span className="font-mono font-bold text-[#2d2926]">${s.pricePerNight} MXN</span>
                        </div>
                        {s.weekendPricePerNight ? (
                          <div className="text-right">
                            <span className="text-[10px] text-[#988f86] block">
                              Días Diferenciados ({s.weekendDays?.join(', ') || 'S, D'}):
                            </span>
                            <span className="font-mono font-bold text-[#d95d39]">
                              ${s.weekendPricePerNight} MXN
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Formulario para Crear / Editar Temporada */}
            <div className="bg-white p-4 rounded-lg border border-dashed border-[#c0a060]/80 space-y-3">
              <div className="flex items-center justify-between border-b border-[#e5ded0] pb-2">
                <span className="text-xs font-bold text-[#c0a060] uppercase tracking-wider">
                  {editingSeasonId ? '✏️ Editando Temporada Seleccionada' : '+ Crear Nueva Temporada'}
                </span>
                {editingSeasonId && (
                  <button
                    type="button"
                    onClick={handleCancelSeasonEdit}
                    className="text-[11px] font-semibold text-[#5a524c] hover:underline"
                  >
                    Cancelar Edición
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-[#5a524c] block mb-1">Nombre</label>
                  <input
                    type="text"
                    placeholder="ej. Semana Santa / Fin de Año"
                    value={seasonForm.name}
                    onChange={(e) => setSeasonForm({ ...seasonForm, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#f7f4ed]/40 border border-[#e5ded0] rounded font-medium outline-none focus:border-[#c0a060]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#5a524c] block mb-1">Fecha Inicio</label>
                  <input
                    type="date"
                    value={seasonForm.startDate}
                    onChange={(e) => setSeasonForm({ ...seasonForm, startDate: e.target.value })}
                    className="w-full px-2 py-1.5 text-xs bg-[#f7f4ed]/40 border border-[#e5ded0] rounded outline-none focus:border-[#c0a060]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#5a524c] block mb-1">Fecha Fin</label>
                  <input
                    type="date"
                    value={seasonForm.endDate}
                    onChange={(e) => setSeasonForm({ ...seasonForm, endDate: e.target.value })}
                    className="w-full px-2 py-1.5 text-xs bg-[#f7f4ed]/40 border border-[#e5ded0] rounded outline-none focus:border-[#c0a060]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[10px] font-bold text-[#5a524c] block mb-1">
                    Tarifa Base de la Temporada ($)
                  </label>
                  <input
                    type="number"
                    placeholder="ej. 590"
                    value={seasonForm.pricePerNight || ''}
                    onChange={(e) =>
                      setSeasonForm({ ...seasonForm, pricePerNight: Number(e.target.value) })
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#e5ded0] rounded font-mono font-bold text-[#2d2926] outline-none focus:border-[#c0a060]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#5a524c] block mb-1">
                    Tarifa Fin de Semana o Días Clave ($)
                  </label>
                  <input
                    type="number"
                    placeholder="ej. 650 (Opcional)"
                    value={seasonForm.weekendPricePerNight || ''}
                    onChange={(e) =>
                      setSeasonForm({ ...seasonForm, weekendPricePerNight: Number(e.target.value) })
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#e5ded0] rounded font-mono font-bold text-[#d95d39] outline-none focus:border-[#c0a060]"
                  />
                </div>
              </div>

              {/* Selector de Color (Disponible al crear y al editar) */}
              <div className="pt-2 border-t border-[#e5ded0]/60">
                <label className="text-[10px] font-bold text-[#5a524c] block mb-1.5">
                  Color Distintivo para la Temporada:
                </label>
                <div className="flex items-center gap-2">
                  {PRESET_COLORS.map((colorHex) => (
                    <button
                      key={colorHex}
                      type="button"
                      onClick={() => setSeasonForm({ ...seasonForm, color: colorHex })}
                      className={`w-6 h-6 rounded-full transition-transform ${
                        seasonForm.color === colorHex
                          ? 'scale-125 ring-2 ring-offset-1 ring-[#2d2926]'
                          : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: colorHex }}
                    />
                  ))}
                  <input
                    type="color"
                    value={seasonForm.color}
                    onChange={(e) => setSeasonForm({ ...seasonForm, color: e.target.value })}
                    className="w-7 h-7 rounded border border-[#e5ded0] cursor-pointer bg-transparent p-0"
                    title="Seleccionar color personalizado"
                  />
                </div>
              </div>

              {/* Días con Tarifa Diferenciada */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-[#e5ded0]/60">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#5a524c]">
                    Días con Tarifa Diferenciada:
                  </span>
                  <div className="flex gap-1">
                    {ALL_WEEKDAYS.map((d) => {
                      const isSelected = seasonForm.selectedWeekendDays.includes(d.key);
                      return (
                        <button
                          key={d.key}
                          type="button"
                          onClick={() => handleToggleSeasonWeekendDay(d.key)}
                          className={`w-6 h-6 rounded text-[10px] font-bold transition-all ${
                            isSelected
                              ? 'bg-[#c0a060] text-white shadow-sm'
                              : 'bg-[#f7f4ed] text-[#5a524c] border border-[#e5ded0]'
                          }`}
                        >
                          {d.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveSeason}
                  className="px-4 py-1.5 bg-[#c0a060] hover:bg-[#a88a4c] text-white rounded text-xs font-bold transition-colors shadow-sm whitespace-nowrap self-end sm:self-auto uppercase tracking-wider"
                >
                  {editingSeasonId ? 'Guardar Cambios' : '+ Agregar Temporada'}
                </button>
              </div>
            </div>
          </div>

          {/* 3. Días Especiales */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c0a060] mb-3">
              3. Fechas Específicas / Festivos / Puentes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3 bg-[#f7f4ed]/30 p-3 rounded-lg border border-[#e5ded0]">
              <input
                type="date"
                value={newSpecial.date}
                onChange={(e) => setNewSpecial({ ...newSpecial, date: e.target.value })}
                className="px-2 py-1.5 text-xs bg-white border border-[#e5ded0] rounded"
              />
              <input
                type="text"
                placeholder="Motivo (ej. Nochebuena)"
                value={newSpecial.reason}
                onChange={(e) => setNewSpecial({ ...newSpecial, reason: e.target.value })}
                className="px-2 py-1.5 text-xs bg-white border border-[#e5ded0] rounded"
              />
              <div className="flex gap-1">
                <input
                  type="number"
                  placeholder="Precio $"
                  value={newSpecial.pricePerNight || ''}
                  onChange={(e) => setNewSpecial({ ...newSpecial, pricePerNight: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 text-xs bg-white border border-[#e5ded0] rounded font-mono"
                />
                <button
                  type="button"
                  onClick={handleAddSpecialDate}
                  className="px-3 py-1.5 bg-[#d95d39] text-white rounded text-xs font-bold hover:bg-[#c44f2e]"
                >
                  +
                </button>
              </div>
            </div>
            <div className="space-y-1">
              {specialDates.map((sp) => (
                <div key={sp.id} className="flex justify-between items-center p-2 bg-white border border-[#e5ded0] rounded text-xs">
                  <span>
                    <strong>{sp.date}</strong> — {sp.reason || 'Fecha Especial'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#d95d39]">${sp.pricePerNight} MXN</span>
                    <button
                      onClick={() => setSpecialDates(specialDates.filter((x) => x.id !== sp.id))}
                      className="text-red-500 font-bold hover:bg-red-50 p-1 rounded"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#e5ded0] flex justify-end gap-3 bg-[#f7f4ed]">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#e5ded0] text-xs font-semibold text-[#5a524c] rounded-lg hover:bg-white"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
          >
            Guardar Esquema Tarifario
          </button>
        </div>
      </div>
    </div>
  );
}