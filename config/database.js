module.exports = {
    mongodb: {
        host: process.env.MONGO_DB_HOST,
        port: process.env.MONGO_DB_PORT,
        username: process.env.MONGO_DB_USERNAME,
        password: process.env.MONGO_DB_PASSWORD,
        database_name: process.env.MONGO_DB_NAME,
    }
}
