import * as express from "express";
import {injectable, inject} from "inversify";
import {HealthRoutes} from './health';
import {UsersRoutes} from './users';
import {Symbols} from '../../../dependencyInjection/symbols';
import {PostsRoutes} from "./posts";
import {CommunitiesRoutes} from "./communities";

@injectable()
export class V1Routes {

    public router: express.Router = express.Router();

    constructor(
        @inject(Symbols.HealthRoutes) private healthRoutes: HealthRoutes,
        @inject(Symbols.UsersRoutes) private usersRoutes: UsersRoutes,
        @inject(Symbols.CommunitiesRoutes) private communitiesRoutes: CommunitiesRoutes,
        @inject(Symbols.PostsRoutes) private postsRoutes: PostsRoutes
    ) {
        this.register()
    }

    public register() {
        this.router.use('/v1/health', this.healthRoutes.router);
        this.router.use('/v1/users', this.usersRoutes.router);
        this.router.use('/v1/communities', this.communitiesRoutes.router);
        this.router.use('/v1/posts', this.postsRoutes.router);
    }
}

