import {injectable} from "inversify";
import {DBFactory} from '../../../../db';

@injectable()
export class UsersService {

    getUserByCommunity = async (query: any) => {
        return DBFactory.db.user.findOne({
            where: {id: query.user},
            attributes: ["id", "name", "roleId", "email", "countryId", "isActive"],
            include: [
                {
                    model: DBFactory.db.community,
                    where: {id: query.community},
                    through: {attributes: []},
                    attributes: ["id", "title"]
                }, {
                    model: DBFactory.db.role,
                    attributes: ["id", "title"]
                }
            ]
        });
    };

    getUser = async (query: any, includeCommunities = false, includeRoles = false) => {
        const queryObj = {
            where: query
        }
        if (includeCommunities) {
            queryObj['include'] = [
                {
                    model: DBFactory.db.community,
                    attributes: ["id", "title"]
                }
            ]
        }
        if (includeRoles) {
            queryObj['include'] = queryObj['include'] || [];
            queryObj['include'].push(
                {
                    model: DBFactory.db.role,
                    attributes: ["id", "title"]
                }
            )
        }
        return DBFactory.db.user.findOne(queryObj);
    };

    getUsers = () => {
        return DBFactory.db.user.findAll();
    };

    getAllRoles = () => {
        return DBFactory.db.role.findAll();
    };

    getRole = (query) => {
        return DBFactory.db.role.findOne({
            where: query
        });
    };

    createUser = async (userObject: any) => {
        return DBFactory.db.user.create(userObject);
    };

    deleteUser = (id: string) => {
        return DBFactory.db.user.destroy({
            where: {id}
        })
    }
    updateUser = (userInstance, userObject) => {
        return userInstance.update(userObject);
    };

    getCommunities = (user) => {
        return DBFactory.db.user.findOne({
            where: {id: user.id},
            attributes: ["id", "name", "roleId", "email", "countryId", "isActive"],
            include: [
                {
                    model: DBFactory.db.community,
                    through: {attributes: []},
                    attributes: ["id", "title"]
                }, {
                    model: DBFactory.db.role,
                    attributes: ["id", "title"]
                }
            ]
        });
    };

    updateCommunities = async (user: any, communities: any[]) => {
        await DBFactory.db.userCommunity.destroy({where: {user_id: user.id}, force: true});
        return user.setCommunities(communities);
    };
}