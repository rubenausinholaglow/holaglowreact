const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');
const server = express();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const arrayUrls = ['/landing/probador-virtual', '/blog'];
arrayUrls.forEach(x => {
  server.use(
    x,
    createProxyMiddleware({
      target: 'https://practical-discussions-804147.framer.app' + x,
      changeOrigin: true,
      pathRewrite: {
        x: '/', // if needed, you can modify the path here
      },
    })
  );
});

server.all('*', (req, res) => handle(req, res));

module.exports = (req, res) => {
  return server(req, res);
};
