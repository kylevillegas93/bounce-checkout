export interface CreateBookingRequest {
  name: string;
  email: string;
  storeId: string;
  quantity: number;
  basePrice: number;
}
