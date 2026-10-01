export type HousekeepingStatus = 'Sucia' | 'En Limpieza' | 'Inspeccionada' | 'Limpia';
export type MaintenancePriority = 'Baja' | 'Media' | 'Alta' | 'Urgente';

export interface Staff {
  id: string;
  name: string;
  role: 'Camarista' | 'Mantenimiento' | 'Supervisora' | 'Admin';
}

// 📜 Registro individual de cambio de estado
export interface StatusChangeLog {
  id: string;
  previousStatus: HousekeepingStatus;
  newStatus: HousekeepingStatus;
  changedBy: string; // Nombre del usuario que realizó el cambio
  timestamp: string; // Hora/Fecha del cambio
}

export interface RoomReportItem {
  id: string;
  roomId: string;
  roomNumber: string;
  roomType: string;
  date: string;
  category: 'Mantenimiento' | 'Limpieza' | 'Incidencia';
  description: string;
  priority: MaintenancePriority;
  reportedBy: string;
  createdAt: string;
  isResolved: boolean;
}

export interface HousekeepingTask {
  id: string;
  roomId: string;
  roomNumber: string;
  roomType: string;
  date: string;
  housekeepingStatus: HousekeepingStatus;
  assignedStaffId?: string;
  assignedStaffName?: string;
  lastUpdated: string;
  statusHistory: StatusChangeLog[]; // 👈 Historial de cambios de estado
  reports: RoomReportItem[];
}