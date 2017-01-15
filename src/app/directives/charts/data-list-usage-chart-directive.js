angular.module('apf.charts').directive('inlineUsageChart', ['c3ChartDefaults', '$timeout',
  function (c3ChartDefaults, $timeout) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        config: '=',
        data: '=',
        usageTitle: '=',
        iconContent: '=',
        iconClass: '=',
        chartId: '@'
      },
      replace: true,
      templateUrl: 'src/app/directives/charts/data-list-usage-chart.html',
      controller: ['$scope',
        function ($scope) {

          var donutTooltip = {
            contents: function (d) {
              return '<span class="c3-tooltip-sparkline" style="white-space: nowrap;">' + Math.round(d[0].ratio * 100) + '%:</span>' + '<span class="c3-tooltip-sparkline" style="white-space: nowrap;">' + d[0].value + ' ' + $scope.config.units + ' ' + d[0].name + '</span>';
            }
          };

          $scope.donutChartId = 'donutChart';
          if ($scope.chartId) {
            $scope.donutChartId = $scope.chartId + "-" + $scope.donutChartId;
          }
          $scope.getStatusColor = function (used) {
            var statusColor;
            if (used >= 90.0) {
              statusColor = '#CC0000';
            } else if (used >= 75.0) {
              statusColor = '#EC7A08';
            } else {
              statusColor = '#0088CE';
            }
            return statusColor;
          };
          $scope.statusDonutColor = function (scope) {
            var color = {
              pattern: []
            };
            var percentUsed = scope.data.used / scope.data.total * 100.0;
            color.pattern[0] = scope.getStatusColor(percentUsed);
            color.pattern[1] = '#D1D1D1';
            return color;
          };
          $scope.getDonutData = function (scope) {
            if ($scope.data.available === undefined) {
              $scope.data.available = $scope.data.total - $scope.data.used;
            }
            return {
              columns: [
                ['Used', scope.data.used],
                ['Available', scope.data.available]
              ],
              type: 'donut',
              donut: {
                label: {
                  show: false
                }
              },
              groups: [
                ['used', 'available']
              ],
              order: null
            };
          };
          $scope.defaultDonutConfig = c3ChartDefaults.getDefaultDonutConfig($scope.config.units);
          $scope.defaultDonutConfig.color = $scope.statusDonutColor($scope);
          $scope.defaultDonutConfig.tooltip = donutTooltip;
          $scope.config.donutConfig = $.extend(true, angular.copy($scope.defaultDonutConfig), $scope.config.donutConfig);
          $scope.config.donutConfig.data = $scope.getDonutData($scope);
        }],
      link: function (scope, element, attrs) {
        var setupDonutChartTitle = function () {
          $timeout(function () {
            var donutChartTitle = element[0].querySelector('text.c3-chart-arcs-title');
            if (donutChartTitle) {
              donutChartTitle.innerHTML = '<tspan dy="5" x="0" class="inline-utilization-chart-title fa pficon ' + scope.iconClass + '">' +
                scope.iconContent +
                '</tspan>';
            }
          }, 100);
        };
        scope.$watch('config', function () {
          scope.config.donutConfig = $.extend(true, angular.copy(scope.defaultDonutConfig), scope.config.donutConfig);
          setupDonutChartTitle();
        }, true);

        scope.$watch('data', function () {
          scope.config.donutConfig.data = scope.getDonutData(scope);
          setupDonutChartTitle();
        }, true);
      }
    };
  }]);
