/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('bower_components/fontawesome/css/font-awesome.min.css');

  var extraAssets = pickFiles('bower_components/fontawesome', {
      srcDir: '/',
      files: ['**/*.woff', '**/*.eot', '**/*.svg', '**/*.ttf'],
      destDir: '/'
  });

  return mergeTrees([app.toTree(), extraAssets]);
};
