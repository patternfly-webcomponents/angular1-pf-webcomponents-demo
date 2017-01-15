angular.module ('apf.appModule', [
  'ngResource',
  'ngRoute',
  'ui.bootstrap',
  'pascalprecht.translate',
  'patternfly',
  'patternfly.toolbars',
  'patternfly.charts',
  'patternfly.webcomponents',
  'apf.util',
  'apf.charts',
  'apf.card',
  'apf.dashboardModule',
  'apf.cloudsModule',
  'apf.containersModule',
  'apf.infrastructureModule',
  'apf.applicationsModule',
  'apf.preferencesModule',
  'apf.reportsModule',
  'apf.adminModule'
]).config(['$routeProvider', '$translateProvider',
  function ($routeProvider, $translateProvider) {
    'use strict';

    $routeProvider
      .when('/', {
        redirectTo: '/dashboard'
      })
      .when('/dashboard', {
        templateUrl: 'src/dashboard/dashboard.html',
        controller: 'dashboardController'
      })

      // Default
      .otherwise({
      });

    $translateProvider.translations('default', 'en');
    $translateProvider.preferredLanguage('default');
  }
]);
