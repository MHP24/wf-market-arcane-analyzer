import * as Joi from 'joi';

export const joiConfig = Joi.object({
  PORT: Joi.number().default(3000),
  MARKET_BASE_URL: Joi.string().required(),
  MAX_CONCURRENCY: Joi.number().default(3),
  DATABASE_URL: Joi.string().required(),
});
