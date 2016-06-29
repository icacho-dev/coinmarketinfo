(function(angular) {
  'use strict';
  angular.module('myApp.controllers')
  .controller('rssTickerController', [ '$scope', '$timeout', '$q', '$log', 'FeedService' ,
	function($scope, $timeout, $q, $log, FeedService ) {

		$scope.$log = $log;
		$scope.feedSrc = '/btcFeed.php';
    $scope.loadFeed;

    $log.info('rssTickerController -> loaded');

		callFeed();

		function callFeed() {
			console.log('ini ---- ');

			FeedService.parseFeed($scope.feedSrc).then( function(res) {

				$log.info('rssTickerController.FeedService.parseFeed ->', res);
				$scope.loadFeed = res.data;

      });

		}

		}])
		.factory('FeedService', ['$http', function($http) {
		  return {
		    parseFeed: function(url) {

          return $http.get(url);

        }
		  }
		}])
    .filter('fromNow', function() {
      return function(date) {
        return moment(date).fromNow();
      }
    })
		;
  })(window.angular);