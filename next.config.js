/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'budgetimages.blob.core.windows.net',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  async redirects() {
    return [
      {
        source: '/tratamientos-labios',
        destination: '/tratamientos',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales',
        destination: '/tratamientos',
        permanent: true,
      },
      {
        source: '/tratamientos-piel',
        destination: '/tratamientos',
        permanent: true,
      },
      {
        source: '/tratamientos-capilares',
        destination: '/tratamientos',
        permanent: true,
      },
      {
        source: '/otros-tratamientos',
        destination: '/tratamientos',
        permanent: true,
      },
      {
        source: '/tratamientos-laser',
        destination: '/tratamientos',
        permanent: true,
      },
      {
        source: '/tratamientos-labios/aumento-labios',
        destination: '/tratamientos/aumento-labios',
        permanent: true,
      },
      {
        source: '/tratamientos-labios/sonrisa-gingival',
        destination: '/tratamientos/sonrisa-gingival',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales/proyeccion-pomulos',
        destination: '/tratamientos/proyeccion-pomulos',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales/relleno-surco-nasogeniano',
        destination: '/tratamientos/surco-nasogeniano',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales/codigo-barras',
        destination: '/tratamientos/codigo-barras',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales/arrugas-entrecejo-patas-gallo',
        destination: '/tratamientos/arrugas-entrecejo-patas-gallo',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales/arrugas-expresion',
        destination:
          '/tratamientos/arrugas-expresion-frente-entrecejo-patas-gallo',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales/proyeccion-menton',
        destination: '/tratamientos/proyeccion-menton',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales/proyeccion-mandibula',
        destination: '/tratamientos/proyeccion-mandibula',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales/relleno-ojeras',
        destination: '/tratamientos/relleno-ojeras',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales/rinomodelacion',
        destination: '/tratamientos/rinomodelacion',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales/prevencion-arrugas',
        destination: '/tratamientos/prevencion-arrugas',
        permanent: true,
      },
      {
        source: '/tratamientos-piel/revitalizacion-facial',
        destination: '/tratamientos/mesoterapia-facial',
        permanent: true,
      },
      {
        source: '/tratamientos-piel/peeling-quimico',
        destination: '/tratamientos/peeling-quimico',
        permanent: true,
      },
      {
        source: '/tratamientos-capilares/rejuvenecimiento-capilar',
        destination: '/tratamientos/rejuvenecimiento-capilar',
        permanent: true,
      },
      {
        source: '/otros-tratamientos/bruxismo',
        destination: '/tratamientos/bruxismo',
        permanent: true,
      },
      {
        source: '/tratamientos-laser/laser',
        destination: '/tratamientos',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales/hilos-tensores-faciales',
        destination: '/tratamientos/hilos-tensores-faciales',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales/hilos-tensores-cuello',
        destination: '/tratamientos/hilos-tensores-cuello',
        permanent: true,
      },
      {
        source: '/packs',
        destination: '/tratamientos',
        permanent: true,
      },
      {
        source: '/packs/prevencion',
        destination: '/tratamientos/pack-prevencion',
        permanent: true,
      },
      {
        source: '/packs/armonizacion-facial',
        destination: '/tratamientos/armonizacion-facial',
        permanent: true,
      },
      {
        source: '/packs/wellaging-plus',
        destination: '/tratamientos/pack-wellaging-plus',
        permanent: true,
      },
      {
        source: '/packs/full-face',
        destination: '/tratamientos/pack-full-face',
        permanent: true,
      },
      {
        source: '/packs/glow',
        destination: '/tratamientos/glow-pack',
        permanent: true,
      },
      {
        source: '/packs/wellaging-esencial',
        destination: '/tratamientos/pack-wellaging-esencial',
        permanent: true,
      },
      {
        source: '/packs/skin-care',
        destination: '/tratamientos/skin-care-pack',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales/lifting-liquido',
        destination: '/tratamientos/lifting-liquido',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales/relleno-lineas-marioneta',
        destination: '/tratamientos/relleno-lineas-marioneta',
        permanent: true,
      },
      {
        source: '/tratamientos-faciales/elevacion-cejas',
        destination: '/tratamientos/volumen-perfilado-cejas',
        permanent: true,
      },
      {
        source: '/tratamientos-piel/hidratacion-profunda',
        destination: '/tratamientos/hidratacion-profunda',
        permanent: true,
      },
      {
        source: '/tratamientos-piel/rejuvenecimiento-dinamico',
        destination: '/tratamientos/rejuvenecimiento-dinamico',
        permanent: true,
      },
      {
        source: '/tratamientos-piel/hydrafacial',
        destination: '/tratamientos/hydrafacial',
        permanent: true,
      },
      {
        source: '/tratamientos-piel/microneedling',
        destination: '/tratamientos/microneedling',
        permanent: true,
      },
      {
        source: '/landing/hydrafacial',
        destination: '/tratamientos/hydrafacial',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/quienes-somos',
        permanent: true,
      },
      {
        source: '/landing/aumento-labios',
        destination: '/tratamientos/aumento-labios',
        permanent: true,
      },
      {
        source: '/landing/dermapen',
        destination: '/tratamientos/microneedling',
        permanent: true,
      },
      {
        source: '/old-home-2',
        destination: '/',
        permanent: true,
      },
      {
        source: '/old-home-4',
        destination: '/',
        permanent: true,
      },
      {
        source: '/old-home-3',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '',
        permanent: true,
      },
      {
        source: '/clinicas-holaglow',
        destination: '/clinicas',
        permanent: true,
      },
      {
        source: '/landing/sonrisa-gingival',
        destination: '/tratamientos/sonrisa-gingival',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
