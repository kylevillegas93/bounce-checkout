import { Request, Response } from 'express';
import { PoolClient } from "pg";
import { dbPool } from "../db/dbPool";
import { CreateBookingRequest } from "../model/booking";
import { v4 as uuidv4 } from 'uuid';
import * as superagent from 'superagent';

// TODO: determine store capacity dynamically
const storeCapacity = 5;

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  // TODO: add validation of the request body fields
  const { name, email, storeId, quantity, basePrice } = req.body as CreateBookingRequest;
  let dbClient: PoolClient | null = null;

  try {
    const calculatePriceReponse = await superagent
      .get('https://fullstack-challenge-api.usebounce.io/v1/pricing/calculate')
      .query({ quantity: quantity, base_price: Math.floor(basePrice * 100), store_capacity: storeCapacity})
      .ok((response) => response.status < 500);
    const calculatePriceBody = calculatePriceReponse.body as { detail?: any, total?: number };

    if (!calculatePriceReponse.ok) {
      console.error('Failed to calculate price');
      res.status(500).json({ error: calculatePriceBody.detail || 'Failed to create booking' });
      return;
    }

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
      storeId,
      null,
      basePrice * quantity,
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

    res.status(201).json({ id: bookingId });
  } catch (error) {
    console.error('Failed to create booking', error);
    res.status(500).json({ error: 'Failed to create booking' });
  } finally {
    if (dbClient) dbClient.release();
  }
}
