module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "ADS",
    DB: "users_db",
    DIALECT: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}