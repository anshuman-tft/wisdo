import axios from 'axios';
import * as https from "https";
import * as jwt from "jsonwebtoken";
import {injectable} from "inversify";
import config from "../../config/authz";

@injectable()
export class HttpClient {
    private instance = null;

    constructor() {
        this.createInstance()
    }

    createInstance() {
        if (!this.instance) {
            this.instance = axios.create({
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });
        }
    }

    getInstance() {
        return this.instance;
    }

    getJwtToken(exp, sub, scope) {
        return jwt.sign(
            {
                iss: 'nes',
                iat: Date.now(),
                exp,
                aud: 'micro-services',
                sub,
                scope
            },
            config.authz.jwtSecret,
        );
    }
}