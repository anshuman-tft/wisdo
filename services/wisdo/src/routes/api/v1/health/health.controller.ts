import {Request, Response} from "express";
import {inject, injectable} from "inversify";
import {Symbols} from '../../../../dependencyInjection/symbols';
import {Util} from '../../../../lib';
import logger from "../../../../logger/index";

@injectable()
export class HealthController {

    constructor(
        @inject(Symbols.Util) private util: Util,
    ) {
    }

    healthCheck = (req: Request, res: Response) => {
        logger.info(`GET /api/v1/health called`);

        this.util.render(res, 200, 'healthy');
    };
}