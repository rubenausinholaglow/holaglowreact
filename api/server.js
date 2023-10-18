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
    target:
      'https://practical-discussions-804147.framer.app/landing/probador-virtual/',
    changeOrigin: true,
    pathRewrite: {
      '^/landing/probador-virtual': '/', // if needed, you can modify the path here
    },
  })
);
server.use(
  '/blog',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app/blog',
    changeOrigin: true,
    pathRewrite: {
      '^/blog': '/', // if needed, you can modify the path here
    },
  })
);
server.use(
  '/landing/visita-medica-mgm',
  createProxyMiddleware({
    target:
      'https://practical-discussions-804147.framer.app/landing/visita-medica-mgm/',
    changeOrigin: true,
    pathRewrite: {
      '^/landing/visita-medica-mgm': '/', // if needed, you can modify the path here
    },
  })
);

server.all('*', (req, res) => handle(req, res));

module.exports = (req, res) => {
  return server(req, res);
};
