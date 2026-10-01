'use client';

import React, { useState, useEffect } from 'react';
import {
  HousekeepingTask,
  HousekeepingStatus,
  RoomReportItem,
  MaintenancePriority,
  Staff,
} from '@/types/housekeeping';

interface RoomReportModalProps {
  isOpen: boolean;
  task: HousekeepingTask | null;
  currentUser: Staff;
  onClose: () => void;
  onSaveReport: (taskId: string, newReport: Omit<RoomReportItem, 'id' | 'createdAt'>) => void;
}

export default function RoomReportModal({
  isOpen,
  task,
  currentUser,
  onClose,
  onSaveReport,
}: RoomReportModalProps) {
  const [activeTab, setActiveTab] = useState<'reports' | 'history'>('reports');
  const [category, setCategory] = useState<'Mantenimiento' | 'Limpieza' | 'Incidencia'>('Mantenimiento');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<MaintenancePriority>('Media');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !task) return null;

  const handleAddReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    onSaveReport(task.id, {
      roomId: task.roomId,
      roomNumber: task.roomNumber,
      roomType: task.roomType,
      date: task.date,
      category,
      description,
      priority,
      reportedBy: currentUser.name,
      isResolved: false,
    });

    setDescription('');
  };

  const getStatusBadge = (status: HousekeepingStatus) => {
    switch (status) {
      case 'Sucia':
        return 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]';
      case 'En Limpieza':
        return 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';
      case 'Inspeccionada':
        return 'bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]';
      case 'Limpia':
        return 'bg-[#d1fae5] text-[#065f46] border-[#a7f3d0]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d2926]/60 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-[#e5ded0] overflow-hidden flex flex-col z-10 max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#f7f4ed] px-6 py-4 border-b border-[#e5ded0] flex justify-between items-center sticky top-0 z-20">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#c0a060] uppercase tracking-wider block">
              FECHA: {task.date}
            </span>
            <h2 className="font-serif text-xl font-bold text-[#2d2926]">
              Habitación N° {task.roomNumber} ({task.roomType})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#5a524c] hover:text-[#2d2926] rounded-lg transition-colors font-bold"
          >
            ✕
          </button>
        </div>

        {/* Pestañas de Navegación del Modal */}
        <div className="flex border-b border-[#e5ded0] bg-[#f7f4ed]/50 px-6 pt-2">
          <button
            onClick={() => setActiveTab('reports')}
            className={`pb-2 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'reports'
                ? 'border-[#2d2926] text-[#2d2926]'
                : 'border-transparent text-[#5a524c] hover:text-[#2d2926]'
            }`}
          >
            📋 Reportes ({task.reports.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'history'
                ? 'border-[#2d2926] text-[#2d2926]'
                : 'border-transparent text-[#5a524c] hover:text-[#2d2926]'
            }`}
          >
            📜 Historial de Cambios ({task.statusHistory?.length || 0})
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          {/* PESTAÑA 1: CREAR Y VER REPORTES */}
          {activeTab === 'reports' && (
            <>
              {/* Formulario para Crear Nuevo Reporte */}
              <form onSubmit={handleAddReport} className="bg-white p-4 rounded-xl border border-[#e5ded0] space-y-3 shadow-sm">
                <h4 className="text-xs font-bold text-[#2d2926] uppercase tracking-wider">
                  + Crear Nuevo Reporte
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-[#5a524c] uppercase mb-1">Categoría *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-xs font-semibold text-[#2d2926] outline-none"
                    >
                      <option value="Mantenimiento">Mantenimiento</option>
                      <option value="Limpieza">Limpieza</option>
                      <option value="Incidencia">Incidencia / Pérdida</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#5a524c] uppercase mb-1">Prioridad *</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as MaintenancePriority)}
                      className="w-full p-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-xs font-semibold text-[#2d2926] outline-none"
                    >
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                      <option value="Urgente">Urgente</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#5a524c] uppercase mb-1">Reportado Por</label>
                    <input
                      type="text"
                      value={`${currentUser.name} (${currentUser.role})`}
                      disabled
                      readOnly
                      className="w-full p-2.5 bg-[#e5ded0]/40 border border-[#e5ded0] rounded-xl text-xs font-bold text-[#5a524c] cursor-not-allowed outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#5a524c] uppercase mb-1">Descripción Detallada *</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ej. Fuga de agua en lavabo, control remoto dañado..."
                    className="w-full p-2.5 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-xs outline-none focus:border-[#c0a060]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#c0a060] hover:bg-[#a88a4d] text-white text-xs font-bold uppercase rounded-xl transition-colors"
                >
                  Guardar Reporte
                </button>
              </form>

              {/* Lista de Reportes */}
              <div className="space-y-3">
                {task.reports.length === 0 ? (
                  <p className="text-xs text-[#988f86]">No hay reportes en esta habitación.</p>
                ) : (
                  task.reports.map((rep) => (
                    <div key={rep.id} className="p-4 bg-white border border-[#e5ded0] rounded-xl text-xs space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="font-mono text-[10px] text-[#c0a060] font-bold block">
                            [{rep.category}] - {rep.createdAt}
                          </span>
                          <p className="font-bold text-[#2d2926] text-sm mt-0.5">{rep.description}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          rep.priority === 'Urgente' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {rep.priority}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-[#5a524c] text-[11px] pt-2 border-t border-[#f7f4ed]">
                        <span>Reportó: <strong className="text-[#2d2926]">{rep.reportedBy}</strong></span>
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          rep.isResolved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {rep.isResolved ? '✓ Resuelto' : '⚠️ Pendiente'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* PESTAÑA 2: HISTORIAL DE CAMBIOS DE ESTADO */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#c0a060] uppercase tracking-wider">
                Bitácora de Cambios de Estado
              </h4>

              {!task.statusHistory || task.statusHistory.length === 0 ? (
                <p className="text-xs text-[#988f86]">No hay registros de cambios para esta habitación hoy.</p>
              ) : (
                <div className="space-y-2">
                  {task.statusHistory.map((log) => (
                    <div key={log.id} className="p-3 bg-white border border-[#e5ded0] rounded-xl text-xs flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusBadge(log.previousStatus)}`}>
                            {log.previousStatus}
                          </span>
                          <span className="text-[#988f86]">➔</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusBadge(log.newStatus)}`}>
                            {log.newStatus}
                          </span>
                        </div>
                        <span className="block text-[11px] text-[#5a524c]">
                          Modificado por: <strong className="text-[#2d2926]">{log.changedBy}</strong>
                        </span>
                      </div>

                      <span className="font-mono text-xs text-[#988f86] font-semibold">
                        {log.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f7f4ed] border-t border-[#e5ded0] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#2d2926] text-white text-xs font-bold uppercase rounded-xl"
          >
            Cerrar Modal
          </button>
        </div>
      </div>
    </div>
  );
}