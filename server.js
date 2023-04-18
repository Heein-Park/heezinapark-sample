const express = require('express');
const next = require('next');

const httpport = 30088;
const host = 'localhost';
const dev = process.env.NODE_ENV !== 'production';
const nextapp = next({ dev });
const handle = nextapp.getRequestHandler();

const http = require('http');

nextapp.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(httpport, host, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${host}:${httpport}`);
  });
});
