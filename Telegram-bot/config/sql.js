const mysql = require('mysql')
const config=require('./config')
const pool = mysql.createPool({
  host     :  config.host,
  user     :  config.user,
  password :  config.password,
  database :  config.database
})


let query = function( sql, values ) {
  // 返回一个 Promise
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            rows_data= JSON.stringify(rows)  //格式化查询数据          
            resolve( JSON.parse(rows_data) )
          }
          // 结束会话
          connection.release()
        })
      }
    })
  })
}

module.exports =  {query}