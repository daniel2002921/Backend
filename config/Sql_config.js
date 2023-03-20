/* config.js */
// require and configure dotenv, will load vars in .env in PROCESS.ENV
//require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config()


const config = {
  "user": "user1",
  "password": "123",
  "server": "localhost",
  "database": "BagTrack",
  "options": {"trustServerCertificate": true}   
};

export default config;