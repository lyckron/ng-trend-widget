;(function () {
  'use strict';

  var directivesModule = require('./_index.js');

  /**
   * @ngInject
   * @name tpTrendWidget
   * @desc Trend Widget Directive
   */
  function tpTrendWidget() {
    return {
      restrict: 'A',
      scope: true, // inherit from parent
      controller: 'TpTrendWidgetCtrl as widget',
      bindToController : true,
      templateUrl: 'tp_trend_widget.tpl.html',
      link: function($scope) {

        /**
         * @name widget
         * @desc reference to the TpTrendWidgetCtrl in scope
         * @type {Object} $scope.widget
         */
        var widget = $scope.widget;

        /**
         * @name selectedStarIndex
         * @desc index of clicked star tab, defaults to widget.defaultRating - 1
         * @type {Number}
         */
        $scope.selectedStarIndex = widget.defaultRating - 1;

        /**
         * @name selectedStarTab
         * @desc set scope selectedStarIndex to list index from click event
         * and call widget setGauge fn based on index
         * @param {Number} $index - list index from ng-repeat
         */
        $scope.selectedStarTab = function ($index) {

          $scope.selectedStarIndex = $index;

          widget.setGauge($index + 1);

        };
      }
    };

  }

  directivesModule.directive('tpTrendWidget', tpTrendWidget);

})();