const appkey = require('../config.js').bstar_a_sk

const headers = {
    'Host': 'api.global.bilibili.com',
    'APP-KEY': 'android',
    'User-Agent': 'Bilibili Freedoooooom/MarkII',
}

let params = {
    'access_key':'',
    'appkey': appkey,
    'build': '1001310',
    'cid': '',
    'device': 'android',
    'ep_id': '',
    'fnval': '',
    'fnver': '0',
    'fourk': '',
    'mobi_app': 'bstar_a',
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