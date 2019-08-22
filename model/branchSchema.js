var mongoose = require('mongoose');

// var userSchema = new mongoose.Schema({
//    firstName : {
//        type: String,
//        trim: true,
//    },
//    lastName  : {
//        type : String,
//        trim : true,
//    },
//    email :{
//        type: String,
//        trim: true
//    },
//    password  : {
//        type : String,
//        trim : true
//    },

//    status :{
//        activeEmailToken : {type: Number},
//        activeEmail : {type: Boolean, default : false},
//        resetPassToken : {type: String , default: null},
//        otp  : {type: String, default : null},
//    }

// })

// var user = mongoose.model('user', userSchema);

// module.exports = user;






var branchSchema = new mongoose.Schema({
    branchName : {
        type: String,
        trim: true,
        required: true,
    },
    branchMobile  : {
        type : String,
        trim : true,
        required: true,
    },
    branchEmailId  : {
        type : String,
        trim : true,
        required: true,
    },
    branchPostalCode  : {
        type : String,
        trim : true,
        required: true,
    },
    branchCountry  : {
        type : String,
        trim : true,
        required: true,
    },
    branchCity  : {
        type : String,
        trim : true,
        required: true,
    },
    branchAddress  : {
        type : String,
        trim : true,
        required: true,
    },
    status  : {
        type : String,
        trim : true,
        default : 1
    },
    createdAt  : {
        type: Date,        
        default: Date.now
    }
    
 })
 
 var branch = mongoose.model('branch', branchSchema);
 
 module.exports = branch;