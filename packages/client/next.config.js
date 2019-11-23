// import { config } from 'dotenv';
const { config } = require('dotenv');
config();

module.exports = {
  env: {
    API_URL_HOST: process.env.API_URL_HOST,
  },
};
