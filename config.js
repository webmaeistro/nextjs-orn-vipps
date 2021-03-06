/* eslint no-underscore-dangle: "off" */
const {
  NODE_ENV = 'development',
  COUNTRY_CODE = 'NO',
  CRYSTALLIZE_TENANT_ID = 'orn-forlag',
  CRYSTALLIZE_API_URL = 'https://api.crystallize.com',
  CRYSTALLIZE_CORE_API_URL = 'https://pim.crystallize.com/graph/core',
  STRIPE_PUBLISHABLE_KEY,
  SUCCESS_PAYMENT_STRIPE_WEBHOOK_TOKEN,
  MY_CRYSTALLIZE_SECRET_TOKEN,
  MY_CRYSTALLIZE_SECRET_TOKEN_ID,
  SENDGRID_API_KEY,
  TERMS_URI = 'https://ornforlag.no',
  CHECKOUT_URI = 'https://ornforlag.no/checkout',
  KLARNA_USERNAME,
  KLARNA_PASSWORD,
  NGROK_URL,
  KLARNA_API_URL = 'https://api.playground.klarna.com',

  VIPPS_API_URL = 'https://testapi.vipps.no',
  HOST_URL = 'http://localhost:3000'
} = process.env;

const DEV = NODE_ENV !== 'production';

global.__crystallizeConfig = {
  NODE_ENV,
  COUNTRY_CODE,
  TENANT_ID: CRYSTALLIZE_TENANT_ID,
  GRAPH_URL: `${CRYSTALLIZE_API_URL}/tenant/${CRYSTALLIZE_TENANT_ID}`,
  ORDER_API_URL: `${CRYSTALLIZE_API_URL}/${CRYSTALLIZE_TENANT_ID}/orders`,
  CRYSTALLIZE_CORE_API_URL,
  SENDGRID_API_KEY,
  SUCCESS_PAYMENT_STRIPE_WEBHOOK_TOKEN,
  MY_CRYSTALLIZE_SECRET_TOKEN,
  MY_CRYSTALLIZE_SECRET_TOKEN_ID,
  STRIPE_PUBLISHABLE_KEY,
  DEV,
  TERMS_URI,
  CHECKOUT_URI,
  KLARNA_API_URL,
  KLARNA_USERNAME,
  KLARNA_PASSWORD,
  NGROK_URL,
  VIPPS_API_URL,
  HOST_URL
};

module.exports = global.__crystallizeConfig;
