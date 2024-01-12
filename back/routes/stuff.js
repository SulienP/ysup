const express = require("express");

const router = express.Router();
const stuffCtrl = require('../controllers/stuff');

/*---------------------- GET METHODS ----------------------*/
router.get('/hello', stuffCtrl.hello);
router.get('/getalltags', stuffCtrl.GetAllTags);
/*---------------------- POST METHODS ----------------------*/
router.post('/isuservalid', stuffCtrl.isUserValid);
router.post('/isjwtvalid', stuffCtrl.isJwtValid);
router.post('/createticket', stuffCtrl.CreateTicket);
router.post('/getoneticket', stuffCtrl.GetOneTicketById);
router.post('/getAllTicketsByGroup', stuffCtrl.GetAllTicketWithTag);
router.post('/getAllTicketsByUser', stuffCtrl.GetAllTicketFromUser);
router.post('/getAllTicketsByUserAndTag', stuffCtrl.GetTicketByTagAndUser);
router.post('/postResponse', stuffCtrl.InsertMail);
router.post('/getUserGroups', stuffCtrl.GetGroupsFromUser);
/*---------------------- PUT METHODS ----------------------*/
router.put('/updateTicketStatus', stuffCtrl.UpdateStatus);
router.put('/updateTicketTag', stuffCtrl.UpdateTag);

module.exports = router;