'use client';

import React, { useState } from 'react';
import Calendar, { CalendarDayItem } from '@/components/ui/Calendar';
import RoomReportModal from './RoomReportModal';
import {
  HousekeepingTask,
  HousekeepingStatus,
  Staff,
  RoomReportItem,
  StatusChangeLog,
} from '@/types/housekeeping';

interface HousekeepingClientProps {
  initialTasks: HousekeepingTask[];
  staffList: Staff[];
  currentUser: Staff;
}

export default function HousekeepingClient({
  initialTasks,
  staffList,
  currentUser,
}: HousekeepingClientProps) {
  const [tasks, setTasks] = useState<HousekeepingTask[]>(initialTasks);
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [filterStatus, setFilterStatus] = useState<string>('Todos');
  const [selectedStaffFilter, setSelectedStaffFilter] = useState<string>('Todos');

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedTaskForReport, setSelectedTaskForReport] = useState<HousekeepingTask | null>(null);

  const getTasksForCalendarDate = (dateStr: string): CalendarDayItem[] => {
    return tasks
      .filter((t) => t.date === dateStr)
      .map((t) => ({
        id: t.id,
        label: `Hab. ${t.roomNumber} (${t.reports.length} rep.)`,
      }));
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesDate = selectedDate ? t.date === selectedDate : true;
    const matchesStatus = filterStatus === 'Todos' || t.housekeepingStatus === filterStatus;
    const matchesStaff = selectedStaffFilter === 'Todos' || t.assignedStaffId === selectedStaffFilter;
    return matchesDate && matchesStatus && matchesStaff;
  });

  // 🔄 Guardar cambio de estado de limpieza Y registrar en el historial
  const handleStatusChange = (taskId: string, newStatus: HousekeepingStatus) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          if (t.housekeepingStatus === newStatus) return t; // Sin cambios

          const newLog: StatusChangeLog = {
            id: `LOG-${Math.floor(Math.random() * 10000)}`,
            previousStatus: t.housekeepingStatus,
            newStatus,
            changedBy: currentUser.name,
            timestamp: nowTime,
          };

          const updatedTask = {
            ...t,
            housekeepingStatus: newStatus,
            lastUpdated: nowTime,
            statusHistory: [newLog, ...(t.statusHistory || [])], // Insertar arriba en la bitácora
          };

          if (selectedTaskForReport?.id === taskId) {
            setSelectedTaskForReport(updatedTask);
          }

          return updatedTask;
        }
        return t;
      })
    );
  };

  const handleAssignStaff = (taskId: string, staffId: string) => {
    const staff = staffList.find((s) => s.id === staffId);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              assignedStaffId: staffId,
              assignedStaffName: staff ? staff.name : 'Sin asignar',
            }
          : t
      )
    );
  };

  const handleSaveReport = (taskId: string, newReportData: Omit<RoomReportItem, 'id' | 'createdAt'>) => {
    const newReport: RoomReportItem = {
      ...newReportData,
      id: `REP-${Math.floor(Math.random() * 10000)}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedReports = [...t.reports, newReport];
          const updatedTask = { ...t, reports: updatedReports };
          if (selectedTaskForReport?.id === taskId) {
            setSelectedTaskForReport(updatedTask);
          }
          return updatedTask;
        }
        return t;
      })
    );
  };

  const getStatusSelectStyle = (status: HousekeepingStatus) => {
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
    <div className="p-6 bg-[#f7f4ed]/40 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2d2926]">
            Gestión de Limpieza & Ama de Llaves
          </h1>
          <p className="text-sm text-[#5a524c]">
            Cambios de estado con registro de auditoría en tiempo real.
          </p>
        </div>

        <div className="flex bg-white p-1 rounded-xl border border-[#e5ded0] shadow-sm">
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'table' ? 'bg-[#2d2926] text-white' : 'text-[#5a524c]'
            }`}
          >
            Vista Tabla
          </button>
          <button
            type="button"
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'calendar' ? 'bg-[#2d2926] text-white' : 'text-[#5a524c]'
            }`}
          >
            Vista Calendario
          </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={(d) => setSelectedDate(d)}
          getItemsForDate={getTasksForCalendarDate}
        />
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#e5ded0] shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f7f4ed]/50 border-b border-[#e5ded0] text-xs uppercase font-semibold text-[#5a524c]">
                  <th className="p-4">Habitación</th>
                  <th className="p-4">Estado de Limpieza</th>
                  <th className="p-4">Camarista Asignada</th>
                  <th className="p-4">Última Modificación</th>
                  <th className="p-4 text-center">Reportes & Historial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5ded0] text-sm text-[#2d2926]">
                {filteredTasks.map((item) => {
                  const lastLog = item.statusHistory && item.statusHistory[0];

                  return (
                    <tr key={item.id} className="hover:bg-[#f7f4ed]/30 transition-colors">
                      <td className="p-4 font-bold">
                        Habitación {item.roomNumber}
                        <span className="block text-[11px] font-normal text-[#5a524c]">{item.roomType}</span>
                      </td>

                      {/* Selector de Estado que dispara la auditoría */}
                      <td className="p-4">
                        <select
                          value={item.housekeepingStatus}
                          onChange={(e) => handleStatusChange(item.id, e.target.value as HousekeepingStatus)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border outline-none cursor-pointer ${getStatusSelectStyle(item.housekeepingStatus)}`}
                        >
                          <option value="Sucia">Sucia</option>
                          <option value="En Limpieza">En Limpieza</option>
                          <option value="Inspeccionada">Inspeccionada</option>
                          <option value="Limpia">Limpia</option>
                        </select>
                      </td>

                      <td className="p-4">
                        <select
                          value={item.assignedStaffId || ''}
                          onChange={(e) => handleAssignStaff(item.id, e.target.value)}
                          className="px-3 py-1.5 bg-[#f7f4ed] border border-[#e5ded0] rounded-xl text-xs font-semibold"
                        >
                          <option value="">Sin Asignar</option>
                          {staffList.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </td>

                      {/* Visualización rápida de la última persona que cambió el estado */}
                      <td className="p-4">
                        <span className="font-mono text-xs font-semibold text-[#2d2926] block">
                          {item.lastUpdated}
                        </span>
                        {lastLog ? (
                          <span className="text-[10px] text-[#5a524c]">Por: <strong>{lastLog.changedBy}</strong></span>
                        ) : (
                          <span className="text-[10px] text-[#988f86]">Sin cambios hoy</span>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTaskForReport(item);
                            setReportModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-[#f7f4ed] border border-[#e5ded0] hover:bg-[#e5ded0] text-[#2d2926] text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5"
                        >
                          📋 Ver Detalle / Historial
                          <span className="bg-[#c0a060] text-white px-2 py-0.5 rounded-full text-[10px]">
                            {item.reports.length}
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal que muestra el historial de cambios y permite crear reportes */}
      <RoomReportModal
        isOpen={reportModalOpen}
        task={selectedTaskForReport}
        currentUser={currentUser}
        onClose={() => setReportModalOpen(false)}
        onSaveReport={handleSaveReport}
      />
    </div>
  );
}