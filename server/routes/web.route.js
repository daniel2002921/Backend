import express from 'express';
import config from '../../config/config.js';
import LoginController from '../Controllers/LoginController.js'
import PackageController from '../Controllers/PackageController.js'
import SettingController from '../Controllers/SettingController.js'
import BillboardController from '../Controllers/BillboardController.js'

const router = express.Router();

/* GET localhost:[port]/api page. */
router.get('/1', (req, res) => {
  res.send(`路徑是: localhost:${config.port}/`);
});

router.post('/Login', LoginController.index);

router.get('/package/index', PackageController.index);
router.get('/package/indexDoughnut', PackageController.indexDoughnut);
router.get('/package/indexBarChart', PackageController.indexBarChart);
router.post('/package/create', PackageController.create);
router.post('/package/accept', PackageController.acceptPackage);
router.post('/package/delete', PackageController.deletePackage);
router.post('/package/edit', PackageController.editPackage);


router.get('/setting/getneighbordata', SettingController.getneighbordata);
router.post('/setting/neighbor_create', SettingController.neighborCreate);
router.post('/setting/neighbor_edit', SettingController.neighborEdit);
router.post('/setting/neighbor_delete', SettingController.neighborDelete);


router.post('/billboard/createPost', BillboardController.createPost);

export default router;