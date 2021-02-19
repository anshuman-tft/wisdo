import {NextFunction, Request, Response} from "express";
import {inject, injectable} from "inversify";
import {Symbols} from '../../../../dependencyInjection/symbols';
import {Util} from '../../../../lib';
import {BodyTypes, MiddlewaresValidateBody} from "../../../../middleware/validate-body";
import {UsersService} from "./index";
import User from "../../../../models/User";
import {Consts} from "../../../../Utilities";
import jwt from "jsonwebtoken";
import {Authenticate} from "../../../../middleware/authenticate";
import Role from "../../../../models/Role";
import {USER_ROLES} from "./interface";
import Community from "../../../../models/Community";
import {PostsService} from "../posts";
import Post from "../../../../models/Post";

const {WISDO_USER} = Consts;

@injectable()
export class UsersController {

    constructor(
        @inject(Symbols.Util) private util: Util,
        @inject(Symbols.MiddlewaresValidateBody) private validateRequest: MiddlewaresValidateBody,
        @inject(Symbols.UsersService) private usersService: UsersService,
        @inject(Symbols.PostsService) private postService: PostsService,
        @inject(Symbols.JWT_SECRET) private JWT_SECRET: string,
        @inject(Symbols.Authenticate) private authenticate: Authenticate,
    ) {
    }

    getUserFromHeader = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            req[WISDO_USER] = await this.usersService.getUser( {id: req['user'].id}, true, true);
            next();
        } catch (e) {
            next(e)
        }
    };

    addUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const {
                name,
                email,
                image,
                countryId,
                roleId
            } = await this.validateRequest.validateBody(BodyTypes.CREATE_USER, req.body);

            let user: User = await this.usersService.getUser({email});

            console.log(roleId)
            /** If roleId not present, then set default role as moderator*/
            let role: Role = await this.usersService.getRole({id: roleId})
            console.log(roleId, role)
            if (!role) {
                role = await this.usersService.getRole({title: USER_ROLES.MODERATOR})
            }
            console.log(roleId, role)


            if (!user) {
                user = await this.usersService.createUser({
                    name,
                    email,
                    image,
                    countryId,
                    roleId: role.id
                });
            }

            this.util.render(res, 201, user.toJSON());
        } catch (e) {
            console.log(e)
            this.util.renderError(res, 422, e);
        }
    };

    updateUser = async (req: any, res: Response): Promise<any> => {
        try {
            const user: User = req[WISDO_USER];
            const {name, email, image, countryId} = await this.validateRequest.validateBody(
                BodyTypes.UPDATE_USER, req.body);

            const userObject: any = {name, email, image, countryId};

            await this.usersService.updateUser(user, userObject);

            this.util.render(res, 200, "Updated Successfully");
        } catch (e) {
            this.util.renderError(res, 422, e);
        }
    };

    deleteUser = async (req: any, res: Response) => {
        try {
            const {userId} = await this.validateRequest.validateBody(
                BodyTypes.GET_POST_USER, req.query);
            const user: User = req[WISDO_USER].toJSON()

            if (userId !== user.id) {
                if (user['Role'].title === USER_ROLES.MODERATOR) {
                    throw new Error("You dont have permissions to delete a user")
                }
            }

            this.usersService.deleteUser(userId)

            this.util.render(res, 200, "OK");

        } catch (e) {
            console.log(e)
            this.util.renderError(res, 422, e);
        }
    }

    getUser = async (req: Request, res: Response) => {
        try {
            const {userId} = await this.validateRequest.validateBody(
                BodyTypes.GET_POST_USER, req.query);
            let user = req[WISDO_USER].toJSON()

            if (userId) {
                user = await this.usersService.getCommunities({id: userId})
                user = user.toJSON()
            }

            this.util.render(res, 200, user);

        } catch (e) {
            this.util.renderError(res, 422, e);
        }
    }

    getUserPosts = async (req: Request, res: Response) => {
        try {
            const user: User = req[WISDO_USER].toJSON();

            const feeds: Post[] = await this.postService.getUserPosts(user);
            this.util.render(res, 200, feeds.map(feed => feed.toJSON()));

        } catch (e) {
            this.util.renderError(res, 422, e);
        }
    }

    getRoles = async (req: Request, res: Response) => {
        try {
            const roles = await this.usersService.getAllRoles()
            this.util.render(res, 200, roles.map(role => role.toJSON()));
        } catch (e) {
            this.util.renderError(res, 422, e);
        }
    }

    listUsers = async (req: any, res: Response) => {
        // This is just for demo, we need to do role based authentication for viewing all the users
        try {
            const users: any[] = await this.usersService.getUsers();

            this.util.render(res, 200, users);
        } catch (e) {
            this.util.renderError(res, 422, e);
        }
    }

    authenticateUser = async (req: any, res: Response) => {
        try {
            const {name, email} = await this.validateRequest.validateBody(BodyTypes.AUTHENTICATE_USER, req.body);
            const user: any = await this.usersService.getUser({name, email});

            if (user) {
                const token = jwt.sign({id: user.id}, this.JWT_SECRET, {expiresIn: '24h'});
                res.setHeader('token', token);
                this.util.render(res, 200);
            } else {
                throw new Error('Wrong credentials');
            }
        } catch (e) {
            this.util.renderError(res, 422, e);
        }
    }

    getCommunities = async (req: any, res: Response) => {
        try {
            const communities = await this.usersService.getCommunities(req[WISDO_USER]);
            this.util.render(res, 200, communities);
        } catch (e) {
            this.util.renderError(res, 422, e);
        }
    }

    updateCommunities = async (req: any, res: Response) => {
        try {
            const {communities} = await this.validateRequest.validateBody(BodyTypes.UPDATE_USER_COMMUNITIES, req.body);
            const users: any[] = await this.usersService.updateCommunities(req[WISDO_USER], communities);

            this.util.render(res, 200, users);
        } catch (e) {
            this.util.renderError(res, 422, e);
        }
    }
}