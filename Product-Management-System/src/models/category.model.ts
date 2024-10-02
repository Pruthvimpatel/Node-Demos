import Sequelize, {
    CreationOptional,
    InferAttributes,
    Model
} from "sequelize";

import db from '../sequelize-client';


export interface CategroyModelCreationAttributes  {
    name: string;
    description: string;
}

export interface CategoryModelAttributes  extends CategroyModelCreationAttributes {
    id: string;
}

export default class Category extends Model<InferAttributes<Category>,InferAttributes<Category>> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare description: string

    static associate:(models: typeof db ) => void;
}


export const category = (sequelize:Sequelize.Sequelize, DataTypes: typeof Sequelize.DataTypes) => {
    Category.init(
        {
            id: {
                type:DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Category name is required'
                    },
                    len: {
                        args:[3, 250],
                        msg: 'Category name must be between 3 to 250 characters.',
                    },
                }
            },
            description: {
             type: DataTypes.STRING,
             validate: {
                len: {
                    args:[0,250],
                    msg: 'description cannot exceed 255 characters'
                }
             }
            }
        },
        {
            sequelize,
            underscored: true,
            timestamps: true,
            paranoid: true,
            modelName: 'Category',
            tableName: 'categories'
        }
    );

    // Category.associate = (models) => {
    //     Category.hasMany(models.Product, {
    //       foreignKey: 'categoryId',
    //       sourceKey: 'id'
    //     });
    // };

    return Category;
}