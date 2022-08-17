      /* express.js */
      import express from 'express';
      import config from './config.js';
      import api from '../server/routes/api.route.js';
      import web from '../server/routes/web.route.js';
      import cors from 'cors'
      import bodyParser from 'body-parser'

      const app = express();
      // const corsOptions = {
      //   // origin: [
      //   //   // 'http://www.example.com',
      //   //   // 'http://localhost:8080',
      //   // ],
      //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      //   allowedHeaders: ['Content-Type', 'Authorization'],
      // };
      // app.all('*', function(req, res, next) {
      //   res.header('Access-Control-Allow-Origin', '*');
      //   res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,X-Custom-Header');
      //   res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
      //   res.header('Access-Control-Max-Age','86400');
        
      //   next();
          

      //   });

      /* GET home page. */
      app.get('/', (req, res) => {
        res.send(`server started on  port http://127.0.0.1:(${config.env}) (${config.env})`);
      });


      app.use(cors());
      app.use(bodyParser.json());
      app.use('/api', api);
      app.use('/', web);

      


      app.set('view engine', 'ejs');


      export default app;