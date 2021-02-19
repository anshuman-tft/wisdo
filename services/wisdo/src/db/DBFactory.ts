import {Sequelize} from 'sequelize';
import {injectable} from "inversify";
import {DbInterface} from './DbInterface';

import User from '../models/User';
import Country from '../models/Country';
import Community from '../models/Community';
import Post from '../models/Post';
import PostTag from '../models/PostTag';
import Role from '../models/Role';
import Tag from '../models/Tag';
import UserCommunity from '../models/UserCommunity';
import Like from "../models/Like";

@injectable()
export class DBFactory {

    public static db: DbInterface;

    public createModels = (sequelizeConfig: any): DbInterface => {
        if (DBFactory.db) return;
        const {name, user, password, host, port, shouldLogQueries} = sequelizeConfig;
        const sequelize = new Sequelize(name, user, password, {
            host,
            port,
            dialect: 'mysql',
            logging: shouldLogQueries,
            // timezone: '+05:30', // for
            dialectOptions: {
                typeCast: (field, next) => {
                    if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
                        return new Date(field.string() + 'Z');
                    }
                    return next();
                },
                multipleStatements: true,
            },
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        });

        const models = [
            Community,
            Country,
            Role,
            Tag,
            User,
            UserCommunity,
            Post,
            Like,
            PostTag
        ];

        models.forEach(model => model.initialize(sequelize));

        DBFactory.db = {
            sequelize,
            Sequelize,
            community: Community,
            country: Country,
            post: Post,
            postTag: PostTag,
            role: Role,
            tag: Tag,
            user: User,
            userCommunity: UserCommunity,
            models: models,
            like: Like,
        };

        Object.keys(DBFactory.db).forEach(modelName => {
            if (DBFactory.db[modelName].associate) {
                DBFactory.db[modelName].associate(DBFactory.db);
            }
        });

        return DBFactory.db;
    };
}