/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const withReactSvg = require('next-react-svg');
const withImages = require('next-images');

const path = require('path');

module.exports = withPlugins(
  [
    withImages({}),
    withReactSvg({
      include: path.resolve(__dirname, './public/images'),
      webpack(config, options) {
        return config;
      },
    }),
  ],
  {
    images: {
      domains: [
        'gateway-proxy-bee-9-0.gateway.ethswarm.org',
        'gateway-proxy-bee-8-0.gateway.ethswarm.org',
        'gateway-proxy-bee-7-0.gateway.ethswarm.org',
        'gateway-proxy-bee-6-0.gateway.ethswarm.org',
        'gateway-proxy-bee-5-0.gateway.ethswarm.org',
        'gateway-proxy-bee-4-0.gateway.ethswarm.org',
        'gateway-proxy-bee-3-0.gateway.ethswarm.org',
        'gateway-proxy-bee-2-0.gateway.ethswarm.org',
        'gateway-proxy-bee-1-0.gateway.ethswarm.org',
      ],
    },
  }
);
