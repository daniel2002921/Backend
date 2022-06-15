/*// 引入 library
//const express = require('express');
import express from 'express'
// express 引入的是一個 function
const app = express();
// 建立一個不易產生衝突的 port 用來測試
const port = 3000;

// 如何處理不同的 request，參數分別為 url 和要執行的 function
app.get('/', (req, res) => {
  res.send('hello world!')
})

app.get('/bye', (req, res) => {
  res.send('bye!')
})

// 運行這個 port，參數分別為 port 和要執行的 function
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})*/

import config from './config/config.js';
import app from './config/express.js';
import 'dotenv/config'

  // listen on port config.port
  app.listen(config.port, () => {
    //console.log(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
    console.log(`server started on  port http://127.0.0.1:${process.env.PORT} (${config.env})`);
  });
