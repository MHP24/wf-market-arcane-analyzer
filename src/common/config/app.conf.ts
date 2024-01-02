export const appConfig = () => ({
  port: +process.env.PORT || 3000,
  marketService: {
    apiBaseUrl: process.env.MARKET_API_BASE_URL,
    baseUrl: process.env.MARKET_BASE_URL,
    maxConcurrency: +process.env.MAX_CONCURRENCY,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
});
