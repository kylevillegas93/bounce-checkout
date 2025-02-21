'use client';

import React, { useState } from 'react';

const BookingForm = (
  { 
    storeName, 
    pricePerBag, 
    onSubmit,
    retry
  }: 
  { 
    storeName: string, 
    pricePerBag: number,
    onSubmit: ({ numberOfBags, name, email }: { numberOfBags: number, name: string, email: string}) => void,
    retry: boolean
  }) => {
  const [numberOfBags, setNumberOfBags] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const disableForm = !numberOfBags || !name || !email || !cardNumber;

  const handleSubmit = () => {
    onSubmit({ numberOfBags, name, email });
  }
  
  // TODO: refactor - separate styling and cleanup spacing
  // TODO: add more form validation/messaging designs
  return (
    <div  
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minWidth: '80%',
      }}
    >
      <span>Booking storage at:</span>
      <strong>{storeName}</strong>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '30px 0px 30px' }}>
        <span style={{ fontSize: '18px' }}>Number of bags</span>
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

      {retry && (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}>
          <span>Your booking has failed.</span>
          <span>Please try again.</span>
        </div>
      )}

      <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: !retry ? '60px' : '10px', 
          borderTop: '1px solid #A9A9A9',
          paddingTop: '30px',
          flexGrow: 1
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px' }}>{numberOfBags} {numberOfBags === 1 ? 'bag' : 'bags'}</span>
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{'$' + (numberOfBags * pricePerBag).toFixed(2)}</span>
        </div>
        
        <button
          onClick={handleSubmit}
          type='submit'
          disabled={disableForm}
          style={{
            padding: '5px 25px',
            borderRadius: '2px',
            background: disableForm ? '#B2CEFF' : retry ? '#F54B23': '#649DFF',
            color: disableForm ? 'grey' : 'black',
            border: 'none',
            cursor: disableForm ? 'not-allowed' : 'pointer'
          }}
        >
          {retry ? 'Retry' : 'Book'}
        </button>
      </div>
    </div>
  )
}

export default BookingForm;
