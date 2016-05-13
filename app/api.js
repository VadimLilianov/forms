var mongoose = require('mongoose')
var crypto = require('crypto')
var db = mongoose.connect('mongodb://localhost:27017/session')
var User = require('c:/nodejs/app/models/User.js')
 
// User API
 
exports.createUser = function(userData,res){
	var user = {
		login: userData.login,
		gender: userData.gender,
		password: hash(userData.password)
	}
	  User(user).save()
	  res.render('pages/home', {
      title: "Registration"
    , message: "<br>"+ 'Ваш логин: ' +"</br>" + userData.login
  })
}
 
exports.getUsers = function(res) {
	return User.find({},{login:1},		
			function(err, docs){	
				res.render('pages/admin', {message : docs})
				}
			);
}
 
exports.checkUser = function(userData) {
	return User
		.findOne({login: userData.login})
		.then(function(doc){
			if (   (doc!=null) && (doc.password == hash(userData.password))){
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