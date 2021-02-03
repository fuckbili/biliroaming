//mysql数据库配置
const user = '' //数据库用户名
const password = '' //数据库密码
const database = '' //数据库名
const host = '' //数据库地址

//redis配置
const redis_host = '' //redis host
const redis_port = '' //redis port
const redis_password = '' //redis auth

//服务器启动设置
const port = 39831 //服务器启动端口

//socks5代理
const tw_proxy = '127.0.0.1:41000' //tw
const cn_proxy = '127.0.0.1:41001' //cn
const th_proxy = '127.0.0.1:41002' //th
const hk_proxy = '127.0.0.1:41003' //hk
const all_proxy = '127.0.0.1:41004' //全部ip


//中间件
const ip_num = 10 //限制ip一分钟请求多少次
const check_ip = false //是否开启ip请求限制
const check_auth = true //是否开启登录检验,如果关闭,服务器模式变成任何人可使用,下面设置将无效
const check_mode = 2 //服务器模式,1为白名单模式,2为黑名单模式



//没必要填
const access_key = ''

//以下勿动
const Web_Ak = '84956560bc028eb7'
const Web_Sk = '94aba54af9065f71de72f5508f1cd42e'

const android_App_Video_Ak = 'iVGUTjsxvpLeuDCf'
const android_App_Video_Sk = 'aHRmhWMLkdeMuILqORnYZocwMBpMEOdt'

const ios_Video_Ak = 'YvirImLGlLANCLvM'
const ios_Video_SK = 'JNlZNgfNGKZEpaDTkCdPQVXntXhuiJEM'

const android_ak = '1d8b6e7d45233436'
const android_sk = '560c52ccd288fed045859ed18bffd973'

const android_i_ak = 'bb3101000e232e27'
const android_i_sk = '36efcfed79309338ced0380abd824ac1'

const android_b_ak = '07da50c9a0bf829f'
const android_b_sk = '25bdede4e1581c836cab73a48790ca6e'

const android_tv_ak = '4409e2ce8ffd12b8'
const android_tv_sk = '59b43e04ad6965f34319062b478f83dd'

const biliLink_ak = '37207f2beaebf8d7'
const biliLink_sk = 'e988e794d4d4b6dd43bc0e89d6e90c43'

const bstar_a_ak = '7d089525d3611b1c'
const bstar_a_sk = 'acd495b248ec528c2eed1e862d393126'
module.exports = {
     user,
     password,
     database,
     host,
     port,
     redis_host,
     redis_port,
     redis_password,
     tw_proxy,
     cn_proxy,
     th_proxy,
     hk_proxy,
     all_proxy,
     ip_num,
     check_ip,
     check_auth,
     check_mode,
     access_key,
     android_ak,
     android_sk,
     Web_Ak,
     Web_Sk,
     bstar_a_ak,
     bstar_a_sk
}