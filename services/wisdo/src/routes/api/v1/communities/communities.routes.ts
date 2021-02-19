import * as express from "express";
import {inject, injectable} from "inversify";
import {CommunitiesController} from './index';
import {Symbols} from '../../../../dependencyInjection/symbols';
import {Authenticate} from '../../../../middleware/authenticate';
import {PostsRoutes} from "../posts";

@injectable()
export class CommunitiesRoutes{

    public router: express.Router = express.Router();

    constructor(
        @inject(Symbols.CommunitiesController) private controller: CommunitiesController,
        @inject(Symbols.Authenticate) private authenticate: Authenticate,
        @inject(Symbols.PostsRoutes) private postsRoutes: PostsRoutes
    ) {
        this.register();
    }

    public register() {
        this.router.param('communityId', this.controller.validateCommunityId);

        this.router.post('/', this.authenticate.authTokenMiddleware, this.controller.addCommunity);
        this.router.get('/', this.authenticate.authTokenMiddleware, this.controller.getCommunities);

        this.router.get('/tags', this.authenticate.authTokenMiddleware, this.controller.getTagList);
        this.router.use('/:communityId/posts', this.postsRoutes.router);
    }
}
