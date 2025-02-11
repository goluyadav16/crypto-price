const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // This path will be used to make requests to the proxy
    createProxyMiddleware({
      target: 'https://api.coingecko.com', // CoinGecko API URL
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove the /api prefix from the actual request
      },
    })
  );
};

