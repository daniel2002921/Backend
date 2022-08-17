/* config.js */
// require and configure dotenv, will load vars in .env in PROCESS.ENV
//require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config()


const config = {
  "user": "admin",
  "password": "girlnice12",
  "server": "localhost",
  "database": "TESTDB",
  "options": {"trustServerCertificate": true}   
};

export default config;