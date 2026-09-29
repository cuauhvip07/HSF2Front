'use client';

import React, { useState, useMemo } from 'react';
import { RoomReportItem, MaintenancePriority } from '@/types/housekeeping';

interface ReportsAdminClientProps {
  initialReports: RoomReportItem[];
}

export default function ReportsAdminClient({ initialReports }: ReportsAdminClientProps) {
  const [reports, setReports] = useState<RoomReportItem[]>(initialReports);

  const todayStr = new Date().toISOString().split('T')[0];
  const [filterDate, setFilterDate] = useState<string>(todayStr);
  const [filterCategory, setFilterCategory] = useState<string>('Todas');
  const [filterStatus, setFilterStatus] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Edición para Administrador
  const [editingReportId, setEditingReportId] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState<'Mantenimiento' | 'Limpieza' | 'Incidencia'>('Mantenimiento');
  const [editDescription, setEditDescription] = useState('');
  const [editPriority, setEditPriority] = useState<MaintenancePriority>('Media');

  const filteredReports = useMemo(() => {
    return reports.filter((rep) => {
      const matchesDate = filterDate ? rep.date === filterDate : true;
      const matchesCategory = filterCategory === 'Todas' || rep.category === filterCategory;
      const matchesStatus =
        filterStatus === 'Todos'
          ? true
          : filterStatus === 'Resuelto'
          ? rep.isResolved
          : !rep.isResolved;
      const matchesSearch =
        rep.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDate && matchesCategory && matchesStatus && matchesSearch;
    });
  }, [reports, filterDate, filterCategory, filterStatus, searchQuery]);

  const toggleResolveReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, isResolved: !r.isResolved } : r))
    );
  };

  const handleStartEdit = (rep: RoomReportItem) => {
    setEditingReportId(rep.id);
    setEditCategory(rep.category);
    setEditDescription(rep.description);
    setEditPriority(rep.priority);
  };

  const handleSaveEdit = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              category: editCategory,
              description: editDescription,
              priority: editPriority,
              // 'reportedBy' se mantiene intacto sin poder ser alterado
            }
          : r
      )
    );
    setEditingReportId(null);
  };

  return (
    <div className="p-6 bg-[#f7f4ed]/40 min-h-screen space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#2d2926]">
          Centro de Reportes (Administrador)
        </h1>
        <p className="text-sm text-[#5a524c]">
          Control, edición y resolución global de todos los reportes por fecha.
        </p>
      </div>

      {/* Controles de Filtro */}
      <div className="bg-white p-4 rounded-xl border border-[#e5ded0] shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div>
          <label className="block text-[10px] font-bold uppercase text-[#5a524c] mb-1">
            Filtrar por Fecha *
          </label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full p-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-xs font-bold text-[#2d2926] outline-none"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase text-[#5a524c] mb-1">Categoría</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full p-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-xs font-bold text-[#2d2926] outline-none"
          >
            <option value="Todas">Todas las categorías</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Limpieza">Limpieza</option>
            <option value="Incidencia">Incidencia</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase text-[#5a524c] mb-1">Estado</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full p-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-xs font-bold text-[#2d2926] outline-none"
          >
            <option value="Todos">Todos los estados</option>
            <option value="Pendiente">Pendientes ⚠️</option>
            <option value="Resuelto">Resueltos ✓</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase text-[#5a524c] mb-1">Buscar Texto / Hab</label>
          <input
            type="text"
            placeholder="Ej. Hab 101 o Fuga..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-xs font-bold text-[#2d2926] outline-none"
          />
        </div>
      </div>

      {/* Tabla Consolidada de Reportes */}
      <div className="bg-white rounded-xl border border-[#e5ded0] shadow-sm overflow-hidden">
        <div className="p-4 bg-[#f7f4ed] border-b border-[#e5ded0] flex justify-between items-center text-xs">
          <span className="font-bold text-[#2d2926]">
            Mostrando reportes de la fecha: <strong className="font-mono text-[#c0a060]">{filterDate || 'Histórico Completo'}</strong>
          </span>
          {filterDate && (
            <button
              type="button"
              onClick={() => setFilterDate('')}
              className="text-[#d95d39] font-bold hover:underline"
            >
              ✕ Ver Todas las Fechas
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f7f4ed]/50 border-b border-[#e5ded0] text-xs uppercase font-semibold text-[#5a524c]">
                <th className="p-4">Habitación</th>
                <th className="p-4">Fecha & Hora</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Descripción</th>
                <th className="p-4">Prioridad</th>
                <th className="p-4">Reportado Por</th>
                <th className="p-4 text-center">Acciones Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5ded0] text-sm text-[#2d2926]">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-[#988f86] text-xs">
                    No hay reportes que coincidan con los filtros.
                  </td>
                </tr>
              ) : (
                filteredReports.map((rep) => (
                  <tr key={rep.id} className="hover:bg-[#f7f4ed]/30 transition-colors">
                    {editingReportId === rep.id ? (
                      <td colSpan={7} className="p-4 bg-[#f7f4ed]/60">
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[9px] font-bold uppercase mb-1">Categoría</label>
                              <select
                                value={editCategory}
                                onChange={(e) => setEditCategory(e.target.value as any)}
                                className="w-full p-2 bg-white border border-[#e5ded0] rounded-xl text-xs font-bold"
                              >
                                <option value="Mantenimiento">Mantenimiento</option>
                                <option value="Limpieza">Limpieza</option>
                                <option value="Incidencia">Incidencia</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[9px] font-bold uppercase mb-1">Prioridad</label>
                              <select
                                value={editPriority}
                                onChange={(e) => setEditPriority(e.target.value as MaintenancePriority)}
                                className="w-full p-2 bg-white border border-[#e5ded0] rounded-xl text-xs font-bold"
                              >
                                <option value="Baja">Baja</option>
                                <option value="Media">Media</option>
                                <option value="Alta">Alta</option>
                                <option value="Urgente">Urgente</option>
                              </select>
                            </div>

                            {/* Campo Reportado Por (Inmodificable para mantener trazabilidad) */}
                            <div>
                              <label className="block text-[9px] font-bold uppercase mb-1">Reportado Por (Fijo)</label>
                              <input
                                type="text"
                                value={rep.reportedBy}
                                disabled
                                readOnly
                                className="w-full p-2 bg-gray-100 border border-[#e5ded0] rounded-xl text-xs font-bold text-[#5a524c] cursor-not-allowed"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] font-bold uppercase mb-1">Descripción</label>
                            <textarea
                              rows={2}
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              className="w-full p-2 bg-white border border-[#e5ded0] rounded-xl text-xs"
                            />
                          </div>

                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingReportId(null)}
                              className="px-3 py-1.5 bg-gray-200 text-xs rounded-xl font-bold"
                            >
                              Cancelar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveEdit(rep.id)}
                              className="px-4 py-1.5 bg-[#2d2926] text-white text-xs font-bold rounded-xl"
                            >
                              Guardar Cambios
                            </button>
                          </div>
                        </div>
                      </td>
                    ) : (
                      <>
                        <td className="p-4 font-bold">
                          Hab. {rep.roomNumber}
                          <span className="block text-[11px] font-normal text-[#5a524c]">{rep.roomType}</span>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          {rep.date}
                          <span className="block text-[10px] text-[#988f86]">{rep.createdAt}</span>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-[#f7f4ed] border border-[#e5ded0] rounded-lg text-xs font-bold">
                            {rep.category}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-xs max-w-xs">{rep.description}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            rep.priority === 'Urgente' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {rep.priority}
                          </span>
                        </td>
                        <td className="p-4 text-xs font-semibold text-[#5a524c]">{rep.reportedBy}</td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => toggleResolveReport(rep.id)}
                              className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors ${
                                rep.isResolved
                                  ? 'bg-green-100 text-green-700 border-green-300'
                                  : 'bg-red-100 text-red-700 border-red-300'
                              }`}
                            >
                              {rep.isResolved ? '✓ Resuelto' : '⚠️ Pendiente'}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleStartEdit(rep)}
                              className="px-2 py-1 bg-[#f7f4ed] hover:bg-[#e5ded0] text-[#2d2926] font-bold rounded-lg text-xs"
                              title="Editar reporte"
                            >
                              ✏️
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}