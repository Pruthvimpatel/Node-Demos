import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import bcrypt from "bcrypt";
import db from '../sequelize-client';


export interface UserModelCreationAttributes {
    email: string;
    password: string;
}

export interface UserModelAttribtes extends UserModelCreationAttributes {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture?: string | null;
}

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<string>;
    declare email: string;
    declare password: string;
    declare firstName: CreationOptional<string>;
    declare lastName: CreationOptional<string>;
    declare profilePicture: CreationOptional<string | null>

    static associate: (models: typeof db) => void;

    static async hashPassword(user:User) {
        if(user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password,salt);
        }
    }
}

export const user = (sequelize: Sequelize.Sequelize,DataTypes:typeof Sequelize.DataTypes)=>{
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            email: {
                type: DataTypes.STRING,
                unique:true,
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
            profilePicture: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        },
        {
            sequelize,
            underscored: true,
            timestamps: true,
            modelName: 'User',
            tableName: 'users',
            hooks:{
                beforeCreate:User.hashPassword,
                beforeUpdate:User.hashPassword,
            }
        }
    )

    return User;
};