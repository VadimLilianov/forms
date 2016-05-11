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
exports.calc = function (req, res) {
	api.createUser(req.body);
	asd = api.getUser(req.body.login, function (asd){
	console.log(asd)});
	console.log(asd);
	res.render('pages/calc', {
      title: "Registration"
    , message: 'Успех'
  })
}