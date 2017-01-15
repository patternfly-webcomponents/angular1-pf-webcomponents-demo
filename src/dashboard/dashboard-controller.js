angular.module('apf.dashboardModule')
  .controller('dashboardController',
    ['$scope', '$timeout', '$interval',
      function ($scope, $timeout, $interval) {
        'use strict';

        activate();

        function activate () {
          //loading / utilization bar chart
          $scope.loading = false;
          $scope.used = 10;

          $interval(function () {
            if ($scope.used > 100) {
              $scope.used = 10;
            } else {
              $scope.used += 10;
            }
          }, 1900);
        }

        $scope.thresholdSet = function (e) {
          //monitor threshold here!
          var threshold = e.detail.threshold;
        };
      }
    ]);