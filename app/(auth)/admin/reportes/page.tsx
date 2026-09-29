import ReportsAdminClient from '@/components/admin/reports/ReportsAdminClient';
import { RoomReportItem } from '@/types/housekeeping';

const today = new Date().toISOString().split('T')[0];

const mockAllReports: RoomReportItem[] = [
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
];

export default async function ReportsAdminPage() {
  return <ReportsAdminClient initialReports={mockAllReports} />;
}