var branch = require('../model/branchSchema');

var mongoose = require('mongoose');


var addBranch = ((req, res)=>{
    console.log('///////////////////',req.body)
    try {
        const { branchName, branchMobile,branchEmailId,branchPostalCode,branchCountry,branchCity,branchAddress } = req.body
        console.log(branchName)
        if(branchName){
            if(branchMobile){
                if(branchEmailId ){
                    if(branchPostalCode){
                        if(branchCountry){
                            if(branchCity){
                                if(branchAddress){
                                    var branchRequest = new branch ({
                                        branchName :  branchName,
                                        branchMobile : branchMobile,
                                        branchEmailId : branchEmailId,
                                        branchPostalCode : branchPostalCode,
                                        branchCountry : branchCountry,
                                        branchCity : branchCity,
                                        branchAddress : branchAddress,
                                    });

                                    branchRequest.save((err,resp)=>{
                                        console.log('tttttttttt',resp);
                                        if (err){
                                            return res.json({code:101,status: false, message: 'Error registering the user details',data:{}});
                                        }else {
                                            return res.json({code:100,status: true, message: 'Branch SuccessFully Saved.',data:{}})
                                        }
                                    })
                            }else{
                                return res.json({
                                    status   : false,
                                    code     : 99,
                                    message  : 'branchAddress is required field.',
                                    data     : {}
                                })
                            }
                        }else{
                            return res.json({
                                status   : false,
                                code     : 99,
                                message  : 'branchCity is required field.',
                                data     : {}
                            })
                        }
                    }else{
                        return res.json({
                            status   : false,
                            code     : 99,
                            message  : 'branchCountry is required field.',
                            data     : {}
                        })
                    }
                }else{
                    return res.json({
                        status   : false,
                        code     : 99,
                        message  : 'branchPostalCode is required field.',
                        data     : {}
                    })
                }
            }else{
                return res.json({
                    status   : false,
                    code     : 99,
                    message  : 'branchEmailId is required field.',
                    data     : {}
                })
            }
           
        }else{
            return res.json({
                status   : false,
                code     : 99,
                message  : 'branchMobile is required field.',
                data     : {}
            })
       }
       }else{
            return res.json({
                status   : false,
                code     : 99,
                message  : 'branchName is required field.',
                data     : {}
            })
       }
        
     }
     catch(error){
         console.log('99999999999',error);
         return res.json({status: false, message: 'SomeThing Went Wrong'});
     }
 });


 var editBranch = ((req, res)=>{
    console.log('///////////////////',req.body)
    try {
        const {branchId, branchName, branchMobile,branchEmail,branchCode,branchCountry,branchCity,branchAddress } = req.body
        // console.log(branchName)
        if(branchName){
            if(branchMobile){
                if(branchEmail ){
                    if(branchCode){
                            if(branchCountry){
                                if(branchCity){
                                    if(branchId){
                                    if(branchAddress){
                                            var branchRequest = {
                                                branchName       :  branchName,
                                                branchMobile     : branchMobile,
                                                branchEmailId    : branchEmail,
                                                branchPostalCode : branchCode,
                                                branchCountry    : branchCountry,
                                                branchCity       : branchCity,
                                                branchAddress    : branchAddress
                                            }
    
                                            branch.findOneAndUpdate({_id: mongoose.Types.ObjectId(branchId)},branchRequest,function(err,response){
                                                console.log('tttttttttt',err,'rrrrrrrrrrrrrrr',response);
                                                if (err){
                                                    return res.json({code:101,status: false, message: 'Error while update staff.',data:{}});
                                                }else {
                                                    return res.json({code:100,status: true, message: 'Branch updated successfully.',data:{}})
                                                }
                                            },(e)=>{
                                                // console.log('eeeeeeeeeeeeee',e);
                                                return res.json({code:102,status: false, message: 'Some error found',data : []});
                                            })
                                        }else{
                                            return res.json({
                                                status   : false,
                                                code     : 99,
                                                message  : 'BranchId is required field.',
                                                data     : {}
                                            })
                                        }
                            }else{
                                return res.json({
                                    status   : false,
                                    code     : 99,
                                    message  : 'branchAddress is required field.',
                                    data     : {}
                                })
                            }
                        }else{
                            return res.json({
                                status   : false,
                                code     : 99,
                                message  : 'branchCity is required field.',
                                data     : {}
                            })
                        }
                    }else{
                        return res.json({
                            status   : false,
                            code     : 99,
                            message  : 'branchCountry is required field.',
                            data     : {}
                        })
                    }
                }else{
                    return res.json({
                        status   : false,
                        code     : 99,
                        message  : 'branchCode is required field.',
                        data     : {}
                    })
                }
            
        }else{
                return res.json({
                    status   : false,
                    code     : 99,
                    message  : 'branchEmailId is required field.',
                    data     : {}
                })
            }
           
        }else{
            return res.json({
                status   : false,
                code     : 99,
                message  : 'branchMobile is required field.',
                data     : {}
            })
       }
       }else{
            return res.json({
                status   : false,
                code     : 99,
                message  : 'branchName is required field.',
                data     : {}
            })
       }
        
     }
     catch(error){
         console.log('99999999999',error);
         return res.json({status: false, message: 'SomeThing Went Wrong'});
     }
 });

 var branchList = ((req, res)=>{
    console.log('///////////////////',req.body)
    try {
        
        branch.find({}).then((response)=>{
            console.log('88888888888888',response);
            if(response){
                return res.json({code:100,status: true, message: 'Branch List',data : response});
            }else{
                return res.json({code:101,status: false, message: 'No Branch Avaliable',data : []});
            }
        })
     }
     catch(error){
         console.log('99999999999',error);
         return res.json({code:102,status: false, message: 'SomeThing Went Wrong',data : []});
     }
 });

//  var branchDetail = ((req, res)=>{
//     console.log('///////////////////',req.body)
//     try {
//         const { branchId } = req.body
//         if(branchId){
//             // var branchRequest = new branch ({
//             //     _id :  branchId
//             // });
//             branch.findById({_id: mongoose.Types.ObjectId(req.body.branchId) }).then((response)=>{
//                 console.log('88888888888888',response);
//                 if(response){
//                     return res.json({code:100,status: true, message: 'Branch Detail',data : response});
//                 }else{
//                     return res.json({code:101,status: false, message: 'No Branch Avaliable',data : []});
//                 }
//             },(e)=>{
//                 console.log('eeeeeeeeeeeeee',e);
//                 return res.json({status: false, message:'Some Error'})
//             })
//         }else{
//             return res.json({
//                 status   : false,
//                 code     : 99,
//                 message  : 'branchlId is required field.',
//                 data     : {}
//             })
//         }
//      }
//      catch(error){
//          console.log('99999999999',error);
//          return res.json({code:102,status: false, message: 'SomeThing Went Wrong',data : []});
//      }
//  });
 




var branchDetail = ((req, ress)=>{
    try{
        console.log('bid',req.body.branchId)
        const { branchId } = req.body
        console.log('qqqqqqqqq',branchId)
        if(branchId=='undefined' || branchId==undefined || branchId==null || branchId==''){
            return ress.json({
                status   : false,
                code     : 99,
                message  : 'branchId is required field.',
                data     : {}
            })
        }else{
            branch.aggregate([
                    { $match: { _id: branchId }},
                    { $lookup:
                    {
                        from: 'staffs',
                        localField: '_id',
                        foreignField: 'branchId',
                        as: 'staff'
                    }
                    }
                    ],(function(err, res) {
                        console.log('WWWWWWWWWWWWWWWWWW21',err);
                    if (err){
                        return ress.json({
                            status   : false,
                            code     : 999,
                            message  : 'branchId is required field.',
                            data     : {}
                        })
                    }else{
                        if(res=='undefined' || res==undefined || res==null || res==''){
                            return ress.json({code:101,status: true, message: 'No branch avaliable.',data : {}});
                        }else{
                            return ress.json({code:100,status: true, message: 'Branch Detail',data : res});
                        }
                        
                    }
                    
                })
                )
            }
        }
        catch(error){
            console.log('99999999999',error);
            return res.json({code:102,status: false, message: 'SomeThing Went Wrong',data : []});
        }
    
    });




 var branchStatusChange = ((req, res)=>{
    console.log('///////////////////',req.body)
    try {
        if(req.body.branchId){
            var detail = {
                status: req.body.status
            };
            branch.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.branchId)},detail).then((response)=>{
                console.log('88888888888888',response);
                if(response){
                    return res.json({code:100,status: true, message: 'Branch Detail',data : response});
                }else{
                    return res.json({code:101,status: false, message: 'No Branch Avaliable',data : []});
                }
            },(e)=>{
                console.log('eeeeeeeeeeeeee',e);
                return res.json({status: false, message:'Some Error'})
            })
        }else{
            return res.json({
                status   : false,
                code     : 99,
                message  : 'branchlId is required field.',
                data     : {}
            })
        }
     }
     catch(error){
         console.log('99999999999',error);
         return res.json({code:102,status: false, message: 'SomeThing Went Wrong',data : []});
     }
 });


 

module.exports = {addBranch,branchList,branchDetail,branchStatusChange,editBranch}