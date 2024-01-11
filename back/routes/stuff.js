const express = require("express");

const router = express.Router();
const stuffCtrl = require('../controllers/stuff');

router.get('/hello',stuffCtrl.hello);
router.post('/isuservalid',stuffCtrl.isUserValid);
router.post('/isjwtvalid',stuffCtrl.isJwtValid);
router.get('/getalltags',stuffCtrl.GetAllTags);
router.post('/createticket',stuffCtrl.CreateTicket);
router.post('/getoneticket',stuffCtrl.GetOneTicketById);
router.put('/updateTicketStatus',stuffCtrl.UpdateStatus);
router.put ('/updateTicketTag');

module.exports = router;