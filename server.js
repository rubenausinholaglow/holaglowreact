const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Proxy the paths that should go to Framer
  server.use(
    '/landing/probador-virtual',
    createProxyMiddleware({
      target:
        'https://practical-discussions-804147.framer.app/landing/probador-virtual/',
      changeOrigin: true,
      pathRewrite: {
        '^/landing/probador-virtual': '/', // if needed, you can modify the path here
      },
    })
  );

  server.all('*', (req, res) => handle(req, res));

  server.listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

module.exports = app;
