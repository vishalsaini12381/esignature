var express = require('express');
var router = express.Router();
var Branch = require('../api/addBranch');
var Staff = require('../api/addStaff');

var Sign = require('../api/adminLogin');

var staffApiData = require('../api/staffApi');


/* GET home page. */
router.post('/AdminLogin',Sign.registerAdmin);
// console.log('qqqqqqqqqqqqqqqqqqqqqq',Sign.registerAdmin);
router.post('/Login',Sign.login);

router.post('/addBranch',Branch.addBranch);
router.post('/branchList',Branch.branchList);
router.post('/branchDetail',Branch.branchDetail);
router.post('/branchStatusChange',Branch.branchStatusChange);
router.post('/editBranch',Branch.editBranch);


router.post('/addStaff',Staff.addStaff);
router.post('/staffList',Staff.staffList);
router.post('/staffDetail',Staff.staffDetail);
router.post('/staffStatusChange',Staff.staffStatusChange);
router.post('/staffChangePassword',Staff.staffChangePassword);
router.post('/staffChangeBranch',Staff.staffChangeBranch);
router.post('/editStaff',Staff.editStaff);



/////////////////////////STAFF/////////////////////
router.post('/staffLogin',staffApiData.staffLogin);
router.post('/staffPasswordChange',staffApiData.staffPasswordChange);
router.post('/staffForgotPassword',staffApiData.staffForgotPassword);
router.post('/staffVerifyOtp',staffApiData.staffVerifyOtp);
router.post('/staffResetPassword',staffApiData.staffResetPassword);
router.post('/staffMyProfile',staffApiData.staffMyProfile);


/////////////////////////STAFF/////////////////////

module.exports = router;
