import { createBooking } from './api/createBooking';
import express from 'express'
import cors from 'cors';

const app = express();
const port = process.env.API_PORT || 4000;

app.use(express.json());
app.use(cors());

app.post('/bookings', (req: express.Request, res: express.Response) => {
  createBooking(req, res);
});

app.listen(port, () => {
  console.log(`Bookings service listening on port ${port}`)
});
