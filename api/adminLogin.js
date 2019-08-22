var admin = require('../model/adminSchema');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var JWTSECRET = 'shivendra123';
// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//    service : 'Gmail',
//    auth : {
//        user:  'shivendra.techgropse@gmail.com',
//        pass: 'gropse@7117'
//    }
// });

// var registerUser = ((req, res)=>{
//    try {

//    user.findOne({email : req.body.email}).then((response)=>{
//        if (response){
//            return res.json({status : false, message : 'The E-mail You Entered is Alredy Registered Plz Try Different'})
//        }

//        const otp = Math.floor(1000 + Math.random() * 9000);
//        const pass = bcrypt.hashSync(req.body.password);
//        var User = new user ({
//            firstName :  req.body.firstName,
//            lastName :  req.body.lastName,
//            email :  req.body.email,
//            password : pass,
//            'status.activeEmailToken' : otp,
//        });

//     //    const mailOptions = {
//     //        from : 'shivendra.techgropse@gmail.com',
//     //        to : req.body.email,
//     //        subject : 'Account Activation | SalamTrade',
//     //        html :   `<body>
//     //                  <h1>Hello ${req.body.email}</h1>
//     //                  <h2><a title = "Reset" href = "http://localhost:3100/api/activate/${otp}"> Click Here to Verify Your Account</a></h2>
//     //                   `
//     //    };
//     //    transporter.sendMail(mailOptions, function(err,info){
//         //    if(err){
//         //        return res.json({status: false, message: 'Network Error. Unable to send email currently'})
//         //    }else{
//            User.save((err,user)=>{
//                if (err){
//                    return res.json({status: false, message: 'Error registering the user details'});
//                }else {
//                    return res.json({status: true, message: 'User SuccessFully saved, Please verify Your E-mail'})
//                }
//            })
//     //    }
// //    })
//        })
//     }
//     catch(error){
//         return res.json({status: false, message: 'SomeThing Went Wrong'});
//     }
// });




// module.exports = {registerUser}








var registerAdmin = ((req, res)=>{
    console.log('///////////////////',req.body);
    try {
        console.log(req.body.userName)
        // if(req.body.userName== '' || req.body.userName== null || req.body.userName== undefined) return res.json({status: false, message: "userName can not be blank"});

        // if(req.body.password!== '' || req.body.password!== null || req.body.password!== undefined) return res.json({status: false, message: "Password can not be blank"});


        admin.findOne({userName : req.body.userName}).then((response)=>{
        if (response){
        
            return res.json({status : false, message : 'The E-mail You Entered is Alredy Registered Plz Try Different'})
        }
 
        const pass = bcrypt.hashSync(req.body.password);
        var Admin = new admin ({
            userName :  req.body.userName,
            password : pass,
        });
            Admin.save((err,user)=>{
                console.log('tttttttttt',user);
                if (err){
                    return res.json({status: false, message: 'Error registering the user details'});
                }else {
                    return res.json({status: true, message: 'User SuccessFully saved.'})
                }
            })
        })
     }
     catch(error){
         console.log('99999999999',error);
         return res.json({status: false, message: 'SomeThing Went Wrong'});
     }
 });



 var login = ((req,res)=>{
    console.log('00000000000000000',req.body);
    var log  = {
        userName : req.body.email,
        password : req.body.password
    }
    try{

        admin.findOne({userName: log.userName}).then(async(doc)=>{
            console.log('777777777777777',doc);
        if(!doc){
            return res.json({status: false, message: 'User Does Not Exist'});
        }
       if(doc){
          
                //if(await bcrypt.compare(req.body.password, doc.password)){
                if( (req.body.password==doc.password)){
                    const token = jwt.sign({_id: doc._id},JWTSECRET);
                    console.log('KKKKKKKKKKKKKk',token);
                    return res.json({
                       status   : true,
                       code     : 100,
                       message  : 'Login SuccessFully',
                       data     : doc,
                       token    : token
                    })
                }else {
                    return res.json({
                        status   : false,
                        code     : 101,
                        message  : 'Incorrect Password',
                        data     : {},
                        token    : ""
                    })
                }
          
        }else {
            return res.json({
                status   : false,
                code     : 102,
                message  : 'Email not registered',
                data     : {},
                token    : ""
            })
        } 
    })
    }catch(error){
        return res.json({
            status   : false,
            code     : 103,
            message  : 'SomeThing Went Wrong',
            data     : {},
            token    : ""
        })
    }
})

module.exports = {registerAdmin,login}