const {
    check_cid,
    check_url,
    check,
    check_auth,
    check_ip
} = require('./net_model')

const config = require('./config')
const api = require('./bili_api')


const ip = async (req, res, next) => { //检测请求频率
    switch (config.check_ip) {
        case false: //不开启请求频率限制
            return next()
        case true: //开启请求频率限制
            return await check_ip(req, res, next)
        default:
            return res.send('检测请求频率配置填写错误')
    }
}
const auth = async (req, res, next) => {
    switch (config.check_auth) {
        case false: //不开启登录验证
            return next()
        case true: //开启登录验证
            return check_auth(req, res, next)
        default:
            return res.send('检测登录验证配置填写错误')
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
    switch (data) { //检测是否有权限获取视频地址
        case true:
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
                url_data = await api.api_playurl(access_key, 3684209, 62780, ts, fnval, fourk, qn, 'cn')
                return url_data
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
    let area = params.area || 'cn'
    data = await check(access_key)
    switch (data) {
        case true:
            data_url = await check_cid(cid, area)
            switch (data_url) {
                case false:
                    url_data = await api.api_th_playurl(access_key, cid, ep_id, fnval, fourk, qn, ts, area)
                    check_url(cid, url_data, fnval, qn, area)
                    return url_data
                default:
                    return data_url
            }
            case false:
                url_data = await api.api_playurl(access_key, 3684209, 62780, ts, fnval, fourk, qn, area)
                return url_data
    }
}
async function web_playurl(params) {
    let access_key = params.access_key
    let cid = params.cid || 3684209 //没有cid就换成葫芦娃
    let avid = params.avid
    let bvid = params.bvid
    let ep_id = params.ep_id
    let ts = params.ts
    let fnval = params.fnval || 80
    let fourk = params.fourk
    let qn = params.qn || 80
    let area = params.area || 'tw'
    data = await check(access_key)
    switch(data){
        case true:
            url_data = await await api.api_pcurl(access_key,avid,bvid, cid, ep_id,fnval, fourk, qn, ts, area)
            return url_data
            case false:
                url_data = await api.api_pcurl(access_key,avid,bvid, 3684209, 62780,fnval, fourk, qn, ts, 'cn')
                return url_data
    }
}
async function th_search(params) { //area默认泰国,修改去bili_api里面改
    data = await api.api_th_search(params)
    return data
}
async function th_subtitle(params) { //area默认泰国
    let ep_id = params.ep_id
    data = await api.api_th_subtitle(ep_id)
    return data
}
module.exports = {
    ip,
    auth,
    playurl,
    th_playurl,
    web_playurl,
    th_search,
    th_subtitle
}