import logger from '../../logger';
import { Request, Response, NextFunction } from 'express';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  if (err.name && err.name === 'ValidationError') {
    return res.status(400).send(err.message);
  }

  if (err.name && err.name === 'UnauthorizedError') {
    return res.status(err.status).send(err.message);
  }

  return res.status(500).send('Ooops, something went wrong :(');
};
