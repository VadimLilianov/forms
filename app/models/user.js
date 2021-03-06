var mongoose = require('mongoose');
var User = new mongoose.Schema({
    login : {
        type: String,
        unique: true,
        required: true
    },
	gender : {
		type:String,
		required: true
	},
    password : {
        type: String,
        required: true
    },
	is_admin : {
        type: Boolean
    },
	name : {
        type: String
    },
	surname : {
        type: String
    },
	phone : {
        type: Number
    },
	email : {
        type: String
    }
})
 
var UserModel = mongoose.model('User', User);
 
module.exports = mongoose.model('User', UserModel)