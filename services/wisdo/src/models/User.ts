import {DataTypes, Model, Sequelize,} from 'sequelize'
import {DbInterface} from "../db";

class User extends Model {
    public id!: string;
    public name!: string;
    public roleId!: string;
    public email!: string;
    public image!: string;
    public countryId!: string;
    public isActive!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt!: Date;

    static associate(models: DbInterface) {
        this.belongsTo(models.role);
        this.belongsTo(models.country);
        this.hasMany(models.like);
        this.belongsToMany(models.community, {through: models.userCommunity});
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
                name: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                    field: 'name',
                },
                roleId: {
                    type: DataTypes.UUID,
                    field: 'role_id',
                    allowNull: true
                },
                email: {
                    type: DataTypes.STRING(80),
                    allowNull: true,
                    unique: true,
                    field: 'email',
                },
                image: {
                    type: DataTypes.STRING,
                    field: 'image',
                },
                countryId: {
                    type: DataTypes.UUID,
                    field: 'country_id',
                },
                isActive: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: true,
                    field: 'is_active',
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
                tableName: 'users',
                paranoid: true,
                underscored: true,
                sequelize
            });
    }
}
export default User