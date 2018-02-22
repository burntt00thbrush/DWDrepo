var express = require('express')
var app = express()

app.use(express.static('public'));


app.get("/ajaxtest", function(req, res){

res.send("/ajaxtest.html");

})

app.listen(9090, function () {
  console.log('Example app listening on port 3000!')
})
