'use client';

import React, { useState, useEffect } from 'react';
import { Room, SeasonRate, SpecialDateRate, RoomRatesConfig } from '@/types/room';

interface DayRateGroup {
  id: string;
  days: string[]; // ej: ['L', 'M', 'X', 'J']
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

export default function RoomRatesModal({
  isOpen,
  room,
  onClose,
  onSaveRates,
}: RoomRatesModalProps) {
  // Grupos de Precios Semanales Dinámicos
  const [dayRateGroups, setDayRateGroups] = useState<DayRateGroup[]>([
    { id: '1', days: ['L', 'M', 'X', 'J'], price: 1800 },
    { id: '2', days: ['V', 'S', 'D'], price: 2400 },
  ]);

  // Formulario para Nuevo Grupo de Días Faltantes
  const [selectedNewDays, setSelectedNewDays] = useState<string[]>([]);
  const [newGroupPrice, setNewGroupPrice] = useState<number>(0);

  // Temporadas
  const [seasons, setSeasons] = useState<SeasonRate[]>([]);
  const [newSeason, setNewSeason] = useState({ name: '', startDate: '', endDate: '', pricePerNight: 0 });

  // Días Especiales / Ocio
  const [specialDates, setSpecialDates] = useState<SpecialDateRate[]>([]);
  const [newSpecial, setNewSpecial] = useState({ date: '', pricePerNight: 0, reason: '' });

  useEffect(() => {
    if (room && isOpen) {
      setSeasons(room.ratesConfig?.seasons || []);
      setSpecialDates(room.ratesConfig?.specialDates || []);

      // Si ya existen grupos de días guardados, los usamos; si no, cargamos valores base
      if (room.ratesConfig?.dayRateGroups && room.ratesConfig.dayRateGroups.length > 0) {
        setDayRateGroups(room.ratesConfig.dayRateGroups);
      } else {
        const defaultReg = Number(room.priceRegular?.replace(/[^0-9.]/g, '')) || 1800;
        const defaultHigh = Number(room.priceHigh?.replace(/[^0-9.]/g, '')) || 2400;
        setDayRateGroups([
          { id: 'g1', days: ['L', 'M', 'X', 'J'], price: room.ratesConfig?.baseWeekdayPrice || defaultReg },
          { id: 'g2', days: ['V', 'S', 'D'], price: room.ratesConfig?.baseWeekendPrice || defaultHigh },
        ]);
      }
    }
  }, [room, isOpen]);

  if (!isOpen || !room) return null;

  // Días que ya están asignados a algún grupo
  const assignedDays = dayRateGroups.flatMap((g) => g.days);
  // Días disponibles para ser asignados en una nueva regla
  const availableDays = ALL_WEEKDAYS.filter((d) => !assignedDays.includes(d.key));

  // Modificar selección de días en un grupo existente
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

  // Modificar precio de un grupo existente
  const handlePriceChangeInGroup = (groupId: string, price: number) => {
    setDayRateGroups((prev) =>
      prev.map((group) => (group.id === groupId ? { ...group, price } : group))
    );
  };

  // Eliminar un grupo de días
  const handleRemoveGroup = (groupId: string) => {
    setDayRateGroups((prev) => prev.filter((g) => g.id !== groupId));
  };

  // Seleccionar días para la nueva regla
  const handleToggleNewDay = (dayKey: string) => {
    setSelectedNewDays((prev) =>
      prev.includes(dayKey) ? prev.filter((d) => d !== dayKey) : [...prev, dayKey]
    );
  };

  // Agregar un nuevo grupo con los días faltantes
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

  // Temporadas & Días Especiales
  const handleAddSeason = () => {
    if (!newSeason.name || !newSeason.startDate || !newSeason.endDate || newSeason.pricePerNight <= 0) return;
    setSeasons([...seasons, { ...newSeason, id: `SEA-${Date.now()}` }]);
    setNewSeason({ name: '', startDate: '', endDate: '', pricePerNight: 0 });
  };

  const handleAddSpecialDate = () => {
    if (!newSpecial.date || newSpecial.pricePerNight <= 0) return;
    setSpecialDates([...specialDates, { ...newSpecial, id: `SPC-${Date.now()}` }]);
    setNewSpecial({ date: '', pricePerNight: 0, reason: '' });
  };

  const handleSave = () => {
    // Calculamos tarifas representativas para mantener compatibilidad
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
            <h3 className="text-xl font-serif font-bold text-[#2d2926]">{room.title || `Habitación N° ${room.number}`}</h3>
          </div>
          <button onClick={onClose} className="text-[#988f86] hover:text-[#2d2926] text-xl font-bold">&times;</button>
        </div>

        <div className="p-6 space-y-6">
          {/* 1. Precios Semanales por Días Seleccionables (L, M, X, J, V, S, D) */}
          <div className="bg-[#f7f4ed]/50 p-4 rounded-xl border border-[#e5ded0] space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c0a060]">
              1. Tarifas Semanales por Días (L, M, X, J, V, S, D)
            </h4>

            {/* Grupos Configurados */}
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

            {/* Añadir días faltantes */}
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

          {/* 2. Rango de Temporadas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c0a060] mb-3">2. Temporadas (Alta / Baja / Vacaciones)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-3 bg-[#f7f4ed]/30 p-3 rounded-lg border border-[#e5ded0]">
              <input type="text" placeholder="Nombre" value={newSeason.name} onChange={(e) => setNewSeason({ ...newSeason, name: e.target.value })} className="px-2 py-1.5 text-xs bg-white border border-[#e5ded0] rounded" />
              <input type="date" value={newSeason.startDate} onChange={(e) => setNewSeason({ ...newSeason, startDate: e.target.value })} className="px-2 py-1.5 text-xs bg-white border border-[#e5ded0] rounded" />
              <input type="date" value={newSeason.endDate} onChange={(e) => setNewSeason({ ...newSeason, endDate: e.target.value })} className="px-2 py-1.5 text-xs bg-white border border-[#e5ded0] rounded" />
              <div className="flex gap-1">
                <input type="number" placeholder="Tarifa $" value={newSeason.pricePerNight || ''} onChange={(e) => setNewSeason({ ...newSeason, pricePerNight: Number(e.target.value) })} className="w-full px-2 py-1.5 text-xs bg-white border border-[#e5ded0] rounded font-mono" />
                <button type="button" onClick={handleAddSeason} className="px-3 py-1.5 bg-[#c0a060] text-white rounded text-xs font-bold">+</button>
              </div>
            </div>
            <div className="space-y-1">
              {seasons.map((s) => (
                <div key={s.id} className="flex justify-between items-center p-2 bg-white border border-[#e5ded0] rounded text-xs">
                  <span><strong>{s.name}</strong> ({s.startDate} - {s.endDate})</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#d95d39]">${s.pricePerNight} MXN</span>
                    <button onClick={() => setSeasons(seasons.filter((x) => x.id !== s.id))} className="text-red-500 font-bold">&times;</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Días Especiales / Ocio / Puentes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c0a060] mb-3">3. Días Ociosos / Alta Demanda (Fechas Específicas)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3 bg-[#f7f4ed]/30 p-3 rounded-lg border border-[#e5ded0]">
              <input type="date" value={newSpecial.date} onChange={(e) => setNewSpecial({ ...newSpecial, date: e.target.value })} className="px-2 py-1.5 text-xs bg-white border border-[#e5ded0] rounded" />
              <input type="text" placeholder="Motivo (ej. Nochebuena)" value={newSpecial.reason} onChange={(e) => setNewSpecial({ ...newSpecial, reason: e.target.value })} className="px-2 py-1.5 text-xs bg-white border border-[#e5ded0] rounded" />
              <div className="flex gap-1">
                <input type="number" placeholder="Precio $" value={newSpecial.pricePerNight || ''} onChange={(e) => setNewSpecial({ ...newSpecial, pricePerNight: Number(e.target.value) })} className="w-full px-2 py-1.5 text-xs bg-white border border-[#e5ded0] rounded font-mono" />
                <button type="button" onClick={handleAddSpecialDate} className="px-3 py-1.5 bg-[#d95d39] text-white rounded text-xs font-bold">+</button>
              </div>
            </div>
            <div className="space-y-1">
              {specialDates.map((sp) => (
                <div key={sp.id} className="flex justify-between items-center p-2 bg-white border border-[#e5ded0] rounded text-xs">
                  <span><strong>{sp.date}</strong> — {sp.reason || 'Fecha Especial'}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#d95d39]">${sp.pricePerNight} MXN</span>
                    <button onClick={() => setSpecialDates(specialDates.filter((x) => x.id !== sp.id))} className="text-red-500 font-bold">&times;</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#e5ded0] flex justify-end gap-3 bg-[#f7f4ed]">
          <button onClick={onClose} className="px-4 py-2 border border-[#e5ded0] text-xs font-semibold text-[#5a524c] rounded-lg hover:bg-white">
            Cancelar
          </button>
          <button onClick={handleSave} className="px-5 py-2 bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold rounded-lg transition-colors shadow-sm">
            Guardar Esquema Tarifario
          </button>
        </div>
      </div>
    </div>
  );
}