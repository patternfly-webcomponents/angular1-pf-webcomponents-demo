
angular.module( 'apf.preferencesModule',
  [])
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/preferences', {
        templateUrl: 'src/preferences/preferences.html',
        controller: 'preferencesController'
      });
  }]);
