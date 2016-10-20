var express = require('express');

function serveDistFolder(port) {
  var app = express();
  app.use('/statics', express.static(__dirname + '/dist'));
  app.listen(port);
}
console.info('Starting client at port ' + process.env.PORT);
serveDistFolder(process.env.PORT);
