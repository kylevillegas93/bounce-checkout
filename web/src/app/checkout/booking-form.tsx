'use client';

import React, { useState } from 'react';

const BookingForm = () => {
  const [numberOfBags, setNumberOfBags] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const submitBooking = () => {
    console.log('Booked!');
    // TODO: call backend
  }
  
  const disableForm = !numberOfBags || !name || !email || !cardNumber;

  return (
    <form 
      onSubmit={submitBooking} 
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minWidth: '80%',
        margin: '40px',
      }}
    >
      <span>Booking storage at:</span>
      <strong>Cody’s Cookie Store</strong>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', marginBottom: '30px' }}>
        <span style={{ display: 'flex', fontSize: '18px' }}>Number of bags</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <button 
            type='button' 
            onClick={() => setNumberOfBags(Math.max(1, numberOfBags - 1))}
            disabled={numberOfBags == 0}
            style={{ 
              padding: '5px 10px', 
              background: numberOfBags == 1 ? '#B2CEFF' : '#649DFF', 
              border: 'none', 
              color: numberOfBags == 1 ? 'grey' : 'black', 
              cursor: numberOfBags == 1 ? 'not-allowed' : 'pointer',
              borderRadius: '2px' 
            }}
          >
            -
          </button>
          <span style={{ padding: '5px' }}>{numberOfBags}</span>
          <button 
            type='button' 
            onClick={() => setNumberOfBags(numberOfBags + 1)}
            style={{ padding: '5px 10px', background: '#649DFF', border: 'none', color: 'black', cursor: 'pointer', borderRadius: '2px' }}
          >
            +
          </button>
        </div>
      </div>

      <span style={{ fontSize: '18px', borderTop: '0.5px solid grey', paddingTop: '20px' }}>Personal Details</span>
      <label htmlFor='name'>Name</label>
      <input 
        type='text' 
        name='name'
        required
        style={{ borderRadius: '4px', maxWidth: '250px', height: '25px' }}
        onChange={(event) => setName(event.target.value)} 
      />

      <label htmlFor='email'>Email</label>
      <input 
        type='email' 
        name='email' 
        required
        style={{ borderRadius: '4px', maxWidth: '250px', height: '25px' }}
        onChange={(event) => setEmail(event.target.value)} 
      />

      <span style={{ fontSize: '18px', borderTop: '0.5px solid grey', paddingTop: '20px', marginTop: '20px' }}>Payment Information</span>
      <label htmlFor='card'>Card Details</label>
      <input 
        type='text' 
        name='card'
        inputMode='numeric'
        required
        style={{ borderRadius: '4px', maxWidth: '250px', height: '25px' }}
        onChange={(event) => setCardNumber(event.target.value)} 
      />


      <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '100px', 
          borderTop: '1px solid #A9A9A9',
          paddingTop: '30px'  
      }}>
        <span style={{ fontSize: '14px' }}>
          {numberOfBags} {numberOfBags === 1 ? 'bag' : 'bags'}
          <br/>
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>${(numberOfBags * 5.90).toFixed(2)}</span>
        </span>
        <button 
          type='submit'
          disabled={disableForm}
          style={{
            padding: '10px 20px',
            borderRadius: '2px',
            background: disableForm ? '#B2CEFF' : '#649DFF',
            color: disableForm ? 'grey' : 'black',
            border: 'none',
            cursor: disableForm ? 'not-allowed' : 'pointer'
          }}
        >
          Book
        </button>
      </div>
    </form>
  )
}

export default BookingForm;
