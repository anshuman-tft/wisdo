import * as express from "express";
import {inject, injectable} from "inversify";
import {UsersController} from './index';
import {Symbols} from '../../../../dependencyInjection/symbols';
import {Authenticate} from '../../../../middleware/authenticate';

@injectable()
export class UsersRoutes{

    public router: express.Router = express.Router();

    constructor(
        @inject(Symbols.UsersController) private usersController: UsersController,
        @inject(Symbols.Authenticate) private authenticate: Authenticate,
    ) {
        this.register();
    }

    public register() {
        this.router.post('/', this.usersController.addUser);
        this.router.get('/', this.authenticate.authTokenMiddleware, this.usersController.listUsers);

        this.router.post('/auth', this.usersController.authenticateUser);
        this.router.get('/roles', this.usersController.getRoles);

        this.router.get('/:userId', this.authenticate.authTokenMiddleware, this.usersController.getUserFromHeader, this.usersController.getUser);
        this.router.get('/:userId/posts', this.authenticate.authTokenMiddleware, this.usersController.getUserFromHeader, this.usersController.getUserPosts);
        this.router.get('/:userId/communities', this.authenticate.authTokenMiddleware, this.usersController.getUserFromHeader, this.usersController.getCommunities);

        this.router.delete('/:userId', this.authenticate.authTokenMiddleware, this.usersController.getUserFromHeader, this.usersController.deleteUser);

        this.router.put('/:userId', this.authenticate.authTokenMiddleware, this.usersController.getUserFromHeader, this.usersController.updateUser);
        this.router.put('/:userId/communities', this.authenticate.authTokenMiddleware, this.usersController.getUserFromHeader, this.usersController.updateCommunities);
    }
}
