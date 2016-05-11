var MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
  , ObjectId = require('mongodb').ObjectID
  , doc ,first ,second , re, dataBase
  , url = 'mongodb://localhost:27017/forms';
 
 
 
exports.dbInsertion = function (req) {
first = +req.body.first;
	second = +req.body.second;
	re = req;
		MongoClient.connect(url, function(err, db) {
		dataBase = db;
		
			insert(dataBase, function() {
				console.log('inserted');
			});
			print(dataBase, function(result){
				console.log('printed');
				db.close();
			});});
}
var insert = function(db, callback) {
  var collection = db.collection('form');
  if (isNumeric(first) && isNumeric(second)) {
		if (re.body.operation == "minus")
			result=+first - +second;
		else
	result=+first + +second;}
	else result="Вы ввели не число";
	/*collection.remove({}, function (err, results){
		console.log("removed");
	});*/
  collection.insertMany([
    {first}, { second},{result}
  ], function(err, result) {
    callback(result);
	doc=result;
  });
};
var print = function (db, callback) {
	var collection = db.collection('form'), i=0, t=0;
		collection.find({},{result:1}).toArray(function(err, docs){
			result = docs[docs.length-1].result
			callback(docs[docs.length-1].result);
		})
	};
isNumeric = function (n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}
	