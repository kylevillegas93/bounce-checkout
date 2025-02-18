import * as http from 'http';
import { createBooking } from './db/createBooking'; // Import your booking creation logic

const bookingServiceHandler = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  if (req.method === 'POST' && req.url === '/bookings') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const bookingRequest = JSON.parse(body);
        const newBooking = await createBooking(bookingRequest);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newBooking));
      } catch (err) {
        console.error('Error creating booking:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error creating booking' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
};

const server = http.createServer(bookingServiceHandler);

server.listen(4000, () => {
  console.log('Booking service is running on port 4000');
});
