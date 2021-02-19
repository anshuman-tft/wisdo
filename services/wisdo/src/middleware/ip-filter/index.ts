import {isInSubnet, isLocalhost} from 'is-in-subnet';
import {Request, Response, NextFunction} from 'express';
import logger from '../../logger';
import config from '../../config';

function isInWhitelist(ip: string ) {
  return isLocalhost(ip) ||
      config.server.whitelistIps.indexOf(ip) >= 0 ||
      isInSubnet(ip, config.server.whitelistSubnets);
}

export default (req: Request, res: Response, next: NextFunction) => {
  const requestIp =
    req.headers['x-forwarded-for'] as string||
    req.ip ||
    req.connection.remoteAddress||
    req.socket.remoteAddress;

  logger.debug(`IP ${requestIp} made a request`);

  if (isInWhitelist(requestIp)) {
    logger.debug(`IP ${requestIp} found in whitelist, allowing request`);
    return next();
  }

  logger.warn(`unauthorized IP ${requestIp} made a request, returning 401`);
  return res.status(401).end();
};