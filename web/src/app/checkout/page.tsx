import BookingForm from "./booking-form";

const Checkout = () => {
  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 0,    
    }}>
      <BookingForm/>
    </div>
  )
}

export default Checkout;
