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

            //
            let sqlquery = "select case when sign = 1 then '已簽收' else '未簽收' end as title, count(*) as sum\
             from package group by sign"
            let recordset = await request.query(sqlquery)
            result.summarySignStatusData = {}
            if(recordset.rowsAffected[0]!=0){
              // console.log(recordset.recordset)
              result.summarySignStatusData.status = "success"
              result.summarySignStatusData.data = recordset.recordset

            }else{
                result.summarySignStatusData.status = "error"
                result.summarySignStatusData.message = "no summarySignStatusData"
            }

            //getTableData
            sqlquery = 'select top(20) package_no,reciver_name,sign_name ,cate.name as cate,cate.id as cate_id,delivery_time,\
            sign,householder from package left join bagcategory as cate on cate.id = package.cate where package.sign = 0 order by package_no desc'
            recordset = await request.query(sqlquery)
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
          let sqlquery = "insert package  (reciver_name, cate, delivery_time,householder,sign)\
          VALUES ("+"'"+reqData.reciever + "', " + reqData.cate + ", '" + reqData.deliverytime + "', " + reqData.neighbor + " , 0);"
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

      


    },
    acceptPackage:(req,res)=>{
      let reqData = req.body.data
      console.log(reqData)
      res.setHeader('Content-Type', 'application/json');
      
      (async () => {
        let result = {}

        try{
          
          const pool = await sql.connect(Sql_config)
          const request = pool.request();
          let sqlquery = "update package set sign = 1, accept_time = '"+ reqData.accept_time +"' \
          where package_no = '" + reqData.package_no + "'"
          await request.query(sqlquery)

          result.status = "success"
          result = JSON.stringify(result)
          res.send(result)

        }catch(err){
          result.status = "error"
          result.message = err
          console.log(err)
          result = JSON.stringify(result)
          res.send(result)
        }
      })()
    },

    deletePackage:(req,res)=>{
      let reqData = req.body.data
      console.log(reqData)
      res.setHeader('Content-Type', 'application/json');
      
      (async () => {
        let result = {}

        try{
          
          const pool = await sql.connect(Sql_config)
          const request = pool.request();
          let sqlquery = "delete package where package_no = '" + reqData + "'"
          await request.query(sqlquery)

          result.status = "success"
          result = JSON.stringify(result)
          res.send(result)

        }catch(err){
          result.status = "error"
          result.message = err
          console.log(err)
          result = JSON.stringify(result)
          res.send(result)
        }
      })()
    },
    editPackage:(req,res)=>{
      let reqData = req.body.data
      console.log(reqData)
      res.setHeader('Content-Type', 'application/json');
      
      (async () => {
        let result = {}

        try{
          
          const pool = await sql.connect(Sql_config)
          const request = pool.request();
          let sqlquery = "update package set reciver_name = '"+ reqData.reciever +"', householder = '"+ reqData.neighbor +"', \
          cate = '"+ reqData.cate +"', delivery_time = '"+ reqData.deliverytime +"' \
          where package_no = '" + reqData.package_no + "'"
          await request.query(sqlquery)

          result.status = "success"
          result = JSON.stringify(result)
          res.send(result)

        }catch(err){
          result.status = "error"
          result.message = err
          console.log(err)
          result = JSON.stringify(result)
          res.send(result)
        }
      })()
    },



  }



   export default PackageController