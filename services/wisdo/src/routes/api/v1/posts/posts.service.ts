import {injectable} from "inversify";
import {DBFactory} from '../../../../db';
import {GET_ALL_POSTS, POST_PAYLOAD} from "./interface";
import Post from "../../../../models/Post";
import Like from "../../../../models/Like";
import User from "../../../../models/User";

@injectable()
export class PostsService {

    addPost = (payload: POST_PAYLOAD) => {
        return DBFactory.db.post.create(payload);
    };

    updatePost = (postInstance: Post, payload: POST_PAYLOAD) => {
        return postInstance.update(payload);
    };

    updatePostStatus = (postInstance: Post, status: string) => {
        return postInstance.update({status});
    };

    updatePostReaction = async (postInstance: Post, user: string): Promise<string> => {
        const reaction: Like = await DBFactory.db.like.findOne({
            where: {
                postId: postInstance.id,
                userId: user,
            }
        })
        let result = "LIKED"
        if (!reaction) {
            await DBFactory.db.like.create({postId: postInstance.id, userId: user})
        } else {
            result = "DIS-LIKED"
            await DBFactory.db.like.destroy({where: {postId: postInstance.id, userId: user}});
        }
        return result
    };

    getPost = (query) => {
        return DBFactory.db.post.findOne({where: query});
    };

    findTag = (tag: string) => {
        return DBFactory.db.tag.findOne({where: {id: tag}});
    };

    getFeed = async (user: User): Promise<Post[]> => {
        const communities = user['Communities'].map(val => val.id);
        return DBFactory.db.post.findAll({
            where: {
                communityId: communities,
                status: 'Approved'
            },
            include: [
                {
                    model: DBFactory.db.user,
                    as: 'author',
                    required: false
                },
                {
                    model: DBFactory.db.like,
                    required: false
                }
            ],
            group: ['id'],
            order: [
                [DBFactory.db.Sequelize.literal(`IF (author.country_id = '${user.countryId}', 0, 1 )`), 'ASC'],
                [DBFactory.db.Sequelize.fn("COUNT", DBFactory.db.Sequelize.col("Likes.post_id")), 'DESC'],
                [DBFactory.db.Sequelize.fn('length', DBFactory.db.Sequelize.col('body')), 'DESC']
            ]
        });
    };

    getAllPosts = ({userId, communityId, postStatus}: GET_ALL_POSTS): Promise<Post[]> => {
        const query = {
            communityId
        }
        if (userId) {
            query['authorId'] = userId
        }
        if (postStatus.length === 1) {
            query['status'] = postStatus[0]
        }
        return DBFactory.db.post.findAll({
            // where: query,
            include: [{
                model: DBFactory.db.tag,
                attributes: ["id", "value"],
                through: {attributes: []},
            }, {
                model: DBFactory.db.like,
                attributes: ["id"]
            }]
        })
    };

    getUserPosts = async (user) => {
        return DBFactory.db.post.findAll({
            where: {authorId: user.id},
            include: [
                {
                    model: DBFactory.db.tag,
                    attributes: ["id", "value"],
                    through: {attributes: []},
                },
                {
                    model: DBFactory.db.like,
                    attributes: ["id"]
                }
            ]
        })
    }

    addTags = (postInstance: any, tagIds: string[]) => {
        return postInstance.setTags(tagIds)
    };

    getTagList = () => {
        return DBFactory.db.tag.findAll()
    };
}