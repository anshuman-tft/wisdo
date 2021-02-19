import * as express from "express";
import {inject, injectable} from "inversify";
import {PostsController} from './index';
import {Symbols} from '../../../../dependencyInjection/symbols';
import {Authenticate} from '../../../../middleware/authenticate';
import {UsersController} from "../users";

@injectable()
export class PostsRoutes{

    public router: express.Router = express.Router();

    constructor(
        @inject(Symbols.PostsController) private controller: PostsController,
        @inject(Symbols.UsersController) private usersController: UsersController,
        @inject(Symbols.Authenticate) private authenticate: Authenticate,
    ) {
        this.register();
    }

    public register() {
        this.router.param('postId', this.controller.validatePostId);
        this.router.get('/', this.authenticate.authTokenMiddleware, this.usersController.getUserFromHeader, this.controller.getFeed);
        this.router.post('/', this.authenticate.authTokenMiddleware, this.usersController.getUserFromHeader, this.controller.addPost);
        this.router.get('/:postId', this.authenticate.authTokenMiddleware, this.usersController.getUserFromHeader, this.controller.getPost);
        this.router.put('/:postId', this.authenticate.authTokenMiddleware, this.usersController.getUserFromHeader, this.controller.updatePost);
        this.router.post('/:postId/updatestatus', this.authenticate.authTokenMiddleware, this.usersController.getUserFromHeader, this.controller.updatePostStatus);
        this.router.post('/:postId/reaction', this.authenticate.authTokenMiddleware, this.usersController.getUserFromHeader, this.controller.updateReaction);
    }
}
