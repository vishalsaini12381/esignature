var mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

var staffSchema = new mongoose.Schema({
    // branchId  : {
    //     type : String,
    //     trim : true,
    //     required: true,
    // },
    staffName : {
        type: String,
        trim: true,
        required: true,
    },
    staffMobile  : {
        type : String,
        trim : true,
        required: true,
    },
    staffEmailId  : {
        type : String,
        trim : true,
        required: true,
    },
    staffPassword  : {
        type : String,
        trim : true,
        required: true,
    },
    staffPostalCode  : {
        type : String,
        trim : true,
        required: true,
    },
    staffCountry  : {
        type : String,
        trim : true,
        required: true,
    },
    staffCity  : {
        type : String,
        trim : true,
        required: true,
    },
    staffAddress  : {
        type : String,
        trim : true,
        required: true,
    },
    status  : {
        type : String,
        trim : true,
        default : 1
    },
    otp  : {
        type : String,
        trim : true,
        default : 1234
    },
    createdAt  : {
        type: Date,        
        default: Date.now
    },
    branchId : [{type : ObjectId, ref : 'branch',default: null}],
    
 },{usePushEach: true})
 
 var staff = mongoose.model('staff', staffSchema);
 
 module.exports = staff;