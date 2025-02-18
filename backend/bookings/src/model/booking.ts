export interface CreateBookingRequest {
  name: string;
  email: string;
  store_id: string;
  quantity: number;
  base_price: number;
}
