import * as joi from '@hapi/joi';

const envVarsSchema = joi
  .object({
    LOGGER_LEVEL: joi
      .string()
      .valid('error', 'warn', 'info', 'verbose', 'debug', 'silly')
      .default('info'),
    LOGGER_ENABLED: joi
      .boolean()
      .truthy('TRUE')
      .truthy('true')
      .falsy('FALSE')
      .falsy('false')
      .default(true),
  })
  .unknown()
  .required();

const {error, value: envVars} = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  logger: {
    level: envVars.LOGGER_LEVEL,
    enabled: envVars.LOGGER_ENABLED,
  },
};

export default config;