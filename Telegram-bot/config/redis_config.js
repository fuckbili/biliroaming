
module.exports = {
    // ...
    redis: {
        host: "127.0.0.1",
        port: 6379,
        options: {
            timeout: 3000
        }
    },
    spam: {
        limit: 3,
        seconds: 60,
    },
}