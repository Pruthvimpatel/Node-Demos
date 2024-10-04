import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../sequelize-client";

export interface ProductModelCreationAttributes {
    name: string;
    description: string;
    price: number;
}

export interface ProductModelAttributes extends ProductModelCreationAttributes {
    id: string;
    userId: string;
    categoryId: string;
}

export default class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare description: string;
    declare price: number;
    declare userId: CreationOptional<string>;
    declare categoryId: CreationOptional<string>;
    static associate: (models: typeof db) => void;

}
export const product = (sequelize: Sequelize.Sequelize, DataTypes: typeof Sequelize.DataTypes) => {
    Product.init(
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
            price: {
                type: DataTypes.FLOAT
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            categoryId: {
                type: DataTypes.UUID,
                allowNull: false
            }
            
        },
        {
            sequelize,
            underscored: true,
            timestamps: true,
            paranoid: true,
            modelName: 'Product',
            tableName: 'products',

        }
    )

    Product.associate = (models) => {
        Product.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'id',
        })


    Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        targetKey: 'id',
        }) 
    };

    

    return Product;
};
