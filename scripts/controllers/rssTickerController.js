(function(angular) {
  'use strict';
  angular.module('myApp.controllers')
  .controller('rssTickerController', [ '$scope', '$timeout', '$q', '$log', 'FeedService' ,
	function($scope, $timeout, $q, $log, FeedService ) {

		$scope.$log = $log;
		$scope.feedSrc = 'http://coinmarketinfo.tk/btcFeed.php';

		$scope.loadFeed;

		callFeed();

		function callFeed() {
			console.log('ini ---- ');

			FeedService.parseFeed($scope.feedSrc).then( function(res) {

				$log.info('res', res);
				$scope.loadFeed = res.data;

      });

		}

		$log.info('rssTickerController -> loaded');
		
		}])
		.factory('FeedService', ['$http', function($http) {
		  return {
		    parseFeed: function(url) {

		      return $http.get(url);
		    }
		  }
		}])
		;
  })(window.angular);