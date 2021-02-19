import {BelongsToManyAddAssociationsMixin, DataTypes, Model, Sequelize,} from 'sequelize'
import {DbInterface} from "../db";
import Tag from "./Tag.js";

class Post extends Model {
    public id!: string;
    public title!: string;
    public summary!: string;
    public body!: string;
    public authorId!: string;
    public approverId!: string;
    public communityId!: string;
    public status!: string;
    public image!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt!: Date;

    public setTags!: BelongsToManyAddAssociationsMixin<Tag, string>;

    static associate(models: DbInterface) {
        this.belongsTo(models.user, {as: 'author', foreignKey: 'author_id'});
        this.belongsTo(models.user, {as: 'approver', foreignKey: 'approver_id'});
        this.belongsTo(models.community);
        this.hasMany(models.like);
        this.belongsToMany(models.tag, {through: models.postTag});
    }

    public static initialize(sequelize: Sequelize) {
        return this.init({
                id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true,
                    defaultValue: DataTypes.UUIDV4,
                    field: 'id'
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'title',
                },
                summary: {
                    type: DataTypes.TEXT,
                    field: 'summary',
                    allowNull: false
                },
                body: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    field: 'body',
                },
                authorId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'author_id',
                },
                approverId: {
                    type: DataTypes.UUID,
                    allowNull: true,
                    field: 'approver_id',
                },
                communityId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'community_id',
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: "Pending approval",
                    field: 'status',
                },
                image: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    field: 'image',
                },
                createdAt: {
                    type: DataTypes.DATE(3),
                    allowNull: false,
                    field: 'created_at',
                },
                updatedAt: {
                    type: DataTypes.DATE(3),
                    allowNull: false,
                    field: 'updated_at',
                },
                deletedAt: {
                    type: DataTypes.DATE(3),
                    allowNull: true,
                    field: 'deleted_at',
                }
            },
            {
                tableName: 'posts',
                paranoid: true,
                underscored: true,
                sequelize
            });
    }
}

export default Post