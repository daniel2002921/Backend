import todoModel from "../Models/data.js"
import Sql_config from '../../config/Sql_config.js'; 
import sql from 'mssql'
const LoginController = {
    // 傳入參數 req, res
    index: (req, res) => {
      // console.log(req.body)
      // res.send(req.body.username)
      let keyInUsername = req.body.username
      let keyInPassword = req.body.password


      sql.connect(Sql_config,function (err) {
          if(err) console.log(err);
            //create Request object
            let result = {}
            var request=new sql.Request();
            let sqlquery = 'select * from testTable where account =' + "'"+keyInUsername + "'"
            request.query(sqlquery,function(err,recordset){
            if(err) console.log(err);
            
            if(recordset.rowsAffected[0]!=0){
              let sqlUsername = recordset.recordset[0].account
              let sqlPassword = recordset.recordset[0].password

              if (keyInPassword!=sqlPassword){
                result.status = "error"
                result.message = "密碼輸入錯誤"
                res.send(result)
              }
              if(keyInPassword == sqlPassword){
                result.status = "success"
                result.message = "登入成功"
                res.send(result)
              }
            }else{
                result.status = "error"
                result.message = "查無此帳號資料，請註冊"
                res.send(result)
            }
            // if(recordset.recordset.length!=0){
              
            // }
            //send records as a response
            // console.log(recordset.recordset)
            // res.send(recordset.recordset);
            });
        });


        // const todo = todoModel.getAll()

        // // res.send(todo)
        // res.render('hello', {
        //     todos:todo
        //   })
      
    }
  }



   export default LoginController