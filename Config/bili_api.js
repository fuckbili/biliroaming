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
let app_search = require('./api/app_search')
let web_search = require('./api/web_search')
let th_search = require('./api/th_app_search')
let th_season = require('./api/th_season')
let uid = require('./api/checkip')
const api_th_season = async(access_key, season_id, area) => {
    try {
        th_season.options.httpsAgent = HttpsAgent(area)
        th_season.params.access_key = access_key //如果要使用自己的access_key就注释这一行，取消注释下一行
            //th_season.params.access_key ='你的access_key'
        th_season.params.season_id = season_id
        th_season.options.url = `https://app.biliintl.com/intl/gateway/v2/ogv/view/app/season?${sign_Params(th_season.params, bstar_Sign)}`
        let resp = await axios(th_season.options)
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
const api_pcurl = async(access_key, avid, bvid, cid, ep_id, fnval, fourk, qn, ts, area) => { //获取web番剧视频地址
    try {
        pcurl.options.httpsAgent = HttpsAgent(area)
        pcurl.params.access_key = access_key
        pcurl.params.avid = avid
        pcurl.params.bvid = bvid
        pcurl.params.ep_id = ep_id
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
const api_playurl = async(access_key, cid, ep_id, fnval, fourk, qn, ts, area) => { //app客户端视频地址
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
const api_th_playurl = async(access_key, cid, ep_id, fnval, fourk, qn, ts, area) => { //东南亚app客户端视频地址
    try {
        th_playurl.options.httpsAgent = HttpsAgent(area)
        th_playurl.params.access_key = access_key //如果要使用自己的access_key就注释这一行，取消注释下一行
            //th_playurl.params.access_key = '你的access_key'
        th_playurl.params.ts = ts
        th_playurl.params.ep_id = ep_id
        th_playurl.params.cid = cid
        th_playurl.params.fnval = fnval
        th_playurl.params.fourk = fourk
        th_playurl.params.qn = qn
        th_playurl.options.url = `https://app.biliintl.com/intl/gateway/v2/ogv/playurl?${sign_Params(th_playurl.params, bstar_Sign)}`
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
const api_th_subtitle = async(ep_id) => { //字幕
    try {
        th_subtitle.options.httpsAgent = HttpsAgent('th')
        th_subtitle.params.ep_id = ep_id
        th_subtitle.options.url = `https://app.biliintl.com/intl/gateway/v2/app/subtitle?${sign_Params(th_subtitle.params, bstar_Sign)}`
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
const api_app_search = async(access_key, fnval, fourk, keyword, pn, ps, qn, statistics, ts, type, area) => { //app搜索
    try {
        app_search.options.httpsAgent = HttpsAgent(area)
        app_search.params.access_key = access_key
        app_search.params.fnval = fnval
        app_search.params.fourk = fourk
        app_search.params.keyword = keyword
        app_search.params.pn = pn
        app_search.params.ps = ps
        app_search.params.qn = qn
        app_search.params.statistics = statistics
        app_search.params.ts = ts
        app_search.params.type = type
        app_search.options.url = `https://app.bilibili.com/x/v2/search/type?${sign_Params(app_search.params, app_Sign)}`
        let resp = await axios(app_search.options)
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
const api_web_search = async(search_type, keyword, area) => { //网页搜索
    try {
        web_search.options.httpsAgent = HttpsAgent(area)
        web_search.params.search_type = search_type
        web_search.params.keyword = keyword
        web_search.options.url = `https://api.bilibili.com/x/web-interface/search/type?${sign_Params(web_search.params, web_Sign)}`
        let resp = await axios(web_search.options)
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
const api_th_search = async(params) => { //东南亚搜索
    try {
        th_search.options.httpsAgent = HttpsAgent('th')
        th_search.params = params
        th_search.options.url = `https://app.biliintl.com/intl/gateway/v2/app/search/type?${sign_Params(th_search.params, bstar_Sign)}`
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
const api_uid = async(access_key) => { //获取信息
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
    api_th_season,
    api_pcurl,
    api_playurl,
    api_th_playurl,
    api_th_subtitle,
    api_app_search,
    api_web_search,
    api_th_search,
    api_uid
}
