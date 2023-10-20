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
server.use(
  '/landing/visita-medica',
  createProxyMiddleware({
    target:
      'https://practical-discussions-804147.framer.app/landing/visita-medica/',
    changeOrigin: true,
    pathRewrite: {
      '^/landing/visita-medica': '/', // if needed, you can modify the path here
    },
  })
);

server.use(
  '/landing/holaglow',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app/landing/holaglow/',
    changeOrigin: true,
    pathRewrite: {
      '^/landing/holaglow': '/', // if needed, you can modify the path here
    },
  })
);
server.use(
  '/landing/visita-medica-madrid',
  createProxyMiddleware({
    target:
      'https://practical-discussions-804147.framer.app/landing/visita-medica-madrid/',
    changeOrigin: true,
    pathRewrite: {
      '^/landing/visita-medica-madrid': '/', // if needed, you can modify the path here
    },
  })
);
server.use(
  '/landing/visita-medica-barcelona',
  createProxyMiddleware({
    target:
      'https://practical-discussions-804147.framer.app/landing/visita-medica-barcelona/',
    changeOrigin: true,
    pathRewrite: {
      '^/landing/visita-medica-barcelona': '/', // if needed, you can modify the path here
    },
  })
);
server.use(
  '/valencia',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app/valencia/',
    changeOrigin: true,
    pathRewrite: {
      '^/valencia': '/', // if needed, you can modify the path here
    },
  })
);
server.use(
  '/multistep',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app/multistep/',
    changeOrigin: true,
    pathRewrite: {
      '^/multistep': '/', // if needed, you can modify the path here
    },
  })
);
server.use(
  '/form',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app/form/',
    changeOrigin: true,
    pathRewrite: {
      '^/form': '/', // if needed, you can modify the path here
    },
  })
);
server.use(
  '/agenda',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app/agenda/',
    changeOrigin: true,
    pathRewrite: {
      '^/agenda': '/', // if needed, you can modify the path here
    },
  })
);
server.use(
  '/thank-you/madrid',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app/thank-you/madrid/',
    changeOrigin: true,
    pathRewrite: {
      '^/thank-you/madrid': '/', // if needed, you can modify the path here
    },
  })
);
server.use(
  '/thank-you/barcelona',
  createProxyMiddleware({
    target:
      'https://practical-discussions-804147.framer.app/thank-you/barcelona/',
    changeOrigin: true,
    pathRewrite: {
      '^/thank-you/barcelona': '/', // if needed, you can modify the path here
    },
  })
);
server.use(
  '/thank-you-1',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app/thank-you-1/',
    changeOrigin: true,
    pathRewrite: {
      '^/thank-you-1': '/', // if needed, you can modify the path here
    },
  })
);
server.use(
  '/thank-you-2',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    prependPath: true,
    changeOrigin: true,
    pathRewrite: {
      '^/thank-you-2': '/thank-you-2', // if needed, you can modify the path here
    },
  })
);
server.use(
  '/thank-you-3',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app/',
    prependPath: true,
    changeOrigin: true,
    pathRewrite: {
      '^/thank-you-3': '/thank-you-3', // if needed, you can modify the path here
    },
  })
);
server.use(
  '/thank-you',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app/',
    prependPath: true,
    changeOrigin: true,
  })
);
server.all('*', (req, res) => handle(req, res));

module.exports = (req, res) => {
  return server(req, res);
};
