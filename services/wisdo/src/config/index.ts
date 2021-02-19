import logger from './logger';
import authz from './authz';
import db from './db';
import server from './server';

const config = Object.assign({}, logger, db, authz, server);

export default config;