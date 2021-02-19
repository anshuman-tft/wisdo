import {injectable} from "inversify";
import {DBFactory} from '../../../../db';
import Community from "../../../../models/Community";

@injectable()
export class CommunitiesService {

    async getCommunities(): Promise<[Community]> {
        return DBFactory.db.community.findAll();
    };

    async getCommunity(queryObj: any): Promise<Community> {
        return DBFactory.db.community.findOne({where: queryObj});
    }
}