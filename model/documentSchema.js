var mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

var documentSchema = new mongoose.Schema({
    // branchId  : {
    //     type : String,
    //     trim : true,
    //     required: true,
    // },
    staffId : {
        type: String,
        trim: true,
        required: true,
    },
    document  : {
        type : String,
        trim : true,
        required: true,
    },
    document_name  : {
        type : String,
        trim : true,
        required: true,
    },
    plate_number  : {
        type : String,
        trim : true,
        required: true,
    },
    message  : {
        type : String,
        trim : true,
        required: true,
    },
    participant  : {
        type : Array,
        trim : true,
        required: true,
    },
    status  : {
        type : String,
        trim : true,
        default : 0
    },
    createdAt  : {
        type: Date,        
        default: Date.now
    },
    staffId : [{type : ObjectId, ref : 'staff',default: null}],
    
 },{usePushEach: true})
 
 var document = mongoose.model('document', documentSchema);
 
 module.exports = document;