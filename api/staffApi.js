var staffApis = require('../model/staffSchema');
var mongoose = require('mongoose');

var nodemailer = require('nodemailer');

 var staffLogin = ((req,res)=>{
    // console.log('00000000000000000',req.body);
    var log  = {
        userName : req.body.email,
        password : req.body.password
    }
    try{

        staffApis.findOne({staffEmailId: log.userName}).then(async(doc)=>{
            // console.log('777777777777777',doc);
        if(!doc){
            return res.json({status: false, message: 'This Email Is Not Exist'});
        }
       if(doc){
          
                //if(await bcrypt.compare(req.body.password, doc.password)){
                if( (req.body.password==doc.staffPassword)){
                    // const token = jwt.sign({_id: doc._id},JWTSECRET);
                    // console.log('KKKKKKKKKKKKKk',token);
                    return res.json({
                       status   : true,
                       code     : 100,
                       message  : 'Login SuccessFully',
                       data     : doc,
                       token    : ""
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



var staffPasswordChange = ((req,res)=>{
    const {userId,password,oldPassword } = req.body
    if(userId){
        if(password){
            if(oldPassword){
                var log  = {
                    staffPassword    : req.body.password
                }
                try{
                    var hex = /[0-9A-Fa-f]{6}/g;
                    checkId = (hex.test(userId))? "success" : "fail";
                    if(checkId=='fail'){
                        return res.json({
                            status   : true,
                            code     : 102,
                            message  : 'User not exist',
                            data     : {}
                        })
                    }
                    staffApis.findOne({_id: userId}).then((response)=>{
                        if(response=='' ||  response==null){
                            return res.json({
                                status   : true,
                                code     : 102,
                                message  : 'User not exist',
                                data     : {}
                            })
                        }
                        staffApis.findOne({_id: userId,staffPassword:oldPassword}).then((response)=>{
                            if(response=='' ||  response==null){
                                return res.json({
                                    status   : true,
                                    code     : 102,
                                    message  : 'Old-Password not match.',
                                    data     : {}
                                })
                            }
                            if(response){
                                staffApis.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.userId)},log,function(err,response){
                                    if (err){
                                        return res.json({code:101,status: false, message: 'Some error found.',data:{}});
                                    }else {
                                        return res.json({code:100,status: true, message: 'Password change successfully.',data:{}})
                                    }
                                },(e)=>{
                                    // console.log('eeeeeeeeeeeeee',e);
                                    return res.json({code:102,status: false, message: 'Some error found',data : []});
                                })
                            }else {
                                return res.json({
                                    status   : true,
                                    code     : 102,
                                    message  : 'User not exist',
                                    data     : {}
                                })
                            } 
                        })
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
            }else{
                return res.json({
                    status   : true,
                    code     : 99,
                    message  : 'Old Password is required field.',
                    data     : {}
                })
            }
        }else{
            return res.json({
                status   : true,
                code     : 99,
                message  : 'Password is required field.',
                data     : {}
            })
        }
    }else{
        return res.json({
            status   : true,
            code     : 99,
            message  : 'userId is required field.',
            data     : {}
        })
    }
})


var staffForgotPassword = ((req,res)=>{
    try{
        const {email } = req.body
        if(email){
            staffApis.findOne({staffEmailId: email}).then(async(doc,respo)=>{
                // console.log('777777777777777',doc);
                if(!doc){
                    return res.json({
                        status   : true,
                        code     : 104,
                        message  : 'This email is not registered.',
                        data     : {}
                    })
                }
           
            var transporter = nodemailer.createTransport({
                service : 'Gmail',
                auth : {
                    user:  'shivendra.techgropse@gmail.com',
                    pass: 'gropse@7117'
                }
            });
            const otp = Math.floor(1000 + Math.random() * 9000);  
            const mailOptions = {
                from : 'shivendra.techgropse@gmail.com',
                to : email,
                subject : 'Account Activation | E-Signature',
                html :   `<body>
                          <h1>Welcome To E-Signature.</h1>
                          <p>Your Otp is : ${otp}</p>
                           `
            };
            transporter.sendMail(mailOptions, function(error,response){
                if (error) {
                    return res.json({
                        status   : true,
                        code     : 101,
                        message  : 'OTP not send on your email.Try again.',
                        data     : {}
                    })
                } else {
                    var log  = {
                        otp    : otp
                    }
                    console.log('Email sent: ');
                    staffApis.findOneAndUpdate({staffEmailId:email},log,function(err,response){
                        if (err){
                            return res.json({code:103,status: false, message: 'Some error found.',data:{}});
                        }else {
                            return res.json({code:100,status: true, message: 'OTP send successfully.Please verify your account.',data:{}})
                        }
                    },(e)=>{
                        // console.log('eeeeeeeeeeeeee',e);
                        return res.json({code:102,status: false, message: 'Some error found',data : []});
                    })
                }
              });
            });
        }else{
            return res.json({
                status   : true,
                code     : 99,
                message  : 'Email is required field.',
                data     : {}
            })
        }
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


var staffVerifyOtp = ((req,res)=>{
    try{
        const {email,otp } = req.body
        if(email){
            if(otp){
                staffApis.findOne({staffEmailId: email}).then(async(doc,respo)=>{
                    if(!doc){
                        return res.json({
                            status   : true,
                            code     : 104,
                            message  : 'This email is not registered.',
                            data     : {}
                        })
                    }
                    staffApis.findOne({staffEmailId: email,otp:otp}).then(async(doc,respo)=>{
                        console.log(respo)
                        if(!doc){
                            return res.json({
                                status   : true,
                                code     : 104,
                                message  : 'Check your OTP.',
                                data     : {}
                            })
                        }else{
                            return res.json({
                                status   : true,
                                code     : 100,
                                message  : 'Otp verify successfully.',
                                data     : doc
                            })
                        }
                    });
                });
            }else{
                return res.json({
                    status   : true,
                    code     : 99,
                    message  : 'OTP is required field.',
                    data     : {}
                })
            }
        }else{
            return res.json({
                status   : true,
                code     : 99,
                message  : 'Email is required field.',
                data     : {}
            })
        }
    }catch(error){
        return res.json({
            status   : false,
            code     : 103,
            message  : 'SomeThing Went Wrong',
            data     : {}
        })
    }
})

var staffResetPassword = ((req,res)=>{
    try{
        const {userId,password } = req.body
        if(userId){
            if(password){
                var hex = /[0-9A-Fa-f]{6}/g;
                checkId = (hex.test(userId))? "success" : "fail";
                if(checkId=='fail'){
                    return res.json({
                        status   : true,
                        code     : 101,
                        message  : 'User not exist',
                        data     : {}
                     })
                }
                staffApis.findOne({_id: userId}).then((response)=>{
                    if(response=='' ||  response==null){
                        return res.json({
                            status   : true,
                            code     : 101,
                            message  : 'User not exist',
                            data     : {}
                         })
                    }

                    var staffRequest = {
                        staffPassword   : password
                    }
                    staffApis.findOneAndUpdate({_id: mongoose.Types.ObjectId(userId)},staffRequest,function(err,response){
                        if (err){
                            return res.json({
                                status   : true,
                                code     : 102,
                                message  : 'Some error found.',
                                data     : {}
                            })
                        }else {
                            return res.json({
                                status   : true,
                                code     : 100,
                                message  : 'Password saved successfully.',
                                data     : response
                            })
                        }
                    },(e)=>{
                        return res.json({
                            status   : true,
                            code     : 102,
                            message  : 'Some error found.',
                            data     : {}
                        })
                    })
                });
            }else{
                return res.json({
                    status   : true,
                    code     : 99,
                    message  : 'Password is required field.',
                    data     : {}
                })
            }
        }else{
            return res.json({
                status   : true,
                code     : 99,
                message  : 'UserId is required field.',
                data     : {}
            })
        }
    }catch(error){
        return res.json({
            status   : false,
            code     : 103,
            message  : 'SomeThing Went Wrong',
            data     : {}
        })
    }
})


var staffMyProfile = ((req,res)=>{
    try{
        const {userId } = req.body
        if(userId){
           
                var hex = /[0-9A-Fa-f]{6}/g;
                checkId = (hex.test(userId))? "success" : "fail";
                if(checkId=='fail'){
                    return res.json({
                        status   : true,
                        code     : 101,
                        message  : 'User not exist',
                        data     : {}
                     })
                }
                staffApis.findOne({_id: mongoose.Types.ObjectId(userId)}).then((response)=>{
                    if(response=='' ||  response==null){
                        return res.json({
                            status   : true,
                            code     : 101,
                            message  : 'User not exist',
                            data     : {}
                         })
                    }else{
                        return res.json({
                            status   : true,
                            code     : 100,
                            message  : 'Staff profile',
                            data     : response
                         })
                    }
                    
                });
        }else{
            return res.json({
                status   : true,
                code     : 99,
                message  : 'UserId is required field.',
                data     : {}
            })
        }
    }catch(error){
        return res.json({
            status   : false,
            code     : 103,
            message  : 'SomeThing Went Wrong',
            data     : {}
        })
    }
})



module.exports = {staffLogin,staffPasswordChange,staffForgotPassword,staffVerifyOtp,staffResetPassword,staffMyProfile}