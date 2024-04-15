const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const server = express();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

server.use(
  '/thank-you-2',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/landing/probador-virtual',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/landing/holaglow-bcn',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/checkout-bcn',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/landing/bodas',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/blog',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/landing/visita-medica-mgm',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/landing/visita-medica',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);

server.use(
  '/landing/holaglow',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/landing/armonizacion-facial',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/landing/test',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/landing/visita-medica-madrid',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/landing/visita-medica-barcelona',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/valencia',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/multistep',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/form',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/agenda',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/thank-you/madrid',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/thank-you/barcelona',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/thank-you/valencia',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/thank-you-1',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/thank-you-3',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/appointment-confirmed/barcelona',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/appointment-confirmed/valencia',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  '/appointment-confirmed/madrid',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);

server.all('*', (req, res) => handle(req, res));

module.exports = (req, res) => {
  return server(req, res);
};
