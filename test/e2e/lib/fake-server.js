'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');

let app = express();
app.use(bodyParser.json());
app.use(session({
  secret: 'yoba',
  cookie: {httpOnly: false},
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', 0);
  return next();
});

let storage = {};
app.route('/server-artifact-id/resource')
  .get((req, res) => {
    res.send({resources: storage[req.sessionID] || []});
  })
  .post((req, res) => {
    let data = storage[req.sessionID] || [];
    storage[req.sessionID] = data.concat([req.body]);
    res.send({});
  });

app.listen(process.argv[2] || 3000);
console.log('listening...');
