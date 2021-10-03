const appkey = require('../config.js').Web_Ak

let headers = {
    'Host': 'api.bilibili.com',
    'User-Agent': 'Bilibili Freedoooooom/MarkII',
}

let params = {
    'access_key': '',
    'appkey': appkey,
    'avid': '',
    'bvid': '',
    'cid': '',
    'ep_id': '',
    'fnval': '',
    'fnver': '0',
    'fourk': '',
    'otype': 'json',
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
