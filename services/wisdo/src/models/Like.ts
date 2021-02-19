import {BelongsToManyAddAssociationsMixin, DataTypes, Model, Sequelize,} from 'sequelize'
import {DbInterface} from "../db";

class Like extends Model {
    public id!: string;
    public userId!: string;
    public postId!: string;
    public type!: string;   // In future we can convert like with multiple like options
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt!: Date;

    static associate(models: DbInterface) {
        this.belongsTo(models.user);
        this.belongsTo(models.post);
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
                userId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: 'user_id',
                },
                postId: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    field: 'post_id'
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
                tableName: 'likes',
                paranoid: true,
                underscored: true,
                sequelize
            });
    }
}

export default Like