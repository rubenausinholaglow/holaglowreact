import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
  version: 'weekly',
  libraries: ['places'],
});

export default loader;
