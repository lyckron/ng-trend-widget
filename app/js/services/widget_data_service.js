;(function () {
  'use strict';

  var servicesModule = require('./_index.js');

  /**
   * @ngInject
   * @constructor WidgetDataService
   * @decs handles widget data from api
   * @param {Object} $q - service that helps you run functions asynchronously
   * @param {Object} $http - core Angular service that facilitates communication
   * with the remote HTTP servers
   * @param {Object} AppSettings - app settings constant
   * @param {String} AppSettings.reviewsApi - url to reviews data api
   */
  function WidgetDataService($q, $http, AppSettings) {

    var service = {};

    /**
     * @method getReviews
     * @desc get specific review data based on id
     * @param {String} id - id of review data to fetch
     * @returns {*}
     */
    service.getReviews = function(id) {
      var deferred = $q.defer();

      $http.get(AppSettings.reviewsApi + '/' + id).success(function(data) {
        deferred.resolve(data);
      }).error(function(err, status) {
        deferred.reject(err, status);
      });

      return deferred.promise;
    };

    return service;

  }

  servicesModule.service('WidgetDataService', WidgetDataService);

})();