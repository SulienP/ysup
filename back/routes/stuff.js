const express = require("express");

const router = express.Router();
const stuffCtrl = require('../controllers/stuff');

router.get('/hello',stuffCtrl.hello);
router.post('/isuservalid',stuffCtrl.isUserValid);
router.post('/isjwtvalid',stuffCtrl.isJwtValid);

module.exports = router;