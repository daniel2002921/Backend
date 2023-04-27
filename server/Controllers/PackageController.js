import todoModel from "../Models/data.js"
import Sql_config from '../../config/Sql_config.js'; 
import sql from 'mssql'
const PackageController = {
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
            let sqlquery = 'select top(20) package_no,reciver_name,sign_name ,cate.name as cate,delivery_time,\
            sign,householder from package left join bagcategory as cate on cate.id = package.cate'
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

            //getCategoryData
            sqlquery = 'select * from bagcategory'
            recordset = await request.query(sqlquery)
            result.categoryData = {}
            if(recordset.rowsAffected[0]!=0){
              // console.log(recordset.recordset)
              result.categoryData.status = "success"
              result.categoryData.data = recordset.recordset

            }else{
                result.categoryData.status = "error"
                result.cc.message = "no CategoryData"
            }

            result.status = "success"
            // console.log(result)
            result = JSON.stringify(result)
            res.send(result)
  
        }catch(err){
          result.status = "error"
          result.message = err
          result = JSON.stringify(result)
          res.send(result)
        }
      })()
    },
    
    create:(req,res)=>{
      let reqData = req.body.data
      console.log(reqData)
      res.setHeader('Content-Type', 'application/json');
      
      (async () => {
        let result = {}

        try{
          
          const pool = await sql.connect(Sql_config)
          const request = pool.request();
          let sqlquery = "insert package  (reciver_name, cate, delivery_time,householder)\
          VALUES ("+"'"+reqData.reciever + "', " + reqData.cate + ", '" + reqData.deliverytime + "', " + reqData.neighbor + ");"
          await request.query(sqlquery)

          result.status = "success"
          result = JSON.stringify(result)
          res.send(result)

        }catch(err){
          result.status = "error"
          result.message = err
          result = JSON.stringify(result)
          res.send(result)
        }

      })()

      


    }


  }



   export default PackageController