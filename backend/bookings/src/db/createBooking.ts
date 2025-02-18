import { PoolClient } from "pg";
import { dbPool } from "./dbPool";
import { CreateBookingRequest } from "../model/booking";
import {v4 as uuidv4} from 'uuid';

export const createBooking = async (bookingRequest: CreateBookingRequest): Promise<{ id: string }> => {
  const { name, email, store_id, quantity, base_price } = bookingRequest;
  let dbClient: PoolClient | null = null;

  try {
    dbClient = await dbPool.connect();
    
    const createBookingQuery = `
      INSERT INTO bookings (id, name, email, store_id, user_id, total_price, total_quantity, items, starts_at, updated_at, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id
    `;

    const bookingResult = await dbClient.query(createBookingQuery, [
      uuidv4(),
      name,
      email,
      store_id,
      null,
      base_price * quantity,
      quantity,
      JSON.stringify({
        type: 'bag',
        quantity: quantity
      }),
      new Date(),
      new Date(),
      'STORED',
    ]);

    const bookingId = bookingResult.rows[0].id;

    return { id: bookingId };
  } finally {
    if (dbClient) dbClient.release();
  }
}
