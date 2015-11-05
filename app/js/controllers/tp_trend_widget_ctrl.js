;(function () {
  'use strict';

  var controllersModule = require('./_index');

  /**
   * @ngInject
   * @constructor TpTrendWidgetCtrl
   * @desc Trend Widget Controller
   * @param {Object} $scope - The angular $scope object
   * @param {Object} WidgetDataService - service to fetch widget data from API
   */
  function TpTrendWidgetCtrl($scope, WidgetDataService) {
    /*** Private properties ***************************************************/
    var widget = this;
    var attrs  = $scope.$parent.widgetAttrs;
    var bId = attrs.businessunitId;

    /*** Public scope properties **********************************************/
    // placeholder for totalRatings
    widget.totalRatings = null;
    // defaultRating defaults to parent directive default-rating attr
    widget.defaultRating = attrs.defaultRating;
    // placeholder for star ratings values and defaults used in gauge
    widget.starRatings = {
      1   : { value : 0, label : 'Bad',       color : '#C1222F' },
      2   : { value : 0, label : 'Poor',      color : '#E26B2F' },
      3   : { value : 0, label : 'Average',   color : '#E6C323' },
      4   : { value : 0, label : 'Good',      color : '#64933E' },
      5   : { value : 0, label : 'Excellent', color : '#3CA847' }
    };
    // placeholder for gauge data
    widget.gauge_data = [];
    // placeholder for gauge options with defaults
    widget.gauge_options = {
      thickness: 10,
      mode: "gauge",
      total: 100
    };

    /*** Logic ****************************************************************/
    // get review data from api and wait for result
    WidgetDataService.getReviews(bId).then(function (data){
      // construct when data retrieved
      _construct.call(widget, data);
      // set gauge based on default rating
      widget.setGauge(widget.defaultRating);
    }, function (error) {
      // error stuff, for now just a console log
      console.log("get reviews data failed: ", error);
    });
  } // end TpTrendWidgetCtrl

  /*** Private methods ********************************************************/

  /**
   * @method _construct
   * @desc constructor method for TpTrendWidgetCtrl
   * @param {Array} data - review data from api
   * @private
   */
  var _construct = function (data) {
    var widget = this;
    // validate data type
    if (! data instanceof Array) {
      // wrong data stuff, for now just a log
      console.log("wrong review data");
      // break
      return;
    }
    // set number of total ratings
    widget.totalRatings = data.length;
    // process and add data to starRatings value placeholders
    angular.forEach(data, function (obj) {
      // reference the reviews object in data array
      var rating = obj.starRating;
      // if key is string number 1 - 5
      if (widget.starRatings[rating] !== undefined) {
        // increment
        widget.starRatings[rating].value++;
      } else {
        // wrong starRating value stuff, for now just a log
        console.log("Wrong rating value: ", key);
      }
    });
  };

  /*** Public Methods *********************************************************/
  /**
   * @method setGauge
   * @desc Set the gauge pie-chart data based on starRatings key index
   * @param {Number} selectedStarIndex - int from 1 - 5
   */
  TpTrendWidgetCtrl.prototype.setGauge = function (selectedStarIndex) {
    var widget = this;
    // reference data from the selected starRatings object based on key index
    var data = widget.starRatings[selectedStarIndex];
    // set gauge data based on starRatings data
    widget.gauge_data[0] = {
      label : '"' + data.label +'"',
      value : ((data.value / widget.totalRatings) * 100).toFixed(1),
      suffix : "%", // static property, but needs to be set
      color : data.color,
      colorComplement : '#E7E7E7' // static property, but needs to be set
    };
  };

  controllersModule.controller('TpTrendWidgetCtrl', TpTrendWidgetCtrl);

})();