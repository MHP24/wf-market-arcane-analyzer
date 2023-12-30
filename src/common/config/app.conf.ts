export const appConfig = () => ({
  port: +process.env.PORT || 3000,
  marketService: {
    baseUrl: process.env.MARKET_BASE_URL,
    maxConcurrency: +process.env.MAX_CONCURRENCY,
  },
});
