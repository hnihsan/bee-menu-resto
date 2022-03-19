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
        'localhost'
      ],
    },
  }
);
