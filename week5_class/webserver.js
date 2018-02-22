var express = require('express')
var app = express()
var cors = require('cors')

app.use(express.static('public'));
app.use(cors());




app.get("/ajaxtest", function(req, res){

res.send("/ajaxtest.html");

})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(9090, function () {
  console.log('Example app listening on port 3000!')
})
