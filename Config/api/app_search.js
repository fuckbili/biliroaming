const access_key=require('../config.js').access_key
const appkey = require('../config.js').android_ak

const headers = {
    'Host': 'app.bilibili.com',
    'APP-KEY': 'android',
    'User-Agent': 'Mozilla/5.0 BiliDroid/6.8.0 (bbcallen@gmail.com) os/android model/IN2020 mobi_app/android build/6080500 channel/master innerVer/6080500 osVer/10 network/2',
}

let params = {
    'access_key': '',
    'appkey': appkey,
    'build': '6080500',
    'c_locale': 'zh_CN',
    'channel': 'master',
    'fnval': '',
    'fnver': '0',
    'fourk': '',
    'highlight': '1',
    'keyword': '',
    'mobi_app': 'android',
    'platform': 'android',
    'pn': '',
    'ps': '',
    'qn': '',
    's_locale': 'zh_CN',
    'statistics': '',
    'ts': '',
    'type': ''
}

let options = {
    url: '',
    method: 'GET',
    headers,
    timeout:5000

}

module.exports = { params, options }
