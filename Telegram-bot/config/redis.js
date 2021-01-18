const redis = require("redis");
const config = require("./redis_config");

let c = config.redis,
    client = redis.createClient(c.port, c.host, c.options);

client.on("error", function (err) {
    console.log(err);
});

function Cache() {}

let text = async (key) => {
    let doc = await new Promise((resolve) => {
        client.get(key, function (err, res) {
            return resolve(res);
        });
    });
    return JSON.parse(doc);
};

Cache.set = function (key, value) {
    value = JSON.stringify(value);
    return client.set(key, value, function (err) {
        if (err) {
            console.error(err);
        }
    });
};
Cache.setex = function (key, time, value) {
    value = JSON.stringify(value);
    return client.setex(key, time, value, function (err) {
        if (err) {
            console.error(err);
        }
    });
};
Cache.del=function(key){
    return client.del(key,function(err){
        if (err){
            console.log(err)
        }  
    })
}
Cache.get = async (key) => {
    return await text(key);
};

Cache.expire = function (key, time) {
    return client.expire(key, time);
};

module.exports = Cache;