import {DataTypes, Model, Sequelize,} from 'sequelize'
import {DbInterface} from "../db";

class Tag extends Model {
    public id!: string;
    public value!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt!: Date;

    static associate(models: DbInterface) {
        this.belongsToMany(models.post, {through: models.postTag});
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
                value: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                    unique: true,
                    field: 'value',
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
                tableName: 'tags',
                paranoid: true,
                underscored: true,
                sequelize
            });
    }
}
export default Tag