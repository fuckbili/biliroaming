const sql = require('./sql')
const redis = require('./redis')
const api = require('./bili_api')
const ts = () => Math.round(Date.now() / 1000)
async function black(uid) { //是否黑名单
    cache_uid = await redis.get('uid' + uid)
    switch (cache_uid != null || cache_uid != undefined) {
        case true:
            return cache_uid
        case false:
            data = await sql.query(`SELECT * FROM bili_uid WHERE uid=${uid} and black='true'`)
            switch (data.length != 0) {
                case true:
                    redis.setex('uid' + uid, 86400, 'black')
                    return 'black'
                case false:
                    redis.setex('uid' + uid, 86400, 'white')
                    return 'white'
            }
    }

}
async function check(access_key) { //检测是否缓存uid
    switch (access_key != null && access_key != '' && access_key != undefined) {
        case true:
            redis_uid = await redis.get(access_key) //是否缓存uid
            switch (redis_uid != null || redis_uid != undefined) {
                case true: //已缓存uid
                    return await black(redis_uid)
                case false: //未缓存uid
                    myinfo = await api.api_uid(access_key) //获取个人信息
                    switch (myinfo.code) {
                        case 0:
                            try {
                                var uid = myinfo.data.mid //获取uid
                                redis.setex(access_key, 86400, uid) //缓存1天
                                return await black(uid)
                            } catch (error) {
                                console.log(error)
                                return false
                            }

                            default:
                                return false
                    }
            }
            case false:
                return false
    }
}
async function check_cid(cid, area) { //检测是否缓存cid
    url = await redis.get('cid' + area + cid)
    switch (url != null || url != undefined) {
        case true:
            return url
        case false:
            return false
    }
}
async function check_url(cid, url, fnval, qn, area) { //检测是否为受限番剧
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
async function playurl(params) {
    let access_key = params.access_key
    let cid = params.cid || 3684209 //没有cid就换成葫芦娃
    let ep_id = params.ep_id || 62780
    let ts = params.ts
    let fnval = params.fnval
    let fourk = params.fourk
    let qn = params.qn || 80
    let area = params.area || 'cn'
    data = await check(access_key)
    switch (data) {
        case 'black': //黑名单换成葫芦娃
            url_data = await api.api_playurl(access_key, 3684209, 62780, ts, fnval, fourk, qn, 'cn')
            return url_data
        case 'white':
            data_url = await check_cid(cid, area)
            switch (data_url) {
                case false:
                    url_data = await api.api_playurl(access_key, cid, ep_id, fnval, fourk, qn, ts, area)
                    check_url(cid, url_data, fnval, qn, area)
                    return url_data
                default:
                    return data_url
            }
            case false:
                return {
                    "code": -403,
                    "message": "未登录"
                }
                default:
                    return {
                        "code": -404,
                        "message": "请求错误"
                    }
    }
}
async function th_playurl(params) {
    let access_key = params.access_key
    let cid = params.cid || 3684209 //没有cid就换成葫芦娃
    let ep_id = params.ep_id || 62780
    let ts = params.ts
    let fnval = params.fnval
    let fourk = params.fourk
    let qn = params.qn || 80
    let area = params.area||'cn'
    data = await check(access_key)
    switch (data) {
        case 'black': //黑名单换成葫芦娃
            url_data = await api.api_playurl(access_key, 3684209, 62780, ts, fnval, fourk, qn, area)
            return url_data
        case 'white':
            data_url = await check_cid(cid,area)
            switch (data_url) {
                case false:
                    url_data = await api.api_th_playurl(access_key, cid, ep_id, fnval, fourk, qn, ts, area)
                    check_url(cid, url_data, fnval, qn,area)
                    return url_data
                default:
                    return data_url
            }
            case false:
                return {
                    "code": -403,
                    "message": "未登录"
                }
                default:
                    return {
                        "code": -404,
                        "message": "请求错误"
                    }
    }
}
async function th_search(params) {
    data = await api.api_th_search(params)
    return data
}
async function th_subtitle(params) {
    let ep_id = params.ep_id
    data = await api.api_th_subtitle(ep_id)
    return data
}
module.exports = {
    playurl,
    th_playurl,
    th_search,
    th_subtitle
}