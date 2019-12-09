const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  target: 'serverless',
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    return config;
  },
  env: {
    API_URL_HOST: process.env.API_URL_HOST,
  },
};
