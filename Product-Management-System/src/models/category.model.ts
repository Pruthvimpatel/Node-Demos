import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../sequelize-client";

export interface CategoryModelCreationAttributes {
    name: string;
    description: string;
}

export interface CategoryModelAttributes extends CategoryModelCreationAttributes {
    id: string;
    userId: string;
}

export default class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare description: string;
    declare userId: CreationOptional<string>;

    static associate: (models: typeof db) => void;

}
export const category = (sequelize: Sequelize.Sequelize, DataTypes: typeof Sequelize.DataTypes) => {
    Category.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false
            },
        },
        {
            sequelize,
            underscored: true,
            timestamps: true,
            paranoid: true,
            modelName: 'Category',
            tableName: 'categories',

        }
    )

    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            foreignKey: 'categoryId',
            sourceKey: 'id',
        })

        Category.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'id',
        })
        
    };
    return  Category;
};
