const redis = require('./redis')
const sql = require('./sql')
async function check_admin(Tg_id) {//检测是否是机器人管理员,bool
    redis_tgid = await redis.get('tg_admin' + Tg_id)
    switch (redis_tgid != null || redis_tgid != undefined) {
        case true:
            return true
        case false:
            sql_data = await sql.query(`SELECT * FROM bili_uid WHERE Tg_id=${Tg_id} and is_tg_admin='true'`)
            switch (sql_data.length != 0) {
                case true:
                    redis.setex('tg_admin' + Tg_id, 86400, Tg_id)
                    return true
                case false:
                    return false
            }

    }
}
async function check_black(uid) {//检测缓存是否是黑名单,如果是就删除缓存
    try {
        data = await sql.query(`insert into bili_uid(uid,black) values(${uid},'false') on duplicate key update black='false'`)
    } catch (error) {
        return 'UID:' + uid + '删除失败'
    }
    redis_black = await redis.get('uid' + uid)
    switch (redis_black) {
        case 'black':
            redis.del('uid' + uid)
            return 'UID:' + uid + '已删除成功，缓存是黑名单,并清除缓存'
        case 'white':
            return 'UID:' + uid + '已删除成功,缓存是白名单'
        default:
            return 'UID:' + uid + '已删除成功,没有缓存'
    }

}
async function check_white(uid) {//检测缓存是否是白名单,如果是就删除缓存
    try {
        data = await sql.query(`insert into bili_uid(uid,black) values(${uid},'true') on duplicate key update black='true'`)
    } catch (error) {
        return 'UID:' + uid + '添加失败'
    }
    redis_black = await redis.get('uid' + uid)
    switch (redis_black) {
        case 'black':
            return 'UID:' + uid + '已添加成功,缓存是黑名单'
        case 'white':
            redis.del('uid' + uid)
            return 'UID:' + uid + '已添加成功,缓存是白名单,并清除缓存'
        default:
            return 'UID:' + uid + '已添加成功,没有缓存'
    }

}
module.exports = {
    check_admin,
    check_black,
    check_white,
}