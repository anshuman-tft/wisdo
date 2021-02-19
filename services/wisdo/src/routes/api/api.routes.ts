import * as express from "express";
import {injectable, inject} from "inversify";
import {V1Routes} from './v1';
import {Symbols} from '../../dependencyInjection/symbols';
import {Util} from "../../lib";

@injectable()
export class ApiRoutes {
    constructor(
        @inject(Symbols.V1Routes) private v1Routes: V1Routes,
        @inject(Symbols.Util) private util: Util,
    ) {
    }

    public register(app: express.Application) {
        app.use('/api', this.v1Routes.router);

        app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log(err)
            if (res.headersSent) {
                return next(err)
            }
            this.util.renderError(res, err && err.status ? err.status : 422, err);
        });
    }
}
