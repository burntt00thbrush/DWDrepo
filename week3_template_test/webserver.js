var config = require("./config.js");

var mongojs = require('mongojs');
var db = mongojs(config.username+":"+config.password+"@ds021989.mlab.com:21989/testingtesting", ["submissions"]);


var express = require('express')
var app = express()


app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser); 

app.use(express.static('public'));

var submissions_array = [];


// app.get('/', function (req, res) {
//   res.send('Hello World!!')
// })


app.get('/formpost', function (req, res) {
	console.log("They submitted: " + req.query.textfield);
  submissions_array.push(req.query.textfield);
  res.redirect("/formpost.html");
  

  //if the page doens't need to be showing any data, there is no 
  //no need for it to be displaying any data, so make the formpost an html file



// submissions.push(req.query.textfield);
// 	res.send("You submitted" );
// 	submissions.push(req.query.textfield);
})

app.get('/display', function(req, res) {
  //here I want to get the data and render the display page 
  res.render('display.ejs', {'youtube_videos':submissions_array})
 // db.submissions.find({}, function(err, saved) {
 //    if (err || !saved) {
 //        console.log("No results");
 //      }
 //      else {
 //        console.log(saved);
 //      res.render('display.ejs',{submissions_on_page:saved});
 //      } 
 //});

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})