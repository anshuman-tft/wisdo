import {Request, NextFunction, Response} from "express";
import {inject, injectable} from "inversify";
import {Symbols} from '../../../../dependencyInjection/symbols';
import {Util} from '../../../../lib';
import {BodyTypes, MiddlewaresValidateBody} from "../../../../middleware/validate-body";
import {CommunitiesService} from "./index";
import {Consts} from "../../../../Utilities";
import Community from "../../../../models/Community";
import Tag from "../../../../models/Tag";
import { PostsService } from "../posts";

const {WISDO_COMMUNITY} = Consts;

@injectable()
export class CommunitiesController {

    constructor(
        @inject(Symbols.Util) private util: Util,
        @inject(Symbols.MiddlewaresValidateBody) private validateRequest: MiddlewaresValidateBody,
        @inject(Symbols.CommunitiesService) private service: CommunitiesService,
        @inject(Symbols.PostsService) private postsService: PostsService,
        @inject(Symbols.JWT_SECRET) private JWT_SECRET: string,
    ) {
    }

    validateCommunityId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {communityId} = await this.validateRequest.validateBody(BodyTypes.GET_COMMUNITY, req.params);
            const community: Community = await this.service.getCommunity({id: communityId});
            if (!community) {
                throw new Error('Invalid communityId')
            }

            req[WISDO_COMMUNITY] = community;

            next();
        } catch (e) {
            next(e)
        }
    };

    getCommunities = async (req: Request, res: Response) => {
        try {
            const data: any[] = await this.service.getCommunities();

            this.util.render(res, 200, data);
        } catch (e) {
            this.util.renderError(res, 422, e);
        }
    }

    addCommunity = async (req: any, res: Response) => {
        this.util.render(res, 200, null);
    }


    getTagList = async (req: Request, res: Response) => {
        try {
            const tags: Tag[]= await this.postsService.getTagList()
            this.util.render(res, 200, tags.map(tag => tag.toJSON()));
        } catch (e) {
            this.util.renderError(res, 422, e);
        }
    }
}