var gzippo = require('gzippo');
var express = require('express');
var request = require('request');
var app = express();

// app.use(express.logger('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

// var target = 'http://localhost:9333';
var target = 'https://google-translate-proxy.herokuapp.com';

app.get("/api/languages", function (req, res) {
  res.redirect(target + '/languages');
});

app.post("/api/translate", function (req, res) {
  var url = target + '/translate';
  req.pipe(request(url)).pipe(res);
});
app.listen(process.env.PORT || 5000);
