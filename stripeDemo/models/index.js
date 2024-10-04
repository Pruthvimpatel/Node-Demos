const dbConfig = require("../config/db");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
})

const db = {};
db.customer = require("./customer.model")(sequelize, Sequelize);
db.product = require("./product.model")(sequelize, Sequelize);
db.subscription = require("./subscription.model")(sequelize,Sequelize);
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
