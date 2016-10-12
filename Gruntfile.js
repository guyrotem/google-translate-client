// Generated on 2016-10-03 using generator-wix-angular 1.0.243
'use strict';

module.exports = function (grunt) {
  require('wix-gruntfile')(grunt, {
    version: '1.0.243',
    port: 5000,
    livereload: 35729,
    preloadModule: 'googleTranslate1xPreload',
    karmaConf: require('./karma.conf.js'),
    protractor: false
  });

  var translationServerProxySettings = require('./proxy-settings.json').translationServer;

  grunt.registerTask('run', ['serve:verbose']);

  grunt.modifyTask('yeoman', {
    //this is the node.js fake server that e2e tests will use
    e2eTestServer: 'http://localhost:3333/',

    //the address that opens in your browser in grunt serve
    //(domain should be the same as staging so cookies will be sent in api requests)
    local: 'http://localhost:<%= connect.options.port %>/'
  });

  grunt.modifyTask('connect', function () {
    function proxyFolder(src, dest) {
      var url = require('url');
      var proxyOptions = url.parse(grunt.template.process(dest));
      proxyOptions.route = src;
      return require('proxy-middleware')(proxyOptions);
    }

    var originalMiddleware = this.livereload.options.middleware.bind(this);
    var nextProxy = proxyFolder(translationServerProxySettings.proxyPath, translationServerProxySettings.serverUrl);
    this.livereload.options.middleware = function (connect) {
      var middlewareResult = originalMiddleware(connect);
      middlewareResult.push(nextProxy);
      return middlewareResult;
    };
  });

  //override sauce labs browser list
  //process.env.SAUCE_BROWSERS = 'Chrome FF';

  //Follow this URL for instructions on how to override built-in definitions:
  //https://github.com/wix/wix-gruntfile/blob/master/README.md
};
