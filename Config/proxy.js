const Proxy = require('socks-proxy-agent')
const config=require('./config')
function HttpsAgent(area) {
    switch (area){
        case 'tw':
            return new Proxy(`socks://${config.tw_proxy}`)
            case 'cn':
                return new Proxy(`socks://${config.cn_proxy}`)
                case 'th':
                    return new Proxy(`socks://${config.th_proxy}`)
                    case 'hk':
                        return new Proxy(`socks://${config.hk_proxy}`)
                        default:
                            return new Proxy(`socks://${config.cn_proxy}`)
    }  
}
module.exports = { HttpsAgent }