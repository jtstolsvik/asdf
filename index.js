var express = require('express');
var app = express();

app.get('/api/test', function (req, res) {
    console.log(req);
    console.log(req.header("test"));
    console.log(req.signedCookies);
    res.cookie("test", "ok");
    res.send('Hello World!');
});

app.use(express.static(__dirname + '/public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});