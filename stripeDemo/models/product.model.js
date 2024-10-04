
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        stripeProductId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        stripePriceId: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Product;
}