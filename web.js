var express = require('express');

function serveDistFolder(port) {
  var app = express();
  app.use(express.static('/statics', __dirname + '/dist'));
  app.listen(port);
}

serveDistFolder(process.env.PORT || 5000);
