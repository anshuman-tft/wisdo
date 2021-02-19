/* eslint-disable import/no-unresolved */
/* eslint func-names: ["error", "never"] */
/* eslint-disable no-console */
const chai = require('chai');
const jwt = require('jsonwebtoken');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(require('chai-iso8601')());

const {expect} = require('chai');
const axios = require('axios');

const config = require('../../../config');
const consts = require('../../../consts');
let jwtToken;

// #region Helper functions
function getJwtToken(expiresAt, subject, scope) {
  jwtToken = jwt.sign(
    {
      iss: 'Wisdo API Gateway',
      iat: Date.now(),
      exp: expiresAt,
      aud: 'wisdo',
      sub: subject,
      scope,
    },
    config.JWT_SECRET,
  );

  return jwtToken;
}

describe('Add/Update user', () => {


})