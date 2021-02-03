const redis = require('./redis')
const ts = () => Math.round(Date.now() / 1000)

const api = require('./bili_api')
const config = require('./config')
const sql = require('./sql')


const check_cid = async (cid, area) => { //检测是否缓存cid
    url = await redis.get('cid' + area + cid)
    switch (url != null && url != undefined) {
        case true:
            return url
        case false:
            return false
    }
}
const check_url = async (cid, url, fnval, qn, area) => { //检测是否为受限番剧
    switch (url.code) {
        case 0:
            switch (fnval) {
                case '208':
                    switch (qn >= 80) {
                        case true:
                            redis.setex('cid' + area + cid, 4500, url)
                            return
                        default:
                            return false
                    }
                    case '16':
                        switch (qn >= 80) {
                            case true:
                                redis.setex('cid' + area + cid, 4500, url)
                                return
                            default:
                                return false
                        }
                        default:
                            return false
            }
            default:
                return false
    }
}
const check_sql = async (uid, access_key, vip_exp) => {//记录uid信息
    try {
        sql_data = await sql.query(`SELECT * FROM bili_uid WHERE uid=${uid}`)
        switch (sql_data.length != 0) {
            case true:
                sql.query(`UPDATE bili_uid SET access_key='${access_key}',last_time=${ts()},vip_exp=${vip_exp} WHERE uid=${uid}`)
                return
            case false:
                sql.query('INSERT IGNORE INTO bili_uid(uid,access_key,last_time,vip_exp) VALUES(?,?,?,?)', [uid, access_key, ts(), vip_exp])
                return
        }
    } catch (error) {
        console.log(error)
        return
    }
}
const get_sql_uid = async (uid) => {//从数据库获取uid信息
    data = await sql.query(`SELECT * FROM bili_uid WHERE uid=${uid}`)
    switch (data.length != 0) {
        case true:
            let mode = data[0].mode
            switch (mode) {
                case 'white':
                    redis.setex('uid' + uid, 86400, 'white')
                    return true
                case 'black':
                    redis.setex('uid' + uid, 86400, 'black')
                    return false
                case 'visit':
                    redis.setex('uid' + uid, 86400, 'visit')
                    switch (config.check_mode) { //检测模式
                        case 1:
                            return false
                        case 2:
                            return true
                        default:
                            return false
                    }
                    default:
                        return false
            }
            case false:
                check_sql(uid) //防止手动删除数据导致bug
                return false
    }
}
const check_mode = async (uid) => {//检测当前模式,判断访客是否可获取视频地址
    cache_uid = await redis.get('uid' + uid) //检测是否缓存了uid信息
    switch (cache_uid) {
        case 'white':
            return true
        case 'black':
            return false
        case 'visit': //检测访客
            switch (config.check_mode) {
                case 1:
                    return false
                case 2:
                    return true
                default:
                    return false
            }
            default:
                return await get_sql_uid(uid) //从数据库查询Uid信息
    }

}
const check_uid = async (access_key) => {//从redis获取uid
    redis_uid = await redis.get(access_key)
    switch (redis_uid != null && redis_uid != undefined) { //检测是否缓存,开启了登录检验会缓存,以防万一还是加个检验
        case true:
            return await check_mode(redis_uid)
        case false: //未缓存概率极小,几乎不可能发生
            return false
    }
}
const check = async (access_key) => {//检测是否开启登录检验
    switch (config.check_auth) { 
        case false: //未开启,所有人可用,不使用黑白名单
            return true
        case true:
            return await check_uid(access_key)
        default: //登录检验填写错误,false or true
            console.log('登录检验填写错误')
            return false
    }
}
const check_auth = async (req, res, next) => { //登录检验
    let access_key = req.query.access_key //获取access_key
    switch (access_key != undefined && access_key != null && access_key.length == 32) {
        case true:
            redis_uid = await redis.get(access_key)
            switch (redis_uid != null && redis_uid != undefined) {
                case true:
                    return next()
                case false:
                    myinfo = await api.api_uid(access_key) //获取个人信息
                    switch (myinfo.code) {
                        case 0:
                            try {
                                switch (myinfo.data.isLogin) {
                                    case true:
                                        let uid = myinfo.data.mid //获取uid
                                        let vip_exp = myinfo.data.vipDueDate //vip过期时间
                                        redis.setex(access_key, 86400, uid) //缓存1天
                                        check_sql(uid, access_key, vip_exp) //个人信息存入数据库,之后会用到
                                        return next()
                                    default:
                                        return res.status(403).json({
                                            "code": -403,
                                            "message": "未登录"
                                        })
                                }
                            } catch (error) {
                                console.log(error)
                                return res.status(500).json({
                                    "code": -500,
                                    "message": "未登录,登录验证出现错误"
                                })
                            }
                            default:
                                return res.status(403).json({ //code不为0
                                    "code": -403,
                                    "message": "未登录,获取信息失败"
                                })
                    }

            }
            case false:
                return res.status(403).json({
                    "code": -403,
                    "message": "未登录,access_Key不正常"
                })

    }

}
const check_ip = async (req, res, next) => {//检测ip请求频率
    let ip = req.headers['remote-host'] //已测试sql注入,nginx反向代理才能获取到
    switch (ip != undefined && ip != null && ip != '') {
        case false:
            return res.status(403).json({
                "code": -403,
                "message": "ip不正常"
            })
        case true:
            redis.incr(ip)
            data = await redis.get(ip)
            if (data > config.ip_num) {
                return res.status(403).json({
                    "code": -412,
                    "message": "请求频繁,请稍后再试"
                })
            }
            redis.expire(ip, 60)
            next()
    }
}
module.exports = {
    check_cid,
    check_url,
    check,
    check_auth,
    check_ip
}