import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'hey-leaflet',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [{ src: '../node_modules/leaflet/dist/images', dest: 'leaflet/images' }],
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [{ src: '../node_modules/leaflet/dist/images', dest: 'leaflet/images' }],
    },
  ],
};
