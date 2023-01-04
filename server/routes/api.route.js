import express from 'express';
import config from '../../config/config.js';
import LoginController from '../Controllers/LoginController.js'

const router = express.Router();

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});

router.post('/Login', LoginController.index);


export default router;