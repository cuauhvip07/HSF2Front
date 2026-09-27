export interface Reservation {
  id: string;
  guestId: string;       
  guestName: string;     
  roomType: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  amount: string;
  status: 'Confirmado' | 'Checked-in' | 'Pendiente' | 'Cancelado';
}