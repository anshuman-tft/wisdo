
import { injectable, inject } from "inversify";
import * as express from 'express';
import { Symbols } from './dependencyInjection/symbols';
import { ApiRoutes } from "./routes/api";
import { MiddlewaresValidateBody } from './middleware/validate-body';
import { Cors } from './middleware/cors';
import ErrorHandler from './middleware/error-handler';


@injectable()
export class Bootstrap {
    public constructor(
        @inject(Symbols.MiddlewaresValidateBody) private middlewaresValidateBody: MiddlewaresValidateBody,
        @inject(Symbols.ApiRoutes) private apiRoutes: ApiRoutes,
    ){}

    async init(app: express.Application){
        await this.handleMiddlewares(app);
        await this.registerRoutes(app);
    }

    registerRoutes(app: express.Application){
        this.apiRoutes.register(app);
    }

    async handleMiddlewares(app: express.Application){
        // Middleware for cors
        Cors.implementCors(app);

        app.use(ErrorHandler);

        await this.middlewaresValidateBody.initValidationObject();
    }
}