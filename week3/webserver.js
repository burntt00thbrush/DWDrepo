//requiring config.js as username and password of mongo database are in the
//config.js file which is listed in the gitingore 

var user = require('./config.js');
console.log(user.username + user.password);

var mongojs = require('mongojs');

console.log("lets hope for the best");
var db = mongojs(user.username+":"+user.password+"@ds229878.mlab.com:29878/dynamicbase", ["submissions"]);
console.log("yay it worked");

var express = require('express')
var app = express()


app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser); 

app.use(express.static('public'));

var submissions_array = [];


//in this action request, /formpost is requested, and 
app.get('/formpost', function (req, res) {
	console.log("They submitted: " + req.query.textfield);
  submissions_array.push(req.query.textfield);
  res.redirect("/formpost.html");

//this is the part o the server responsible for inserting/saving data into the mondo database
  db.submissions.save({"submission":req.body.textfield}, 
    function(err, saved) {
      if( err || !saved ) console.log("Not saved");
      else console.log("Saved");
});

})

//this POST action makes it so that the url doesn't display 
// whatever people have placed in the form value box 
app.post('/formpost', function (req, res) {
  console.log("They submitted: " + req.query.textfield);
  submissions_array.push(req.query.textfield);
  res.redirect("/formpost.html");

//this is the part o the server responsible for inserting/saving data into the mondo database
  db.submissions.save({"submission":req.body.textfield}, 
    function(err, saved) {
      if( err || !saved ) console.log("Not saved");
      else console.log("Saved");
});

})
  

  //hello---if the page doens't need to be showing any data, there is no 
  //no need for it to be displaying any data, so make the formpost an html file



app.get('/display', function(req, res) {
  //here I want to get the data and render the display page 

  //pull records from the database
  db.submissions.find({}, function(err, saved) {
  if (err || !saved) {
    console.log("No results");
  }
  else {

    res.render('display.ejs', {youtube_videos:saved});
    for (var i = 0; i < saved.length; i++) {
      console.log(saved[i]);
  }    
  }
});   
    

  
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