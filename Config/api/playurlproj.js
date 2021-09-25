//https://api.bilibili.com/pgc/player/api/playurlproj
const access_key=require('../config.js').access_key
const appkey = require('../config.js').android_ak

const headers = {
    'Host': 'api.bilibili.com',
    'APP-KEY': 'android',
    'User-Agent': 'Bilibili Freedoooooom/MarkII',
}

let params = {
    'access_key': '',
    'actionKey': 'appkey',
    'appkey': appkey,
    'build': '5540500',
    'cid': '',
    'device': 'android',
    'ep_id': '',
    'fnval': '',
    'fnver': '0',
    'fourk': '',
    'mobi_app': 'android',
    'platform': 'android',
    'qn': '',
    'ts': ''
}

let options = {
    url: '',
    method: 'GET',
    headers,
    timeout:5000

}

module.exports = { params, options }
