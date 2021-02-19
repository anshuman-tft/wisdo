import jwt from "express-jwt";
import config from '../../config';
import {injectable} from "inversify";

@injectable()
export class Authenticate {
    authTokenMiddleware = jwt({secret: config.authz.jwtSecret});
}
