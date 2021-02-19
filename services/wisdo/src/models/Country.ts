import {DataTypes, Model, Sequelize,} from 'sequelize'
import {DbInterface} from "../db";

class Country extends Model {
    public id!: string;
    public name!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt!: Date;

    static associate(models: DbInterface) {
        this.hasMany(models.user);
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
                name: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
                    unique: true,
                    field: 'email',
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
                tableName: 'countries',
                paranoid: true,
                underscored: true,
                sequelize
            });
    }
}
export default Country