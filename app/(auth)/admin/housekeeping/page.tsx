import HousekeepingClient from '@/components/admin/housekeeping/HousekeepingClient';
import { HousekeepingTask, Staff } from '@/types/housekeeping';

const today = new Date().toISOString().split('T')[0];

// Usuario autenticado actual
const mockCurrentUser: Staff = {
  id: 'ST-1',
  name: 'María López',
  role: 'Supervisora',
};

// Datos iniciales de prueba con la estructura de tipos actualizada
const mockTasks: HousekeepingTask[] = [
  {
    id: 'HK-101',
    roomId: '1',
    roomNumber: '101',
    roomType: 'Suite Presidencial',
    date: today,
    housekeepingStatus: 'Sucia',
    assignedStaffId: 'ST-1',
    assignedStaffName: 'María López',
    lastUpdated: '10:15 AM',
    statusHistory: [
      {
        id: 'LOG-1',
        previousStatus: 'En Limpieza',
        newStatus: 'Sucia',
        changedBy: 'María López',
        timestamp: '10:15 AM',
      },
    ],
    reports: [
      {
        id: 'REP-1',
        roomId: '1',
        roomNumber: '101',
        roomType: 'Suite Presidencial',
        date: today,
        category: 'Mantenimiento',
        description: 'Fuga de agua en llave de baño principal',
        priority: 'Urgente',
        reportedBy: 'María López',
        createdAt: '09:00 AM',
        isResolved: false,
      },
    ],
  },
  {
    id: 'HK-102',
    roomId: '2',
    roomNumber: '102',
    roomType: 'Habitación Doble',
    date: today,
    housekeepingStatus: 'En Limpieza',
    assignedStaffId: 'ST-2',
    assignedStaffName: 'Rosa Gómez',
    lastUpdated: '11:00 AM',
    statusHistory: [],
    reports: [],
  },
];

const mockStaff: Staff[] = [
  { id: 'ST-1', name: 'María López', role: 'Supervisora' },
  { id: 'ST-2', name: 'Rosa Gómez', role: 'Camarista' },
  { id: 'ST-3', name: 'Carlos Ruíz', role: 'Mantenimiento' },
];

export default async function HousekeepingPage() {
  return (
    <HousekeepingClient
      initialTasks={mockTasks}
      staffList={mockStaff}
      currentUser={mockCurrentUser}
    />
  );
}