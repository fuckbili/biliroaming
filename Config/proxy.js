const Proxy = require('socks-proxy-agent')
function HttpsAgent(area) {
    switch (area){
        case 'tw':
            return new Proxy(`socks://127.0.0.1:41000`)
            case 'cn':
                return new Proxy(`socks://127.0.0.1:41001`)
                case 'th':
                    return new Proxy(`socks://127.0.0.1:41002`)
                    default:
                        return new Proxy(`socks://127.0.0.1:41000`)
    }  
}
module.exports = { HttpsAgent }