var mongoose = require('mongoose')
var crypto = require('crypto')
var db = mongoose.connect('mongodb://localhost:27017/session')
var User = require('c:/nodejs/app/models/User.js')
 
// User API
 
exports.createUser = function(userData){
	var user = {
		login: userData.login,
		gender: userData.gender,
		password: hash(userData.password)
	}
	return new User(user).save()
}
 
exports.getUser = function(login) {
	User.findOne({login:login},		
			function(err, docs){				
				console.log(docs.login);
				}
			);
}
 
exports.checkUser = function(userData) {
	return User
		.findOne({login: userData.login})
		.then(function(doc){
			if ( doc.password == hash(userData.password) ){
				console.log("User password is ok");
				return Promise.resolve(doc)
			} else {
				return Promise.reject("Error wrong")
			}
		})
}
 
function hash(text) {
	return crypto.createHash('sha1')
	.update(text).digest('base64')
}