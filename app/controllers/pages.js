exports.home = function (req, res) {
  res.render('pages/home', {
      title: "hoodr"
    , message: 'This is the "home" action of "pages" controller'
  })
}
//Обработчик данных с формы
exports.calc = function (req, res) {
	var first=req.body.first,
	second = req.body.second;
	//Проверяем на число и узнаем что ж хотели сделать
	if (isNumeric(first) && isNumeric(second)) {
		if (req.body.operation == "minus")
			a=+first - +second;
		else
	a=+first + +second;}
	else a="Вы ввели не число";
		res.render('pages/calc', {
			title: "Результат",
			message: a
			});
	console.log(a);
}
//Проверка на число
isNumeric = function (n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}