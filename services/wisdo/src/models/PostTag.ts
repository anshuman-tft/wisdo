import {DataTypes, Model, Sequelize,} from 'sequelize'

class PostTag extends Model {

    public static initialize(sequelize: Sequelize) {
        return this.init({},
            {
                tableName: 'post_tags',
                paranoid: true,
                underscored: true,
                sequelize
            });
    }
}

export default PostTag