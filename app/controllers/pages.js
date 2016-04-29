exports.home = function (req, res) {
  res.render('pages/home', {
      title: "hoodr"
    , message: 'This is the "home" action of "pages" controller'
  })
}
exports.calc = function (req, res) {
	var first=req.body.first,
	second = req.body.second;
	if (isNumeric(first) && isNumeric(second))
		if (req.body.operation == "minus")
			a=+first - +second;
		else
			a=+first + +second;
		res.render('pages/calc', {
			title: "Результат",
			message: a
			});
	console.log(a);
}

isNumeric = function (n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}