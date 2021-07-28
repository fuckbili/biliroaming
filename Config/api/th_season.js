const appkey = require('../config.js').bstar_a_ak

const headers = {
    'Host': 'app.biliintl.com',
    'APP-KEY': 'android',
    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 11; IN2020 Build/RP1A.201005.001)',
}

let params = {
    'access_key': '',
    'appkey': appkey,
    'build': '1001310',
    'mobi_app': 'bstar_a',
    'season_id': '',
    's_locale': 'zh_SG'

}

let options = {
    url: '',
    method: 'GET',
    headers,
    timeout: 5000

}

module.exports = { params, options }