import * as Joi from 'joi';

export const joiConfig = Joi.object({
  PORT: Joi.number().default(3000),
  MARKET_BASE_URL: Joi.string().required(),
});
