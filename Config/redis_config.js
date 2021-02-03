const {redis_host,redis_port,redis_password}=require('./config')
module.exports = {
    // ...
    redis: {
        host: redis_host,
        port: redis_port,
        options: {
            timeout: 3000,
            auth_pass: redis_password
        }
    },
    spam: {
        limit: 3,
        seconds: 60,
    },
}