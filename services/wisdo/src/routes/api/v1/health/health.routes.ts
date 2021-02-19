import * as express from "express";
import { injectable, inject } from "inversify";
import { HealthController } from './index';
import { Symbols } from '../../../../dependencyInjection/symbols';

@injectable()
export class HealthRoutes{

    public router: express.Router = express.Router();

    constructor(
        @inject(Symbols.HealthController) private healthController: HealthController,
    ) {
        this.register()
    }

    public register() {
        this.router.get('/', this.healthController.healthCheck);
    }
}
