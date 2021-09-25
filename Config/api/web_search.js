const appkey = require('../config.js').Web_Ak

const headers = {
    'Host': 'api.bilibili.com',
    'Referer': 'https://search.bilibili.com/bangumi',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
}

let params = {
    'search_type': '',
    'appkey': appkey,
    'keyword': '',
    'highlight': '1',
    'single_column': '0'
}
let options = {
    url: '',
    method: 'GET',
    headers,
    timeout: 5000

}

module.exports = { params, options }
