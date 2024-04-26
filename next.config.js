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
      {
        protocol: 'https',
        hostname: 'budgetimages.blob.core.windows.net',
        port: '',
        pathname: '/derma/**',
      },
      {
        protocol: 'https',
        hostname: 'budgetimages.blob.core.windows.net',
        port: '',
        pathname: '/dermauploadimages/**',
      },
      {
        protocol: 'https',
        hostname: 'holaglowcdn-g8cwc3amdvgsebe9.z02.azurefd.net',

        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'holaglowcdn-g8cwc3amdvgsebe9.z02.azurefd.net',
        port: '',
        pathname: '/derma/**',
      },
      {
        protocol: 'https',
        hostname: 'holaglowcdn-g8cwc3amdvgsebe9.z02.azurefd.net',
        port: '',
        pathname: '/dermauploadimages/**',
      },
    ],
    domains: ['www.holaglow.com'],
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
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales',
        destination: '/tratamientos',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-piel',
        destination: '/tratamientos',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-capilares',
        destination: '/tratamientos',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/otros-tratamientos',
        destination: '/tratamientos',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-laser',
        destination: '/tratamientos',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-labios/aumento-labios',
        destination: '/tratamientos/aumento-labios',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-labios/sonrisa-gingival',
        destination: '/tratamientos/sonrisa-gingival',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales/proyeccion-pomulos',
        destination: '/tratamientos/proyeccion-pomulos',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales/relleno-surco-nasogeniano',
        destination: '/tratamientos/surco-nasogeniano',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales/codigo-barras',
        destination: '/tratamientos/codigo-barras',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales/arrugas-entrecejo-patas-gallo',
        destination: '/tratamientos/arrugas-entrecejo-patas-gallo',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales/arrugas-expresion',
        destination:
          '/tratamientos/arrugas-expresion-frente-entrecejo-patas-gallo',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales/proyeccion-menton',
        destination: '/tratamientos/proyeccion-menton',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales/proyeccion-mandibula',
        destination: '/tratamientos/proyeccion-mandibula',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales/relleno-ojeras',
        destination: '/tratamientos/relleno-ojeras',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales/rinomodelacion',
        destination: '/tratamientos/rinomodelacion',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales/prevencion-arrugas',
        destination: '/tratamientos/prevencion-arrugas',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-piel/revitalizacion-facial',
        destination: '/tratamientos/mesoterapia-facial',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-piel/peeling-quimico',
        destination: '/tratamientos/peeling-quimico',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-capilares/rejuvenecimiento-capilar',
        destination: '/tratamientos/rejuvenecimiento-capilar',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/otros-tratamientos/bruxismo',
        destination: '/tratamientos/bruxismo',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-laser/laser',
        destination: '/tratamientos',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales/hilos-tensores-faciales',
        destination: '/tratamientos/hilos-tensores-faciales',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales/hilos-tensores-cuello',
        destination: '/tratamientos/hilos-tensores-cuello',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/packs',
        destination: '/tratamientos',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/packs/prevencion',
        destination: '/tratamientos/pack-prevencion',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/packs/armonizacion-facial',
        destination: '/tratamientos/armonizacion-facial',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/packs/wellaging-plus',
        destination: '/tratamientos/pack-wellaging-plus',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/packs/full-face',
        destination: '/tratamientos/pack-full-face',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/packs/glow',
        destination: '/tratamientos/glow-pack',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/packs/wellaging-esencial',
        destination: '/tratamientos/pack-wellaging-esencial',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/packs/skin-care',
        destination: '/tratamientos/skin-care-pack',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales/lifting-liquido',
        destination: '/tratamientos/lifting-liquido',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales/relleno-lineas-marioneta',
        destination: '/tratamientos/relleno-lineas-marioneta',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-faciales/elevacion-cejas',
        destination: '/tratamientos/volumen-perfilado-cejas',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-piel/hidratacion-profunda',
        destination: '/tratamientos/hidratacion-profunda',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-piel/rejuvenecimiento-dinamico',
        destination: '/tratamientos/rejuvenecimiento-dinamico',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-piel/hydrafacial',
        destination: '/tratamientos/hydrafacial',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos-piel/microneedling',
        destination: '/tratamientos/microneedling',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/landing/hydrafacial',
        destination: '/tratamientos/hydrafacial',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/about-us',
        destination: '/quienes-somos',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/landing/aumento-labios',
        destination: '/tratamientos/aumento-labios',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/landing/dermapen',
        destination: '/tratamientos/microneedling',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/old-home-2',
        destination: '/',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/old-home-4',
        destination: '/',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/old-home-3',
        destination: '/',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/clinicas-holaglow',
        destination: '/clinicas',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/landing/sonrisa-gingival',
        destination: '/tratamientos/sonrisa-gingival',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos/pack-wellaging-plus',
        destination: '/tratamientos/pack-wellaging',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/tratamientos/pack-wellaging-esencial',
        destination: '/tratamientos/pack-wellaging',
        permanent: true,
        statusCode: 301,
      },
    ];
  },
};

module.exports = nextConfig;
