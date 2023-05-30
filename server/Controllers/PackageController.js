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

            //gettodayArriveBag
            sqlquery = 'select count(*) as count from package where YEAR(delivery_time) = YEAR(SYSDATETIME()) \
            and MONTH(delivery_time) = MONTH(SYSDATETIME()) and DAY(delivery_time) = DAY(SYSDATETIME()) '
            recordset = await request.query(sqlquery)
            result.todayArriveBag = {}
            if(recordset.rowsAffected[0]!=0){
              // console.log(recordset.recordset)
              result.todayArriveBag.status = "success"
              result.todayArriveBag.data = recordset.recordset[0].count

            }else{
                result.todayArriveBag.status = "success"
                result.todayArriveBag.message = "no todayArriveBag"
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
    indexDoughnut:(req,res)=>{
      let reqData = req.body.data
      console.log(reqData)
      res.setHeader('Content-Type', 'application/json');
      
      (async () => {
        let result = {}

        try{
          
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
              result.summarySignStatusData.message = "no indexDoughnutData"
          }

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

    indexBarChart:(req,res)=>{
      res.setHeader('Content-Type', 'application/json');
      
      (async () => {
        let result = {}

        try{
          const pool = await sql.connect(Sql_config)
          const request = pool.request();
          
          let sqlquery = "WITH month_list AS (\
            SELECT 1 AS month_num, '1月' AS month\
            UNION ALL SELECT 2, '2月'\
            UNION ALL SELECT 3, '3月'\
            UNION ALL SELECT 4, '4月'\
            UNION ALL SELECT 5, '5月'\
            UNION ALL SELECT 6, '6月'\
            UNION ALL SELECT 7, '7月'\
            UNION ALL SELECT 8, '8月'\
            UNION ALL SELECT 9, '9月'\
            UNION ALL SELECT 10, '10月'\
            UNION ALL SELECT 11, '11月'\
            UNION ALL SELECT 12, '12月'\
            ),\
            year_table AS (\
                SELECT DISTINCT YEAR(delivery_time) AS year\
                FROM package\
            )\
            SELECT year_table.year, month_list.month, COALESCE(month_counts.total_count, 0) AS total_count\
            FROM year_table\
            CROSS JOIN month_list\
            LEFT JOIN (\
                SELECT YEAR(delivery_time) AS year, MONTH(delivery_time) AS month_num, COUNT(*) AS total_count\
                FROM package\
                GROUP BY YEAR(delivery_time), MONTH(delivery_time)\
            ) AS month_counts\
            ON year_table.year = month_counts.year AND month_list.month_num = month_counts.month_num\
            ORDER BY year_table.year, month_list.month_num;"
          let recordset = await request.query(sqlquery)
          result.indexBarChartData = {}
          if(recordset.rowsAffected[0]!=0){
            // console.log(recordset.recordset)
            result.indexBarChartData.status = "success"
            result.indexBarChartData.data = recordset.recordset

          }else{
              result.indexBarChartData.status = "error"
              result.indexBarChartData.message = "no indexBarChartData"
          }

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