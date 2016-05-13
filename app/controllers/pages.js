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