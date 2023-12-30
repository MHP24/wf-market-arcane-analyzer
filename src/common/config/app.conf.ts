export const appConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  marketService: {
    baseUrl: process.env.MARKET_BASE_URL,
  },
});
