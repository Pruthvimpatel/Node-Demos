import Sequelize,{CreationOptional, ForeignKey, Model } from 'sequelize';
import db from '../sequelize-client'; 
import User from './user.model'; 

interface AccessTokenModelCreationAttributes {
  tokenType: 'ACCESS' | 'RESET' | 'REFRESH';
  token: string;
  userId: string;
  expiredAt?: Date;
}

interface AccessTokenModelAttributes extends AccessTokenModelCreationAttributes {
  id: string;
}

class AccessToken extends Model<AccessTokenModelAttributes, AccessTokenModelCreationAttributes> implements AccessTokenModelAttributes {
  declare id: CreationOptional<string>;
  declare token: string;
  declare tokenType: 'ACCESS' | 'RESET' | 'REFRESH';
  declare userId: ForeignKey<User['id']>;
  declare expiredAt: CreationOptional<Date>;

  static associate: (models: typeof db) => void;
}

export const accessToken = (sequelize: Sequelize.Sequelize, DataTypes: typeof Sequelize.DataTypes) => {
  AccessToken.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      tokenType: {
        type: DataTypes.ENUM('ACCESS', 'RESET' , 'REFRESH'),
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
    },
    {
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
    }
  );

  AccessToken.associate = models => {
    AccessToken.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
  };

  return AccessToken;
};
