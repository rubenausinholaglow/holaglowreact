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
  '/checkout/thank-you-1',
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
  '/appointment-cancel',
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
  '/appointment-confirmed/madrid',
  createProxyMiddleware({
    target: 'https://practical-discussions-804147.framer.app',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-labios/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-piel/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-capilares/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/otros-tratamientos/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-laser/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-labios/aumento-labios/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/aumento-labios',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-labios/sonrisa-gingival/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/sonrisa-gingival',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/proyeccion-pomulos/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/proyeccion-pomulos',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/relleno-surco-nasogeniano/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/surco-nasogeniano',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/codigo-barras/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/codigo-barras',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/arrugas-entrecejo-patas-gallo/',
  createProxyMiddleware({
    target:
      'https://www.holaglow.com/tratamientos/arrugas-entrecejo-patas-gallo',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/arrugas-expresion/',
  createProxyMiddleware({
    target:
      'https://www.holaglow.com/tratamientos/arrugas-expresion-frente-entrecejo-patas-gallo',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/proyeccion-menton/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/proyeccion-menton',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/proyeccion-mandibula/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/proyeccion-mandibula',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/relleno-ojeras/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/relleno-ojeras',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/rinomodelacion/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/rinomodelacion',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/prevencion-arrugas/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/prevencion-arrugas',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-piel/revitalizacion-facial/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/mesoterapia-facial',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-piel/peeling-quimico/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/peeling-quimico',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-capilares/rejuvenecimiento-capilar/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/rejuvenecimiento-capilar',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/otros-tratamientos/bruxismo/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/bruxismo',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-laser/laser/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/hilos-tensores-faciales/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/hilos-tensores-faciales',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/hilos-tensores-cuello/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/hilos-tensores-cuello',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/packs/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/packs/prevencion/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/pack-prevencion',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/packs/armonizacion-facial/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/armonizacion-facial',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/packs/wellaging-plus/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/pack-wellaging-plus',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/packs/full-face/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/pack-full-face',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/packs/glow/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/glow-pack',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/packs/wellaging-esencial/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/pack-wellaging-esencial',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/packs/skin-care/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/skin-care-pack',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/lifting-liquido/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/lifting-liquido',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/relleno-lineas-marioneta/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/relleno-lineas-marioneta',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-faciales/elevacion-cejas/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/volumen-perfilado-cejas',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-piel/hidratacion-profunda/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/hidratacion-profunda',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-piel/rejuvenecimiento-dinamico/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/rejuvenecimiento-dinamico',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-piel/hydrafacial',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/hydrafacial',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/tratamientos-piel/microneedling/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/microneedling',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/landing/hydrafacial/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/hydrafacial',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/about-us',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/quienes-somos',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/landing/aumento-labios',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/aumento-labios',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/landing/dermapen/',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/microneedling',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/old-home-2',
  createProxyMiddleware({
    target: 'https://www.holaglow.com',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/old-home-4',
  createProxyMiddleware({
    target: 'https://www.holaglow.com',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/old-home-3',
  createProxyMiddleware({
    target: 'https://www.holaglow.com',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/home',
  createProxyMiddleware({
    target: 'https://www.holaglow.com',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/clinicas-holaglow',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/clinicas',
    changeOrigin: true,
  })
);
server.use(
  'https://holaglow.com/landing/sonrisa-gingival',
  createProxyMiddleware({
    target: 'https://www.holaglow.com/tratamientos/sonrisa-gingival',
    changeOrigin: true,
  })
);
server.all('*', (req, res) => handle(req, res));

module.exports = (req, res) => {
  return server(req, res);
};
