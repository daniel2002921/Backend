      /* express.js */
      import express from 'express';
      import config from './config.js';
      import index from '../server/routes/index.route.js';

      const app = express();

      /* GET home page. */
      app.get('/', (req, res) => {
        res.send(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
      });

      app.use('/api', index);

      export default app;