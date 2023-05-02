import express from 'express';
import config from '../../config/config.js';
import LoginController from '../Controllers/LoginController.js'
import PackageController from '../Controllers/PackageController.js'

const router = express.Router();

/* GET localhost:[port]/api page. */
router.get('/1', (req, res) => {
  res.send(`路徑是: localhost:${config.port}/`);
});

router.post('/Login', LoginController.index);

router.get('/package/index', PackageController.index);
router.post('/package/create', PackageController.create);
router.post('/package/accept', PackageController.acceptPackage);
router.post('/package/delete', PackageController.deletePackage);

export default router;