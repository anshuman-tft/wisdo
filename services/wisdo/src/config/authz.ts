import * as joi from '@hapi/joi';

const envVarsSchema = joi
  .object({
    JWT_SECRET: joi
      .string()
      .trim()
      .required(),
  })
  .unknown()
  .required();

const {error, value: envVars} = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  authz: {
    jwtSecret: envVars.JWT_SECRET,
  },
};

export default config;
