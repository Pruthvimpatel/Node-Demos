"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
    static associate;
    static async hashPassword(user) {
        if (user.password) {
            const salt = await bcrypt_1.default.genSalt(10);
            user.password = await bcrypt_1.default.hash(user.password, salt);
        }
    }
}
exports.default = User;
const user = (sequelize, DataTypes) => {
    User.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'User',
        tableName: 'users',
        hooks: {
            beforeCreate: User.hashPassword,
            beforeUpdate: User.hashPassword,
        }
    });
    return User;
};
exports.user = user;
