import * as http from 'http';
import { serviceRouter } from './serviceRouter';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  const url = req.url || '';
  let body: any[] = [];

  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const requestBody = Buffer.concat(body);

    if (serviceRouter[url]) {
      return serviceRouter[url](req, res, requestBody);
    }

    res.statusCode = 404;
    res.end("Route not found");
  });
});

server.listen(3000, () => {
  console.log("API is running on port 3000");
});
