const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');
const server = express();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

server.use(
  '/landing/probador-virtual',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app/',
    changeOrigin: true,
  })
);
server.use(
  '/blog',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app/',
    changeOrigin: true,
  })
);

server.all('*', (req, res) => handle(req, res));

module.exports = (req, res) => {
  return server(req, res);
};
