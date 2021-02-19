import * as joi from '@hapi/joi';

const envVarsSchema = joi
  .object({
    PORT: joi
      .number()
      .port()
      .default(4000),
    IP_WHITELIST: joi
      .string()
      .trim()
      .default('0.0.0.0/0,::/0'),
  })
  .unknown()
  .required();

const {error, value: envVars} = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const ipScheme = joi
  .string()
  .trim()
  .ip({
    version: ['ipv4', 'ipv6'],
    cidr: 'forbidden',
  });

const cidrScheme = joi
  .string()
  .trim()
  .ip({
    version: ['ipv4', 'ipv6'],
    cidr: 'required',
  });

// split whitelist into IPs and subnets/ranges (CIDR notation)
const ips = [];
const subnets = [];
const addresses = envVars.IP_WHITELIST.split(',');
// allow for-of loops and continue when linting
/* eslint-disable no-continue */
// eslint-disable-next-line no-restricted-syntax
for (let address of addresses) {
  address = address.trim(); // remove whitespaces
  let res = ipScheme.validate(address);
  if (!res.error) {
    ips.push(res.value);
    continue;
  }

  res = cidrScheme.validate(address);
  if (!res.error) {
    subnets.push(res.value);
    continue;
  }

  throw new Error(`Config validation error: address ${address} is not a valid IP/subnet/CIDR`);
}

const config = {
  server: {
    port: envVars.PORT,
    whitelistIps: ips,
    whitelistSubnets: subnets,
  },
};

export default config;
module.exports.SELF_URL = process.env.SELF_URL || `http://localhost:${envVars.PORT}`;
