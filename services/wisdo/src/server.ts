// basic express server
/**
 * We are using
 * - "import express from 'express'" instead of "import * as express from 'express'"
 * So to use this, we made changes in gruntfile.js
 * by adding options allowSyntheticDefaultImports: true, esModuleInterop: true,
 *
 * We have also changed
 * import * as compression from 'compression' -> import compression from 'compression'
 * import * as cookieParser from 'cookie-parser' -> import cookieParser from 'cookie-parser'
 * import * as morgan from 'morgan' -> import morgan from 'morgan';
 */
import express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import {swaggerDocument} from './swagger';
import compression from 'compression';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import * as path from "path";

import config from './config';
import container from "./dependencyInjection/inversify.config";
import {Bootstrap} from "./bootstarp";
import {DBFactory} from './db';
import {Symbols} from './dependencyInjection/symbols';
import logger from './logger';

const bootstrap = container.get<Bootstrap>(Symbols.Bootstrap);
const dbFactory = container.get<DBFactory>(Symbols.DBFactory);

/**
 * The server.
 *
 * @class Server
 */
export class Server {
    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        // create expressjs application
        this.app = express();

        // configure application
        this.config();

        // add routes
        this.routes();
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public async config() {
        // add static paths

        // this.app.use(Logger.responseSuccessLogger);

        this.app.use(express.static(path.join(__dirname, "public")));

        // mount logger
        this.app.use(
            morgan(
                ':req[x-forwarded-for] :remote-addr :remote-user [:date[iso]] :method :url HTTP/:http-version :status :res[content-length] - :response-time ms ":user-agent"',
            ),
        );

        this.app.use(compression());

        // mount json form parser
        this.app.use(bodyParser.json());

        // mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // mount cookie parser middleware
        this.app.use(cookieParser());

        // catch 404 and forward to error handler
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });

        dbFactory.createModels(config.db);

        if (process.env.NODE_ENV === 'test') {
            for(let i = 0; i < DBFactory.db.models.length; i++) {
                await DBFactory.db.models[i].sync();
            }
        }
    }

    /**
     * Create and return Router.
     *
     * @class Server
     * @method routes
     * @return void
     */
    private routes() {
        /** Swagger implementation */
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
            "showExplorer": true,
            "explorer": true
        }))

        /** Bootstrapping apis in server */
        bootstrap.init(this.app).catch(err => console.error('Error in attaching routes'));
    }
}