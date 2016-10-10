var gzippo = require('gzippo');
var express = require('express');
var request = require('request');
var app = express();

// app.use(express.logger('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

// var target = 'http://localhost:9333';
var target = 'https://google-translate-proxy.herokuapp.com';

app.get("/api/languages", function (req, res) {
  // req.pipe(request(target + '/languages')).pipe(res);
  res.redirect(target + '/languages');
});

app.post("/api/translate", function (req, res) {
  req.pipe(request(target + '/translate')).pipe(res);
});
app.listen(process.env.PORT || 5000);
