import todoModel from "../Models/data.js"
import Sql_config from '../../config/Sql_config.js'; 
import sql from 'mssql'
const LoginController = {
    // 傳入參數 req, res

    index: (req, res) => {
      let result = {}
      // res.send("dsfds")
      // console.log(req.body)
      // res.send(req.body.username)
      res.setHeader('Content-Type', 'application/json');

      try{

        sql.connect(Sql_config,function (err) {
            if(err) console.log(err);
              //create Request object
              
              var request=new sql.Request();
              let sqlquery = 'select top(20) * from package'
              request.query(sqlquery,function(err,recordset){
              if(err) console.log(err);

            //   console.log(recordset);


              
              
              if(recordset.rowsAffected[0]!=0){
                console.log(recordset.recordset)
                // let sqlUsername = recordset.recordset[0].account
                // let sqlPassword = recordset.recordset[0].password

                // if (keyInPassword!=sqlPassword){
                //   result.status = "error"
                //   result.message = "密碼輸入錯誤"
                // }
                // if(keyInPassword == sqlPassword){
                //   result.status = "success"
                //   result.message = "登入成功"
                // }


              }else{
                  console.log("8888")
                  result.status = "error"
                  result.message = "no data"
              }

              result = JSON.stringify(result)
              res.send(result)
              // if(recordset.recordset.length!=0){
                
              // }
              //send records as a response
              // console.log(recordset.recordset)
              // res.send(recordset.recordset);
              });
          });

      }catch(err){
        result.status = "error"
        console.log("32444444")
        result = JSON.stringify(result)
        res.send(result)
      }
      


        // const todo = todoModel.getAll()

        // // res.send(todo)
        // res.render('hello', {
        //     todos:todo
        //   })
      
    }
  }



   export default LoginController