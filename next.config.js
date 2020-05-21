require('dotenv').config();

module.exports = {
  target: 'serverless',
  env: {
    CRYSTALLIZE_TENANT_ID: process.env.CRYSTALLIZE_TENANT_ID,
    CRYSTALLIZE_API_URL: process.env.CRYSTALLIZE_API_URL,
    CRYSTALLIZE_CORE_API_URL: process.env.CRYSTALLIZE_CORE_API_URL
  }
};
