(function(angular) {
  'use strict';
  angular.module('myApp.controllers')
  .controller('coinTickerController', [ '$scope', '$interval', '$q', '$log', 'CoinDataService',
	function($scope, $interval, $q, $log, CoinDataService ) {

		$scope.$log = $log;
		$scope.feedSrc = '/btcFeed.php';

		$scope.data = null;
		$scope.btc = null;
		$scope.cny = null;

		CoinDataService.all('http://coinmarketcap.northpole.ro/api/v5/BTC.json').success(function (data) {
			console.log('CoinDataService -> firstCall', data);
			$scope.data = data;
		});

		CoinDataService.all('https://api.coinmarketcap.com/v1/ticker/bitcoin/').success(function (data) {
			console.log('CoinDataService -> firstCall', data);
			$scope.btc = data[0];
		});

		CoinDataService.all('https://api.coinmarketcap.com/v1/ticker/bitcny/').success(function (data) {
			console.log('CoinDataService -> firstCall', data);
			$scope.cny = data[0];
		});




		$interval(function () {

			CoinDataService.all('http://coinmarketcap.northpole.ro/api/v5/BTC.json').success(function (data) {
				console.log('CoinDataService -> call', data);
				$scope.data = data;
			});

		}, 20000);

		$interval(function () {

			CoinDataService.all('https://api.coinmarketcap.com/v1/ticker/bitcoin/').success(function (data) {
				console.log('CoinDataService -> firstCall', data);
				$scope.btc = data[0];
			});

		}, 30000);

		}])
		.service('CoinDataService', [
			'$http', '$interval',
			function($http, $interval) {

				var btcUrl = 'https://api.coinmarketcap.com/v1/ticker/bitcoin/';
				var coinUrl = 'http://coinmarketcap.northpole.ro/api/v5/BTC.json';
				var prefixUrl = 'http://cors.io?u=';

				function all(url) {
			    return $http({
			      url: prefixUrl + url,
			      method: 'GET'
			    });
			  }

			  return {
					all: all
			  }

		}])
		;
  })(window.angular);