import * as joi from '@hapi/joi';

const envVarsSchema = joi
  .object({
    DB_HOST: joi
      .string()
      .trim()
      .required(),
    DB_PORT: joi
      .number()
      .port()
      .default(3306),
    DB_NAME: joi
      .string()
      .trim()
      .required(),
    DB_USER: joi
      .string()
      .trim()
      .required(),
    DB_PASSWORD: joi
      .string()
      .trim()
      .required(),
    DB_LOG_QUERIES: joi
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
  db: {
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    name: envVars.DB_NAME,
    user: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    shouldLogQueries: envVars.DB_LOG_QUERIES,
  },
};
export default config;