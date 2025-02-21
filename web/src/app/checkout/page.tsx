'use client';

import { useState } from 'react';
import BookingForm from "./booking-form";
import BookingOverlay from "./booking-overlay"

const Checkout = () => {
  // Assuming the customer has selected a store and we know details about said store
  const storeId = '9844bd5d-e866-421f-9691-52a0528948e1';
  const basePrice = 5.90;
  const storeName = `Cody's Cookie store`;

  const [placingBooking, setPlacingBooking] = useState(false);
  const [placedBooking, setPlacedBooking] = useState(false);
  const [bookingFailed, setBookingFailed] = useState(false);

  const placeBooking = async ({ numberOfBags, name, email }: { numberOfBags: number, name: string, email: string }) => {
    setPlacingBooking(true);

    const bookingResponse = await fetch('http://localhost:4000/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name, 
        email: email,
        quantity: numberOfBags,
        basePrice: basePrice,
        storeId: storeId,
      })
    });

    setPlacingBooking(false);

    if (bookingResponse.ok) {
      setPlacedBooking(true);
    } else {
      setBookingFailed(true);
    }
  };

  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <BookingOverlay placing={placingBooking} placed={placedBooking} />
      <BookingForm storeName={storeName} pricePerBag={basePrice} onSubmit={placeBooking} retry={bookingFailed} />
    </div>
  )
}

export default Checkout;
