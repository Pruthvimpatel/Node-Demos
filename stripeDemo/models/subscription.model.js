
module.exports = (sequelize, DataTypes) => {
    const Subscription = sequelize.define('Subscription', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        stripeSubscriptionId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        plan: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Subscription;
};