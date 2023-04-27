import todoModel from "../Models/data.js"
import Sql_config from '../../config/Sql_config.js'; 
import sql from 'mssql'
const LoginController = {
    // 傳入參數 req, res

    index: (req, res) => {
      
      // res.send("dsfds")
      // console.log(req.body)
      // res.send(req.body.username)
      
      res.setHeader('Content-Type', 'application/json');
      (async () => {
        let result = {}
        try{
            
            const pool = await sql.connect(Sql_config)
            const request = pool.request();

            //getTableData
            let sqlquery = 'select top(20) * from package'
            let recordset = await request.query(sqlquery)
            result.tableData = {}
            if(recordset.rowsAffected[0]!=0){
              // console.log(recordset.recordset)
              result.tableData.status = "success"
              result.tableData.data = recordset.recordset

            }else{
                result.tableData.status = "error"
                result.tableData.message = "no Tabledata"
            }

            //getNeighborData
            sqlquery = 'select * from neighbor'
            recordset = await request.query(sqlquery)
            result.neighborData = {}
            if(recordset.rowsAffected[0]!=0){
              // console.log(recordset.recordset)
              result.neighborData.status = "success"
              result.neighborData.data = recordset.recordset

            }else{
                result.neighborData.status = "error"
                result.neighborData.message = "no NeighborData"
            }

      
  
            result.status = "success"
            console.log(result)
            result = JSON.stringify(result)
            res.send(result)
  
        }catch(err){
          result.status = "error"
          result.message = err
          result = JSON.stringify(result)
          res.send(result)
        }
      })()
      
      


        // const todo = todoModel.getAll()

        // // res.send(todo)
        // res.render('hello', {
        //     todos:todo
        //   })
      
    }
  }



   export default LoginController