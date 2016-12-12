var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('test:test@ds119568.mlab.com:19568/jul');
var bodyParser = require('body-parser');
var path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use(cookieParser());
app.set('case sensitive routing', true);

app.get('/api/users', function (req, res) {
    if (req.cookies.user !== undefined) {
        var db = req.db;
        var collection = db.get('users');
        collection.find({}, 'username', function () {
        }).then(function (users) {
            res.send(users);
        });
    } else {
        res.status(401).send();
    }
});

app.post('/api/login', function (req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.findOne({"username": req.body.username}, {}, function () {
    }).then(function (user) {
        if (user !== null && user.password === req.body.password) {
            res.cookie("user", req.body.username).redirect("/qwerasdfzxcv.html");
        } else if (user === null) {
            collection.insert({"username": req.body.username, "password": req.body.password})
            res.cookie("user", req.body.username).redirect("/qwerasdfzxcv.html");
        } else {
            res.redirect("/loginFailz.html");
        }
    });
});

app.get('/api/secretInformationForGrinchOnly', function (req, res) {
    if (req.header("secretHidden") === "false") {
        res.send({
            "name": "Mad Grinch",
            "secret": "Ferdig, lenke videre til neste oppgave e.l."
        });
    } else if (req.cookies.user === "Grinch") {
        res.send({
            "name": "Grinch",
            "howMySecretIsProtected": "header secretHidden=false"
        });
    } else {
        res.status(401).send();
    }
});

app.get('/HA1L', function (req, res) {
    if (req.query.harTilgang === "true") {
        res.redirect("/qwerasdfzxcv.html")
    } else if (req.query.harTilgang !== "false") {
        res.redirect("/HA1L?harTilgang=false")
    } else {
        res.sendFile(path.resolve("public/zoon.html"));
        // res.send('Hurra, du er på riktig spor, men det mangler noe');
    }
});


app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});