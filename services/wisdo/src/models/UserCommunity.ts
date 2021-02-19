import {Model, Sequelize,} from 'sequelize'

class UserCommunity extends Model {

    public static initialize(sequelize: Sequelize) {
        return this.init({},
            {
                tableName: 'user_communities',
                paranoid: true,
                underscored: true,
                sequelize
            });
    }
}
export default UserCommunity