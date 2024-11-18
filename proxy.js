// proxy.js

import http from "http";

// Create an HTTP server that acts as a proxy
const server = http.createServer((clientReq, clientRes) => {
  // Options for the request to the backend server
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: clientReq.url,
    method: clientReq.method,
    headers: clientReq.headers,
  };

  // Make a request to the backend server
  const proxyReq = http.request(options, (proxyRes) => {
    // Pass through the response headers and status code
    clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
    // Pipe the response data back to the client
    proxyRes.pipe(clientRes, { end: true });
  });

  // Handle errors on the proxy request
  proxyReq.on('error', (err) => {
    console.error('Proxy request error:', err);
    if (!clientRes.headersSent) {
      clientRes.writeHead(502, { 'Content-Type': 'text/plain' });
    }
    clientRes.end('Bad Gateway');

    console.log('--- Incoming Request ---');
    console.log('Method:', clientReq.method);
    console.log('URL:', clientReq.url);
    console.log('Headers:', clientReq.headers);
    console.log('------------------------');
  });

  // Handle errors on the client request
  clientReq.on('error', (err) => {
    console.error('Client request error:', err);
  });

  // Pipe the client request data to the proxy request
  clientReq.pipe(proxyReq, { end: true });
});

// Start the proxy server
server.listen(8080, () => {
  console.log('Proxy server is listening on port 8080');
});
