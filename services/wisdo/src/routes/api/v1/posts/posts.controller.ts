import {NextFunction, Request, Response} from "express";
import {inject, injectable} from "inversify";
import {Symbols} from '../../../../dependencyInjection/symbols';
import {Util} from '../../../../lib';
import {BodyTypes, MiddlewaresValidateBody} from "../../../../middleware/validate-body";
import {PostsService} from "./index";
import User from "../../../../models/User";
import {Consts, countWords, getFirstNWords} from "../../../../Utilities";
import {UsersService} from "../users";
import Community from "../../../../models/Community";
import Post from "../../../../models/Post";
import {POST_PAYLOAD, POST_STATUS} from "./interface";
import {USER_ROLES} from "../users/interface";

const {WISDO_COMMUNITY, WISDO_POST, WISDO_USER} = Consts;

@injectable()
export class PostsController {

    constructor(
        @inject(Symbols.Util) private util: Util,
        @inject(Symbols.MiddlewaresValidateBody) private validateRequest: MiddlewaresValidateBody,
        @inject(Symbols.PostsService) private postsService: PostsService,
        @inject(Symbols.UsersService) private usersService: UsersService,
        @inject(Symbols.JWT_SECRET) private JWT_SECRET: string,
    ) {
    }

    validatePostId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {postId} = await this.validateRequest.validateBody(BodyTypes.GET_POST, req.params);
            const post: Post = await this.postsService.getPost({id: postId});
            if (!post) {
                throw new Error('Invalid post')
            }

            req[WISDO_POST] = post;

            next();
        } catch (e) {
            next(e)
        }
    }

    getFeed = async (req: Request, res: Response) => {
        try {
            const feed = await this.postsService.getFeed(req[WISDO_USER]);
            this.util.render(res, 200, feed);
        } catch (e) {
            this.util.renderError(res, 422, e);
        }
    }

    getPost = async (req: Request, res: Response) => {
        try {
            const post: Post = req[WISDO_POST].toJSON();
            const user: User = req[WISDO_USER].toJSON();

            if (post.status === POST_STATUS.PENDING_APPROVAL && post.authorId !== user.id) {
                throw new Error("Post is not approved")
            }

            const communities = user['Communities'].map(val => val.id);
            // post doesn't belong to user's community
            if (!communities.includes(post.communityId)) {
                throw new Error("User is not associated with community")
            }

            this.util.render(res, 200, post);
        } catch (e) {
            this.util.renderError(res, 422, e);
        }
    }

    updateReaction = async (req: Request, res: Response) => {
        try {
            const post: Post = req[WISDO_POST].toJSON();
            const user: User = req[WISDO_USER].toJSON();

            console.log(user);

            if (post.status === POST_STATUS.PENDING_APPROVAL) {
                throw new Error("Post is not approved")
            }

            const reaction = await this.postsService.updatePostReaction(req[WISDO_POST], user.id)
            this.util.render(res, 200, reaction);
        } catch (e) {
            this.util.renderError(res, 422, e);
        }
    }

    updatePostStatus = async (req: Request, res: Response) => {
        try {
            const {status} = await this.validateRequest.validateBody(BodyTypes.UPDATE_POST_STATUS, req.body);

            const post: Post = req[WISDO_POST].toJSON();
            const user: User = req[WISDO_USER].toJSON();
            const communities = user['Communities'].map(val => val.id);

            if (!user['Role'] || ![USER_ROLES.MODERATOR, USER_ROLES.SUPER_MODERATOR].includes(user['Role'].title)) {
                throw new Error("You are not authorized to update status");
            }

            if (!communities.includes(post.communityId)) {
                throw new Error("You are not authorized to update status");
            }

            if (status === POST_STATUS.APPROVED || status === POST_STATUS.PENDING_APPROVAL) {
                await this.postsService.updatePostStatus(req[WISDO_POST], status)
            }
            this.util.render(res, 200);
        } catch (e) {
            console.log(e)
            this.util.renderError(res, 422, e);
        }
    }

    getPostPayload = async (req: Request): Promise<any> => {

        const {summary, body, image, title, tags} = await this.validateRequest.validateBody(BodyTypes.ADD_POST, req.body);
        const reqCommunity: Community = req[WISDO_COMMUNITY].toJSON();
        const user: Community = req[WISDO_USER].toJSON();


        if (countWords(summary) > Consts.MAX_WORDS_IN_SUMMARY) {
            throw new Error(`Summary can't be greater ${Consts.MAX_WORDS_IN_SUMMARY} words`);
        }

        /** Check tags in DB, if not present then create them*/
        const tagIds: string[] = []
        for (const i in tags) {
            const tag = await this.postsService.findTag(tags[i])
            tagIds.push(tag.toJSON().id)
        }

        /*** return post payload*/
        const postPayload: POST_PAYLOAD = {
            title,
            image: image || undefined,
            body,
            summary: summary || getFirstNWords(Consts.WORDS_IN_SUMMARY_FROM_BODY, body),  // If summary not present then need to send only first characters
            status: POST_STATUS.PENDING_APPROVAL,
            communityId: reqCommunity.id,
            authorId: user.id,
        }
        return {postPayload, tagIds}
    }

    updatePost = async (req: Request, res: Response) => {
        try {

            const community: Community = req[WISDO_COMMUNITY].toJSON();
            const post: Post = req[WISDO_POST].toJSON();
            const user: User = await this.usersService.getCommunities(req['user'])
            const communities = user['Communities'].map(val => val.id)

            if (post.authorId !== user.id) {
                if (!user['Role']) {
                    throw new Error("You are not authorized to update this post")
                }
                if (user['Role'].title === USER_ROLES.MODERATOR && !communities.includes(community.id)) {
                    throw new Error("User is not associated with community");
                }
            }

            const {postPayload, tagIds} = await this.getPostPayload(req)

            await Promise.all([
                this.postsService.updatePost(req[WISDO_POST], postPayload),
                this.postsService.addTags(req[WISDO_POST], tagIds)
            ])

            this.util.render(res, 200);
            // TODO get moderators of community
            // TODO get result of watchlist words
            // TODO pass moderators & result of watchlist words
            this.sendEmail();
        } catch (e) {
            console.log(e)
            this.util.renderError(res, 422, e);
        }
    }

    addPost = async (req: Request, res: Response) => {
        try {

            const community: Community = req[WISDO_COMMUNITY].toJSON();
            const user: User = req[WISDO_USER].toJSON();
            const communities = user['Communities'].map(val => val.id);

            if (!communities.includes(community.id)) {
                throw new Error("User is not associated with community");
            }

            const {postPayload, tagIds} = await this.getPostPayload(req);

            const post: Post = await this.postsService.addPost(postPayload)
            await this.postsService.addTags(post, tagIds)

            this.util.render(res, 200, post.toJSON());

            // TODO get moderators of community
            // TODO get result of watchlist words
            // TODO pass moderators & result of watchlist words
            this.sendEmail();
        } catch (e) {
            console.log(e)
            this.util.renderError(res, 422, e);
        }
    }

    // TODO this can be done through event dispatcher
    sendEmail = async () => {
        // Prepare subject and body and send it.
    }
}