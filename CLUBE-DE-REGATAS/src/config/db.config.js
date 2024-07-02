module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "vitor3012",
    DB: "users_db",
    DIALECT: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}