module.exports = {
    USER: process.env.POSTGRES_USERNAME,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    HOST: process.env.POSTGRES_HOST,
    DB: process.env.POSTGRES_DATABASE,
    dialect: process.env.Dialect,
}
