import * as http from 'http';

export const routeToService = (res: http.ServerResponse, options: http.RequestOptions, body: Buffer): void => {
  const serviceRequest = http.request(options, (serviceResponse) => {
    let data = '';

    serviceResponse.on('data', (chunk: Buffer) => {
      data += chunk;
    });

    serviceResponse.on('end', () => {
      res.statusCode = serviceResponse.statusCode || 200;
      
      Object.entries(serviceResponse.headers).forEach(([key, value]) => {
        if (value) {
          res.setHeader(key, value as string);
        }
      });

      res.end(data);
    });
  });

  serviceRequest.on('error', (error: Error) => {
    res.statusCode = 500;
    res.end(`Unexpected server error: ${error.message}`);
  });

  if (body.length > 0) {
    serviceRequest.write(body);
  }

  serviceRequest.end();
}
