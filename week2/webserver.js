var express = require('express')
var app = express()

//config so that 'public' folder will be served
app.use(express.static('public'));

// app.get('/', function (req, res) {
//   res.send('Hello World!!')
// })

var count = 0;

var submissions = [];


app.get('/formpost', function (req, res) {
	console.log("They submitted: " + req.query.textfield);
	var htmlFormPost = `
  <html>
    <head>
    <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
    <h3>deeply appreciated</h3>
    <p><a href='/display'>see what others think about</a></p>
    </body>
  </html>
  `;
  res.send(htmlFormPost);
  // save into an array
submissions.push(req.query.textfield);
	res.send("You submitted" );
	submissions.push(req.query.textfield);
})

app.get('/display', function(req, res) {
  var htmlDisplay = `
  <html>
    <head>
    <link rel= "stylesheet" type="text/css" href="style.css">
    </head>
    <body>
    <h3> You have provided so many insights</h3> 
`
  ;
	for (var i = 0; i < submissions.length; i++) {
    var youtubeUrl = submissions[i]

    //I got help from Barak on the piece of code that includes slice and indexOf
    //I was having issues with the embedding:
    //I was getting errors in the console that looked like this
    //Load denied by X-Frame-Options: does not permit cross-origin framing.
    //Now the embedding permission is being received by youtube, when I was simply trying
    //to parse in the youtube URLs being submitted. 

    htmlDisplay+= "<iframe width=" + "\"420\" " + "height=" + "\"315\" " + 
   "src=\" " + "https://www.youtube.com/embed/" + youtubeUrl.slice(youtubeUrl.indexOf("?v=") + 3) + "\" ></iframe>"; 


	}
  htmlDisplay += `
    <p><a href='/form.html'>go again</a></p>
    </body>
    </html>
  `;
	res.send(htmlDisplay);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})