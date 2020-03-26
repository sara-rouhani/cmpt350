var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var dict = {};

app.get("/", cors(), function(req, res, next) {
	console.log("get");
	key = req.query.name;
	if (key in dict) {
		value = dict[key];
	} else {
		value = "There is no note with this name!"
	}
	var data = {"name":key, "text":value};
	console.log("Read");
	console.log(data);
	res.json(data);
});

app.post("/new", cors(), function(req, res, next) {
	console.log("post");
	key = req.body.name;
	value = req.body.text;
	console.log(key, value);
	data= {"name":key};
	dict[key]=value;
	res.json(data);
});

app.listen(8001, () => console.log("Simple note app's server!"))
