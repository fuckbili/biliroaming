const appkey = require('../config.js').Web_Ak

let headers = {
    'Host': 'api.bilibili.com',
    'User-Agent': 'Bilibili Freedoooooom/MarkII',
}

let params = {
    'access_key':'',
    'appkey': appkey,
    'build': '12450',
    'cid': '',
    'fnval': '',
    'fnver': '0',
    'fourk': '',
    'otype': 'json',
    'platform': 'pc',
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