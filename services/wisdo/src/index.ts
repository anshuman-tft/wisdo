// entrypoint

// tslint:disable-next-line:no-var-requires
require('dotenv').config();
import config from './config';
import * as server from './server';
import logger from './logger';
import * as http from 'http';

// create http server
const app = server.Server.bootstrap().app;
const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => {
    logger.info(`Server listening on port: ${config.server.port} ,env:  ${config.env}`);

    logger.debug(`Configuration: ${JSON.stringify(config)}`);
});

process.on('SIGTERM', () => {
    /* tslint:disable:no-console */
    console.log('Received SIGTERM, shutting down server');
    httpServer.close();
    process.exit(0);
});
