import { Loader } from '@googlemaps/js-api-loader';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

const loader = apiKey
  ? new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places'],
    })
  : null;

export default loader;
