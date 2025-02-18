import * as http from 'http'
import { routeToService } from './routeToService';

export const serviceRouter: { [key: string]: (req: http.IncomingMessage, res: http.ServerResponse, body: Buffer) => void } = {
  '/bookings': ((req: http.IncomingMessage, res: http.ServerResponse, body: Buffer): void => { 
    const options: http.RequestOptions = {
      hostname: 'bookings',
      port: 4000,
      path: '/bookings',
      method: req.method,
      headers: {
        ...req.headers,
        'Content-Length': Buffer.byteLength(body),
      }
    };

    routeToService(res, options, body)
  }),
};
