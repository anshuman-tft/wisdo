import {DataTypes, Model, Sequelize,} from 'sequelize'
import {DbInterface} from "../db";

class Community extends Model {
    public id!: string;
    public title!: string;
    public image!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt!: Date;

    static associate(models: DbInterface) {
        this.belongsToMany(models.user, {through: models.userCommunity});
    }

    public static initialize(sequelize: Sequelize) {
        return this.init({
                id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true,
                    defaultValue: DataTypes.UUIDV4,
                    field: 'id',
                },
                title: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                    unique: true,
                    field: 'title',
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
                tableName: 'communities',
                paranoid: true,
                underscored: true,
                sequelize
            });
    }
}
export default Community