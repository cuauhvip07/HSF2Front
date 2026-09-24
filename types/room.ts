// types/room.ts
export interface Room {
  id: number | string;
  title: string;
  capacity: string;
  description: string;
  priceMin: string;
  priceRegular: string;
  priceHigh: string;
  image: string;
}