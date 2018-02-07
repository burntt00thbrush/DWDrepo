var express = require('express')
var app = express()

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var count = 0;

var submissions = [];

app.get('/somethingelse', function (req, res) {
	count++;
  res.send('<html><body><h1>Something Else' + count + '</h1></body></html>')
})
// what is /something else?

app.get('/formpost', function (req, res) {
	console.log("They submitted: " + req.query.textfield);
	var htmlFormPost = `
  <html>
    <head>
    <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body><h3>thank you!</h3>
    <p>you submitted
  `
  + req.query.textfield +
  ` </p>
    <p><a href='/display'>see all</a></p>
    </body>
  </html>
  `;
  res.send(htmlFormPost);
  // save into an array
submissions.push(req.query.textfield);
	res.send("You submitted: " + req.query.textfield);
	submissions.push(req.query.textfield);
})

app.get('/display', function(req, res) {
	var html = "<html><body>";
	for (var i = 0; i < submissions.length; i++) {
		html = html + submissions[i] + "<br>";
	}
	html = html + "</body></html>";
	res.send(html);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})