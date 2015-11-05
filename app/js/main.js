'use strict';

var angular = require('angular');

// dependencies
require('d3');

// angular modules
require('angular-ui-router');
require('./templates');
require('./lib/pie-chart.js'); // https://github.com/n3-charts/pie-chart
require('./controllers/_index');
require('./services/_index');
require('./directives/_index');

// create and bootstrap application
angular.element(document).ready(function() {

  var requires = [
    'n3-pie-chart',
    'ui.router',
    'templates',
    'app.controllers',
    'app.services',
    'app.directives'
  ];

  // mount on window for testing
  window.app = angular.module('app', requires);

  angular.module('app').constant('AppSettings', require('./constants'));

  angular.module('app').config(require('./on_config'));

  angular.module('app').run(require('./on_run'));

  angular.bootstrap(document, ['app']);

});