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
 
exports.getUser = function(req, res) {
	return User.findOne({login:req.body.login},{},		
			function(err, doc){	
				res.render('pages/edit', {
					title : "Редактировать профиль",
					message : doc})
				console.log(doc);
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

exports.update = function (req, res){
	console.log(req.body);
	User.findByIdAndUpdate(req.body.id, { $set: { login: req.body.login,
		name:req.body.name,
		surname: req.body.surname,
		email:req.body.email,
		is_admin:req.body.is_admin,
		gender: req.body.gender,
		phone: req.body.phone}}, function (err, user) {
  if (err) return handleError(err);
  res.redirect("/admin");
});
	
}
 
function hash(text) {
	return crypto.createHash('sha1')
	.update(text).digest('base64')
}