var  asd
	, ObjectId = require('mongodb').ObjectID
	, doc ,first ,second , re, dataBase
	, url = 'mongodb://localhost:27017/forms'
	, api = require('c:/nodejs/app/api');
	
exports.home = function (req, res) {
  res.render('pages/home', {
      title: "hoodr"
    , message: 'Тутава будет результат'
  })
}
//Обработчик данных с формы
exports.registration = function (req, res) {
	api.createUser(req.body, res);	
}

exports.login = function (req, res, next) {
	if (req.session.user) return res.redirect('/main');
	api.checkUser (req.body)
		.then(function(user){
			if(user){
				req.session.user = {id:user._id, name: user.login}
				console.log(req.session.user);
				if (req.session.user.name == "admin")
					res.redirect("/admin")
				else
				res.redirect("/main");
			}else
				return next(error)
		})
	.catch(function(error){
		return next(error)
	})
}

exports.logout = function (req, res) {
	if (req.session.user) {
		console.log("deleting");
		delete req.session.user;
		console.log("deleted");
		res.redirect('/home')
	}
}

exports.admin = function(req,res) {
	if ((req.session.user!=undefined) && 
	(req.session.user.name == "admin"))
		api.getUsers(res);
	else res.render('pages/main', {message : "Туда можна только админу"})
}

exports.main = function(req, res, next) {
	if(req.session.user){
		res.render('pages/main', {
			title: 'Express',
			user : req.session.user,
			message : req.session.user.name
		});
	} else {
		var data = {
		  	title: 'Express',
			message : "Вы не авторизированы"
		}
		res.render('pages/main', data);
	}
};

exports.edit = function (req, res)
{
	api.getUser(req,res);
}

exports.update = function (req, res) 
{
	api.update(req, res);
}