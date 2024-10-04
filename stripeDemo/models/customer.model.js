module.exports = (sequelize, DataTypes) => {
    
  const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    stripeCustomerId: {
        type: DataTypes.STRING,
        allowNull: true
    }
  });
 
  return Customer;
}