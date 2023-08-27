const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name : {
        type : 'string',
        required : true
    },
    description : { 
        type : 'string', 
        required : true
    },
    category : {
        type : 'string',
        required : true
    }, 
    imageURL : {
        type : 'string', 
        required : true
    },
    location : {
        type : 'string',
        required : true
    },
    phone : {
        type : 'string',
        required : true
    },
    rating : {
        type : 'string',
        required : true
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => {
           return Date.now();
        }
    },
    updatedAt : {
        type : Date,
        default : () => {
           return Date.now();
        }
    }
});

module.exports = mongoose.model('hotel', hotelSchema);