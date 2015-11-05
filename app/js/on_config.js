'use strict';

/**
 * @ngInject
 */
function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('WidgetLayout', {
    url: '/',
    controller: 'WidgetLayoutCtrl as layout',
    templateUrl: 'widget_layout.tpl.html',
    title: 'Widget Layout'
  });

  $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;