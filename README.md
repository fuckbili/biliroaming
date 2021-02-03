# Super Bili

哔哩漫游解析，支持黑名单，视频地址缓存,使用mysql+redis+nodejs

## 使用教程

+ 克隆项目代码
+ 服务器安装宝塔面板
  + [面板安装教程](https://www.bt.cn/bbs/thread-19376-1-1.html)
+ 宝塔面板安装运行环境：
  + Nginx(必须)
  + Mysql(必须)
  + Redis(必须)
  + PM2管理器(必须)
  + php(可选)
  + phpMyAdmin(可选)
+ 宝塔面板添加站点:
  + ![Screenshot 2021-01-23 100719.png](https://i.loli.net/2021/01/23/LhSn5mtX1WdcuP2.png)
+ 打开站点所在目录:
  + ![1.png](https://i.loli.net/2021/01/23/hwqGMxk7X23ayLE.png)
  + 上传代码到此目录
+ 修改配置文件:
  + Super Bili/Config/config.js
  + 填入mysql数据库配置
  + 填入解析端口配置
  + 填入 socks5代理ip(必填,否则后面无法测试)
+ 导入数据库文件:
  + 选择你创建的数据库
  + 点击导入
  + 选择本地上传,找到bili_uid.sql,然后上传
  + 上传完毕点击导入
    + ![2.png](https://i.loli.net/2021/01/23/OlrBVEykDCubxjL.png)
+ 启动服务:
  + 点开pm2管理器
  + ![4.png](https://i.loli.net/2021/01/23/rbcjl54UhA2WHFe.png)
    + 项目所在目录找到你上传源码的目录
    + 启动文件名称填写:app.js
    + 项目名称随便填,然后点添加
    + 完毕刷新后端口显示你填写的端口就是正常的
+ Nginx反向代理:
  + 点击网站,再点你的域名,然后找到反向代理
  + 点击添加反向代理
    + ![5.png](https://i.loli.net/2021/01/23/Ht9TXSKrPLfp5ao.png)
  + 开启https服务:
    + 点击ssl,找到Let's Encrypt
    + 然后点击申请就行
+ 注意事项：
  + 如果测试提示未登录，请加上参数access_key=你的access_key,或者去设置关闭登录验证
  + access_key可以通过抓包app客户端获取
+ 如需控制黑名单,请使用此tg机器人
  + [biliroaming-bot](https://github.com/fuckbili/biliroaming-bot)