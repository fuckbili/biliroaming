const config = require('../config.js')
const crypto = require('crypto')
const qs = require('qs')

function app_Sign(params) {
    return crypto.createHash('md5').update(`${params}${config.android_sk}`).digest("hex")
}
function web_Sign(params) {
    return crypto.createHash('md5').update(`${params}${config.Web_Sk}`).digest("hex")
}
function bstar_Sign(params){
    return crypto.createHash('md5').update(`${params}${config.bstar_a_sk}`).digest("hex")
}
function sign_Params(params, sign) {
    return `${qs.stringify(params)}&sign=${sign(qs.stringify(params))}`
}
module.exports = { app_Sign,web_Sign,bstar_Sign, sign_Params }