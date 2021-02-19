import {Sequelize} from 'sequelize';

/**
 * Interface that will be pass to each http incoming request,
 * This will contain each model we have defined
 */
export interface DbInterface {
    sequelize: Sequelize;
    Sequelize: any;
    community: any,
    country: any,
    post: any,
    postTag: any,
    role: any,
    tag: any,
    user: any,
    userCommunity: any,
    like: any,
    models: any[]
}