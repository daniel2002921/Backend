import todoModel from "../Models/data.js"
import Sql_config from '../../config/Sql_config.js'; 
import sql from 'mssql'


import jwt from 'jsonwebtoken';


const SettingController = {

    //驗證住戶名稱是否重複  True:有重複  False:無重複
    checkNeighborExist:async  (name)=>{

        try{
            const pool = await sql.connect(Sql_config)
            const request = pool.request();
            let sqlquery = "select * from neighbor where name = '"+ name +"' "
            let recordset = await request.query(sqlquery)
            if(recordset.rowsAffected[0]!=0){
              return true
            }else{
              return false
            }
        }catch(err){

        }
    },


    // 傳入參數 req, res

    getneighbordata: (req, res) => { 
      res.setHeader('Content-Type', 'application/json');
      (async () => {
        let result = {}
        try{
            
            const pool = await sql.connect(Sql_config)
            const request = pool.request();

            //
            let sqlquery = "select * from neighbor ORDER BY SUBSTRING(name, 1, 1), CAST(SUBSTRING(name, PATINDEX('%[0-9]%', name), LEN(name)) AS INT);"
            let recordset = await request.query(sqlquery)
            if(recordset.rowsAffected[0]!=0){
              // console.log(recordset.recordset)
              result.status = "success"
              result.data = recordset.recordset

            }else{
                result.status = "error"
                result.message = "no Data"
            }

           
  
        }catch(err){
          result.status = "error"
          result.message = err
        }
        result = JSON.stringify(result)
        res.send(result)
      })()
    },

    neighborCreate:(req,res)=>{
      let reqData = req.body.data
      console.log(reqData)
      res.setHeader('Content-Type', 'application/json');
      
      (async () => {
        let result = {}
        
        try{

          //驗證住戶名稱是否重複，若重複則return error
          let check =  await SettingController.checkNeighborExist(reqData.name);
          if(check == true){

            result.status = 'error'
            result.message = '住戶名稱重複，請重新輸入'

          }else{

            const pool = await sql.connect(Sql_config)
            const request = pool.request();
            let sqlquery = "insert neighbor  (name)\
            VALUES ("+"'"+reqData.name + "');"
            await request.query(sqlquery)
            result.status = "success"

          }
         
          


        }catch(err){
          result.status = "error"
          result.message = err

        }
        result = JSON.stringify(result)
        res.send(result)

      })()

      


    },


    neighborEdit:(req,res)=>{
      let reqData = req.body.data
      console.log(reqData)
     
      res.setHeader('Content-Type', 'application/json');
      (async () => {
        let result = {}

        try{

          //驗證住戶名稱是否重複，若重複則return error
          let check =  await SettingController.checkNeighborExist(reqData.name);
          if(check == true){

            result.status = 'error'
            result.message = '住戶名稱重複，請重新輸入'

          }else{

            const pool = await sql.connect(Sql_config)
            const request = pool.request();
            console.log("2321321321")
            let sqlquery = "update neighbor set name = '"+ reqData.name +"'\
            where id = '" + reqData.id + "'"
            console.log(sqlquery)
            await request.query(sqlquery)
            result.status = "success"

          }
          
          

        }catch(err){
          result.status = "error"
          result.message = err
          console.log(err)
          
        }
        result = JSON.stringify(result)
        res.send(result)
      })()
    },
    neighborDelete:(req,res)=>{
      let reqData = req.body.data
      console.log(reqData)
      res.setHeader('Content-Type', 'application/json');
      
      (async () => {
        let result = {}

        try{
          
          const pool = await sql.connect(Sql_config)
          const request = pool.request();
          let sqlquery = "delete neighbor where id = '" + reqData + "'"
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
    }
  }



   export default SettingController