"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const sequelize_1 = require("sequelize");
class Product extends sequelize_1.Model {
    static associate;
}
exports.default = Product;
const product = (sequelize, DataTypes) => {
    Product.init({
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
    }, {
        sequelize,
        underscored: true,
        timestamps: true,
        paranoid: true,
        modelName: 'Product',
        tableName: 'products',
    });
    Product.associate = (models) => {
        Product.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'id',
        });
    };
    return Product;
};
exports.product = product;
