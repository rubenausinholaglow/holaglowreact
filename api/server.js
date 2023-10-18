const express = require('express');
const server = express();

server.all('/landing/probador-virtual', (req, res) => {
  // Redirect to your Framer URL or handle the proxy here
  res.redirect(
    'https://practical-discussions-804147.framer.app/landing/probador-virtual/'
  );
});

server.all('*', (req, res) => {
  // Handle other routes or simply forward to your Next.js app
  res.send('Other routes here');
});

module.exports = (req, res) => {
  return server(req, res);
};
