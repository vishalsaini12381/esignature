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






var adminSchema = new mongoose.Schema({
    userName : {
        type: String,
        trim: true,
        required: true,
    },
    password  : {
        type : String,
        trim : true,
        required: true,
    },
 
    status  : {
        type : String,
        trim : true,
        default : 1
    }
    
 })
 
 var admin = mongoose.model('admin', adminSchema);
 
 module.exports = admin;