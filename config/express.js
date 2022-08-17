      /* express.js */
      import express from 'express';
      import config from './config.js';
      import api from '../server/routes/api.route.js';
      import web from '../server/routes/web.route.js';

      const app = express();

      /* GET home page. */
      app.get('/', (req, res) => {
        res.send(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
      });

      app.use('/api', api);
      app.use('/', web);

      app.set('view engine', 'ejs');


      export default app;