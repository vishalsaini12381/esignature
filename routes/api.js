var express = require('express');
var router = express.Router();

///////////////////////////////////
const multer = require('multer');
var path = require("path");
// const upload = multer({
//     dest: 'uploads/' // this saves your file into a directory called "uploads"
//   }); 

//////////////////////////////////


var Branch = require('../api/addBranch');
var Staff = require('../api/addStaff');
var Sign = require('../api/adminLogin');
var staffApiData = require('../api/staffApi');
var documentApiData = require('../api/documentApi');


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

router.post('/uploadDocument',documentApiData.uploadDocument);
router.post('/documentList',documentApiData.documentList);
router.post('/documentDetail',documentApiData.documentDetail);


/////////////////////////STAFF/////////////////////

////////////////////////UPLOAD IMAGE//////////////////
var storage=multer.diskStorage({
  destination: './uploads',
  filename:function(req,file,cb){
    // console.log("user name mobile ==== ",req.body)
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`);
  }
});

const fileFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
   cb(null,true)
  }else{
   cb(new Error('Not support file format'),false)
  // cb(null,"1452")
  }
}

var upload=multer({
  storage:storage,
  limits:{
    fileSize:1024*1024*5
  },
  fileFilter:fileFilter
});

router.post('/uploadDocumentImage', upload.single('image'), (req, res,next) => {
  console.log('req.file',req.file)
    if(req.file==undefined){
        res.json({
          "code":101,
          "image":""
      })
    }else{
      var filePath =req.file.path
      console.log('req.file',req.file)
      if(filePath==undefined || filePath=='undefined' || filePath==''){
        res.json({
            "code":101,
            "image":""
        })
      }else{
        res.json({
          "code":100,
          "image":req.file.path
        })
      }
    }
   
});

////////////////////////UPLOAD IMAGE//////////////////





module.exports = router;
