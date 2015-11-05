;(function () {
  'use strict';

  var directivesModule = require('./_index.js');

  /**
   * @ngInject
   * @name tpWidget
   * @desc parent widget directive that binds attributes to scope, and appends
   * selected widget based on templateId attribute
   */
  function tpWidget() {

    return {
      restrict: 'A',
      // restrict scope to valid attributes
      scope: {},
      bindToController : {
        // set widget properties one way data binding
        locale : '@',
        businessunitId : '@', // json data
        theme : '@',
        defaultRating : '@'
      },
      controller : 'TpWidgetCtrl as widgetAttrs',
      template : function ($element, $attrs) {
        var templateId = $attrs.templateId;
        var directive = angular.element('<div ' + templateId + '/>');
        $element.append(directive);
      }
    };

  }

  directivesModule.directive('tpWidget', tpWidget);

})();