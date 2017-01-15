angular.module('apf.preferencesModule')
  .controller('preferencesController',
  ['$scope', '$timeout', '$interval',
    function ($scope, $timeout, $interval) {
      'use strict';

      activate();

      function activate () {
        //switch plugin
        $("#push-notification-switch").bootstrapSwitch();

        //tabs
        $scope.tabOne = {active: true, title: 'User Settings'};
        $scope.tabTwo = {active: false, title: 'Notification Settings'};

        //success alert
        $scope.successAlertVisible = false;
        $scope.isPersistent = true;

        //tooltip text binding
        $scope.firstNameTooltipText = "Your first name";
      }

      $scope.nextBtnClick = function () {
        $scope.tabOne.active = false;
        $scope.tabTwo.active = true;
      };

      $scope.cancelBtnClick = function () {
        $scope.tabOne.active = true;
        $scope.tabTwo.active = false;
        $scope.successAlertVisible = false;
      };

      $scope.saveBtnClick = function () {
        $scope.successAlertVisible = true;
      };

      $scope.tabChanged = function (ev) {
        alert('holy guacamole! Active tab is now:' + ev.detail);
      };
    }
  ]);