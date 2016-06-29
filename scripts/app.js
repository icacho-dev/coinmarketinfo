(function() {

	 var app = angular.module('app', ['datatables','ngAnimate','ngResource','ngSanitize','app.controllers','app.services','app.filters',]);

	 app.config(['$compileProvider', function ($compileProvider) {
			 $compileProvider.debugInfoEnabled(true);
		 }]);

	 app.run(function(DTDefaultOptions) {
			 DTDefaultOptions.setDOM('ip');
		 });

})();