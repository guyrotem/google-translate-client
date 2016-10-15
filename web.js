var express = require('express');

function serveDistFolder(port) {
  var app = express();
  app.use('/statics', express.static(__dirname + '/dist'));
  app.listen(port);
}

serveDistFolder(process.env.PORT);
