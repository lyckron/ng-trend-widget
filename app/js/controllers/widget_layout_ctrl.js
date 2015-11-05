;(function () {
  'use strict';

  var controllersModule = require('./_index');

  /**
   * @ngInject
   * @constructor WidgetLayoutCtrl
   * @desc Just a demo layout controller for widget presentation
   */
  function WidgetLayoutCtrl() {

    // ViewModel
    var layout = this;

    layout.title = 'Angular Trend widget';

  }

  controllersModule.controller('WidgetLayoutCtrl', WidgetLayoutCtrl);

})();