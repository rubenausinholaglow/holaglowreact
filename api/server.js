const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const server = express();

server.all('/landing/probador-virtual', (req, res) => {
  // Redirect to your Framer URL or handle the proxy here
  createProxyMiddleware({
    target:
      'https://practical-discussions-804147.framer.app/landing/probador-virtual/',
    changeOrigin: true,
    pathRewrite: {
      '^/landing/probador-virtual': '/', // if needed, you can modify the path here
    },
  });
});

server.all('*', (req, res) => {
  // Handle other routes or simply forward to your Next.js app
  res.send('Other routes here');
});

module.exports = (req, res) => {
  return server(req, res);
};
