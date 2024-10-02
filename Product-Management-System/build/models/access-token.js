"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessToken = void 0;
const sequelize_1 = require("sequelize");
class AccessToken extends sequelize_1.Model {
    static associate;
}
const accessToken = (sequelize, DataTypes) => {
    AccessToken.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        tokenType: {
            type: DataTypes.ENUM('ACCESS', 'RESET', 'REFRESH'),
            defaultValue: 'ACCESS',
        },
        token: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_id'
        },
        expiredAt: {
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'AccessToken',
        tableName: 'access_tokens',
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'token'],
            },
        ],
    });
    AccessToken.associate = models => {
        AccessToken.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
    };
    return AccessToken;
};
exports.accessToken = accessToken;
