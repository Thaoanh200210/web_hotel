const config = {
    development: {
        port: "3000",
        hostname: "127.0.0.1",
        method: "http",
        secretToken: "development",
        expireToken: 1000,
        dbUri: "mongodb://127.0.0.1:27017/hotel_management",
    }
};


module.exports = config;