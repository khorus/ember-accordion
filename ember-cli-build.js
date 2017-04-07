/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    // Add options here
  });

  app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.css');
  app.import(app.bowerDirectory + '/fontawesome/css/font-awesome.min.css');

  var extraAssets = pickFiles(app.bowerDirectory + '/fontawesome', {
      srcDir: '/',
      files: ['**/*.woff', '**/*.eot', '**/*.svg', '**/*.ttf'],
      destDir: '/'
  });

  return mergeTrees([app.toTree(), extraAssets]);
};
