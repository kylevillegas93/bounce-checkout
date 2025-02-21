const BookingOverlay = ({ placing, placed }: { placing: boolean, placed: boolean}) => {
  if (!placing && !placed) {
    return null;
  }

  return (
    <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: placing ? '20px': '30px',
          zIndex: 2,
          backdropFilter: placing ? 'blur(5px)' : 'none',
          backgroundColor: placing ? 'transparent' : 'black',
          pointerEvents: 'none',
        }}
      >
        {placing ? 'Placing booking...' : 'Booking Placed!' }
    </div>
  )
}

export default BookingOverlay;
