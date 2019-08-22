var staff = require('../model/staffSchema');

var mongoose = require('mongoose');


var addStaff = ((req, res)=>{
    console.log('///////////////////',req.body)
    try {
        const { staffName, staffMobile,staffEmailId,staffPassword,staffPostalCode,staffCountry,staffCity,staffAddress,branchId } = req.body
        // console.log(branchName)
        if(staffName){
            if(staffMobile){
                if(staffEmailId ){
                    if(staffPassword ){
                        if(staffPostalCode){
                            if(staffCountry){
                                if(staffCity){
                                    if(staffAddress){
                                        if(branchId){
                                            var staffRequest = new staff ({
                                                staffName       :  staffName,
                                                staffMobile     : staffMobile,
                                                staffEmailId    : staffEmailId,
                                                staffPassword   : staffPassword,
                                                staffPostalCode : staffPostalCode,
                                                staffCountry    : staffCountry,
                                                staffCity       : staffCity,
                                                staffAddress    : staffAddress,
                                                branchId        : branchId
                                            });
    
                                        staffRequest.save((err,resp)=>{
                                            console.log('tttttttttt',resp);
                                            if (err){
                                                return res.json({code:101,status: false, message: 'Error while adding staff.',data:{}});
                                            }else {
                                                return res.json({code:100,status: true, message: 'Staff SuccessFully Saved.',data:{}})
                                            }
                                        })
                                }else{
                                    return res.json({
                                        status   : false,
                                        code     : 99,
                                        message  : 'branchId is required field.',
                                        data     : {}
                                    })
                                }
                                   
                            }else{
                                return res.json({
                                    status   : false,
                                    code     : 99,
                                    message  : 'staffAddress is required field.',
                                    data     : {}
                                })
                            }
                        }else{
                            return res.json({
                                status   : false,
                                code     : 99,
                                message  : 'staffCity is required field.',
                                data     : {}
                            })
                        }
                    }else{
                        return res.json({
                            status   : false,
                            code     : 99,
                            message  : 'staffCountry is required field.',
                            data     : {}
                        })
                    }
                }else{
                    return res.json({
                        status   : false,
                        code     : 99,
                        message  : 'staffPostalCode is required field.',
                        data     : {}
                    })
                }
            }else{
                return res.json({
                    status   : false,
                    code     : 99,
                    message  : 'staffPassword is required field.',
                    data     : {}
                })
            }
        }else{
                return res.json({
                    status   : false,
                    code     : 99,
                    message  : 'staffEmailId is required field.',
                    data     : {}
                })
            }
           
        }else{
            return res.json({
                status   : false,
                code     : 99,
                message  : 'staffMobile is required field.',
                data     : {}
            })
       }
       }else{
            return res.json({
                status   : false,
                code     : 99,
                message  : 'staffName is required field.',
                data     : {}
            })
       }
        
     }
     catch(error){
         console.log('99999999999',error);
         return res.json({status: false, message: 'SomeThing Went Wrong'});
     }
 });




 var editStaff = ((req, res)=>{
    console.log('///////////////////',req.body)
    try {
        const {staffId, staffName, staffMobile,staffEmailId,staffPostalCode,staffCountry,staffCity,staffAddress } = req.body
        // console.log(branchName)
        if(staffName){
            if(staffMobile){
                if(staffEmailId ){
                    if(staffPostalCode){
                            if(staffCountry){
                                if(staffCity){
                                    if(staffId){
                                    if(staffAddress){
                                            var staffRequest = {
                                                staffName       :  staffName,
                                                staffMobile     : staffMobile,
                                                staffEmailId    : staffEmailId,
                                                staffPostalCode : staffPostalCode,
                                                staffCountry    : staffCountry,
                                                staffCity       : staffCity,
                                                staffAddress    : staffAddress
                                            }
    
                                            staff.findOneAndUpdate({_id: mongoose.Types.ObjectId(staffId)},staffRequest,function(err,response){
                                                console.log('tttttttttt',err,'rrrrrrrrrrrrrrr',response);
                                                if (err){
                                                    return res.json({code:101,status: false, message: 'Error while update staff.',data:{}});
                                                }else {
                                                    return res.json({code:100,status: true, message: 'Profile updated successfully.',data:{}})
                                                }
                                            },(e)=>{
                                                // console.log('eeeeeeeeeeeeee',e);
                                                return res.json({code:102,status: false, message: 'Some error found',data : []});
                                            })
                                        }else{
                                            return res.json({
                                                status   : false,
                                                code     : 99,
                                                message  : 'staffId is required field.',
                                                data     : {}
                                            })
                                        }
                            }else{
                                return res.json({
                                    status   : false,
                                    code     : 99,
                                    message  : 'staffAddress is required field.',
                                    data     : {}
                                })
                            }
                        }else{
                            return res.json({
                                status   : false,
                                code     : 99,
                                message  : 'staffCity is required field.',
                                data     : {}
                            })
                        }
                    }else{
                        return res.json({
                            status   : false,
                            code     : 99,
                            message  : 'staffCountry is required field.',
                            data     : {}
                        })
                    }
                }else{
                    return res.json({
                        status   : false,
                        code     : 99,
                        message  : 'staffPostalCode is required field.',
                        data     : {}
                    })
                }
            
        }else{
                return res.json({
                    status   : false,
                    code     : 99,
                    message  : 'staffEmailId is required field.',
                    data     : {}
                })
            }
           
        }else{
            return res.json({
                status   : false,
                code     : 99,
                message  : 'staffMobile is required field.',
                data     : {}
            })
       }
       }else{
            return res.json({
                status   : false,
                code     : 99,
                message  : 'staffName is required field.',
                data     : {}
            })
       }
        
     }
     catch(error){
         console.log('99999999999',error);
         return res.json({status: false, message: 'SomeThing Went Wrong'});
     }
 });



 var staffList = ((req, res)=>{
    console.log('///////////////////',req.body)
    try {
        staff.find({})
        .populate('branchId','branchName branchMobile branchEmailId branchPostalCode branchCountry branchCity branchAddress')
        // .populate('branchId','branchMobile')
        .then((response)=>{
            console.log('88888888888888',response);
            if(response == '' || response == null ){
                return res.json({code:101,status: false, message: 'No Staff Avaliable',data : []});
            }else{
                return res.json({code:100,status: true, message: 'Staff List',data : response});
            }
        })
     }
     catch(error){
         console.log('99999999999',error);
         return res.json({code:102,status: false, message: 'SomeThing Went Wrong',data : []});
     }
 });

 var staffDetail = ((req, res)=>{
    console.log('///////////////////',req.body)
    try {
        const { staffId } = req.body
        if(staffId){
            staff.findById({_id: mongoose.Types.ObjectId(req.body.staffId) })
            .populate('branchId','branchName branchMobile branchEmailId branchPostalCode branchCountry branchCity branchAddress')
            .then((response)=>{
                console.log('88888888888888',response);
                if(response){
                    return res.json({code:100,status: true, message: 'Staff Detail',data : response});
                }else{
                    return res.json({code:101,status: false, message: 'No Staff Avaliable',data : []});
                }
            },(e)=>{
                console.log('eeeeeeeeeeeeee',e);
                return res.json({status: false, message:'Some Error'})
            })
        }else{
            return res.json({
                status   : false,
                code     : 99,
                message  : 'staffId is required field.',
                data     : {}
            })
        }
     }
     catch(error){
         console.log('99999999999',error);
         return res.json({code:102,status: false, message: 'SomeThing Went Wrong',data : []});
     }
 });
 

 var staffStatusChange = ((req, res)=>{
    console.log('///////////////////',req.body)
    try {
        if(req.body.staffId){
            var detail = {
                status: req.body.status
            };
            staff.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.staffId)},detail).then((response)=>{
                console.log('88888888888888',response);
                if(response){
                    return res.json({code:100,status: true, message: 'Staff Detail',data : response});
                }else{
                    return res.json({code:101,status: false, message: 'No Staff Avaliable',data : []});
                }
            },(e)=>{
                console.log('eeeeeeeeeeeeee',e);
                return res.json({status: false, message:'Some Error'})
            })
        }else{
            return res.json({
                status   : false,
                code     : 99,
                message  : 'staffId is required field.',
                data     : {}
            })
        }
     }
     catch(error){
         console.log('99999999999',error);
         return res.json({code:102,status: false, message: 'SomeThing Went Wrong',data : []});
     }
 });

 var staffChangePassword = ((req, res)=>{
    console.log('///////////////////',req.body)
    try {
        const { staffId, password } = req.body
        if(staffId){
            staff.findById({_id: mongoose.Types.ObjectId(staffId) }).then((staffData)=>{
                if(staffData=='' || staffData==null){
                    return res.json({code:101,status: false, message: 'No Staff Avaliable',data : []});
                }else{
                    if(password){
            var detail = {
                staffPassword: password
            };
            staff.findOneAndUpdate({_id: mongoose.Types.ObjectId(staffId)},detail).then((response)=>{
                    console.log('88888888888888',response);
                    if(response=='' ||  response==null){
                        return res.json({code:101,status: false, message: 'Some error found',data : []});
                    }else{
                        return res.json({code:100,status: true, message: 'Password change successfully.',data : response});
                    }
                },(e)=>{
                    console.log('eeeeeeeeeeeeee',e);
                    return res.json({code:102,status: false, message: 'Some error found',data : []});
                })
            }else{
                return res.json({
                    status   : false,
                    code     : 99,
                    message  : 'Password is required field.',
                    data     : {}
                })
            }
                }
            },(e)=>{
                return res.json({code:102,status: false, message: 'Some error found',data : []});
            })

        }else{
                return res.json({
                    status   : false,
                    code     : 99,
                    message  : 'staffId is required field.',
                    data     : {}
                })
            }
        }
     catch(error){
         console.log('99999999999',error);
         return res.json({code:102,status: false, message: 'Some error found',data : []});
     }
 });

 var staffChangeBranch = ((req, res)=>{
    console.log('///////////////////',req.body)
    try {
        const { staffId, branchId } = req.body
        if(staffId){
            if(branchId){
            var detail = {
                branchId: branchId
            };
            staff.findOneAndUpdate({_id: mongoose.Types.ObjectId(staffId)},detail).then((response)=>{
                    console.log('88888888888888',response);
                    if(response){
                        return res.json({code:100,status: true, message: 'Branch change successfully.',data : response});
                    }else{
                        return res.json({code:101,status: false, message: 'Some error found',data : []});
                    }
                },(e)=>{
                    console.log('eeeeeeeeeeeeee',e);
                    return res.json({code:102,status: false, message: 'Some error found',data : []});
                })
            }else{
                return res.json({
                    status   : false,
                    code     : 99,
                    message  : 'branchId is required field.',
                    data     : {}
                })
            }
        }else{
                return res.json({
                    status   : false,
                    code     : 99,
                    message  : 'staffId is required field.',
                    data     : {}
                })
            }
        }
     catch(error){
         console.log('99999999999',error);
         return res.json({code:102,status: false, message: 'Some error found',data : []});
     }
 });


 

module.exports = {addStaff,editStaff,staffList,staffDetail,staffStatusChange,staffChangePassword,staffChangeBranch}

// module.exports = {addStaff,branchList,branchDetail,branchStatusChange}