const axios = require('axios')
const {
    app_Sign,
    web_Sign,
    bstar_Sign,
    sign_Params
} = require('./api/sign.js')
const {
    HttpsAgent
} = require('./proxy.js') //代理
const req_error = {
    "code": -500,
    "message": "服务器错误，请稍后再试"
}


let playurl = require('./api/playurl')
let pcurl = require('./api/pc_url')
let th_playurl = require('./api/th_app_playurl')
let th_subtitle = require('./api/th_app_subtitle')
let th_search = require('./api/th_app_search')
let uid = require('./api/checkip')

async function api_pcurl(access_key,avid,bvid, cid,ep_id, fnval, fourk, qn, ts, area) { //获取web番剧视频地址
    try {
        pcurl.options.httpsAgent = HttpsAgent(area)
        pcurl.params.access_key = access_key
        pcurl.params.avid=avid
        pcurl.params.bvid=bvid
        pcurl.params.ep_id=ep_id
        pcurl.params.ts = ts
        pcurl.params.cid = cid
        pcurl.params.fnval = fnval
        pcurl.params.fourk = fourk
        pcurl.params.qn = qn
        pcurl.options.url = `https://api.bilibili.com/pgc/player/web/playurl?${sign_Params(pcurl.params, web_Sign)}`
        let resp = await axios(pcurl.options)
        return resp.data
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            return error.response.data
        } else if (error.request) {
            console.log(error.message);
            return req_error
        } else {
            console.log('Error', error.message);
            return req_error
        }
    }

}
async function api_playurl(access_key, cid, ep_id, fnval, fourk, qn, ts, area) { //app客户端视频地址
    try {
        playurl.options.httpsAgent = HttpsAgent(area)
        playurl.params.access_key = access_key
        //playurl.params.build=build
        playurl.params.ts = ts
        playurl.params.ep_id = ep_id
        playurl.params.cid = cid
        playurl.params.fnval = fnval
        playurl.params.fourk = fourk
        playurl.params.qn = qn
        playurl.options.url = `https://api.bilibili.com/pgc/player/api/playurl?${sign_Params(playurl.params, app_Sign)}`
        let resp = await axios(playurl.options)
        return resp.data
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            return error.response.data
        } else if (error.request) {
            console.log(error.message);
            return req_error
        } else {
            console.log('Error', error.message);
            return req_error
        }
    }

}
async function api_th_playurl(access_key, cid, ep_id, fnval, fourk, qn, ts, area) { //东南亚app客户端视频地址
    try {
        th_playurl.options.httpsAgent = HttpsAgent(area)
        th_playurl.params.access_key = access_key
        th_playurl.params.ts = ts
        th_playurl.params.ep_id = ep_id
        th_playurl.params.cid = cid
        th_playurl.params.fnval = fnval
        th_playurl.params.fourk = fourk
        th_playurl.params.qn = qn
        th_playurl.options.url = `https://api.global.bilibili.com/intl/gateway/v2/ogv/playurl?${sign_Params(th_playurl.params, bstar_Sign)}`
        let resp = await axios(th_playurl.options)
        return resp.data
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            return error.response.data
        } else if (error.request) {
            console.log(error.message);
            return req_error
        } else {
            console.log('Error', error.message);
            return req_error
        }
    }

}
async function api_th_subtitle(ep_id) { //字幕
    try {
        th_subtitle.options.httpsAgent = HttpsAgent('th')
        th_subtitle.params.ep_id = ep_id
        th_subtitle.options.url = `https://app.global.bilibili.com/intl/gateway/v2/app/subtitle?${sign_Params(th_subtitle.params, bstar_Sign)}`
        let resp = await axios(th_subtitle.options)
        return resp.data
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            return error.response.data
        } else if (error.request) {
            console.log(error.message);
            return req_error
        } else {
            console.log('Error', error.message);
            return req_error
        }
    }

}
async function api_th_search(params) { //东南亚搜索
    try {
        th_search.options.httpsAgent = HttpsAgent('th')
        th_search.params = params
        th_search.options.url = `https://app.global.bilibili.com/intl/gateway/v2/app/search/type?${sign_Params(th_search.params, bstar_Sign)}`
        let resp = await axios(th_search.options)
        return resp.data
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            return error.response.data
        } else if (error.request) {
            console.log(error.message);
            return req_error
        } else {
            console.log('Error', error.message);
            return req_error
        }
    }
}
async function api_uid(access_key) { //获取信息
    try {
        uid.options.httpsAgent = HttpsAgent('cn')
        uid.options.url = `https://api.bilibili.com/x/web-interface/nav?access_key=${access_key}`
        let resp = await axios(uid.options)
        return resp.data
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            return error.response.data
        } else if (error.request) {
            console.log(error.message);
            return req_error
        } else {
            console.log('Error', error.message);
            return req_error
        }
    }
}
module.exports = {
    api_pcurl,
    api_playurl,
    api_th_playurl,
    api_th_subtitle,
    api_th_search,
    api_uid
}