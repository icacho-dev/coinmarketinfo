(function(angular) {
  console.info('myApp loaded');
  'use strict';
  angular.module('myApp', [
    'datatables',
		'ngAnimate',
		// 'datatables.bootstrap',
    'ngResource',
		'ngSanitize',
    'myApp.controllers',
    'myApp.services',
    'myApp.filters',
  ])
  .config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(true);
  }])
  .run(function(DTDefaultOptions) {
    DTDefaultOptions.setDOM('ip');
  });
})(window.angular);