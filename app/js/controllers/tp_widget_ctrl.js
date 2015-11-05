;(function () {
  'use strict';

  var controllersModule = require('./_index');

  /**
   * @ngInject
   * @constructor TpWidgetCtrl
   * @desc Controller for demo widget directive that simulates a TrustBox
   */
  function TpWidgetCtrl() {

    var widget = this;

  }

  controllersModule.controller('TpWidgetCtrl', TpWidgetCtrl);

})();