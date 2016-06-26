(function(angular) {
  'use strict';
  angular.module('myApp.services')
  .factory('coinMarketFactory', ['$http', '$q', function($http, $q) {
    var path = ''
    var params = [];
    return {
      getTmpNode : function () {
              return params;
      },
      setTmpNode:function(value){
          // console.log('[01.1]setTmpNode',params);
          return params.push(value);
      },
      getPage: function(pageNumber) {
        // var path = 'https://api.coinmarketcap.com/v1/global/';
        var path = 'https://api.import.io/store/connector/6cc86d93-9a64-4068-b9e2-8dc6c3239bfe/_query?input=webpage/url:http%3A%2F%2Fcoinmarketcap.com%2Fall%2F'+pageNumber+'&&_apikey=1ecdbfaa5b6a4e99b4ac28e155faad363521bf2ee092218e5230734bd9af72c0a58ff2dcaeeefaf76b86d608e507439d2c4a387961de01947a6c9592f4d19bb23b47c25d666d1541bd6e7f892d7ac2c1';
        // var path = 'http://swfideas.com/ilcoin/data-v2.json';
        // console.info('getPage -> params',params);
        return $http.get(path)
        .then(function(response) {
          if (typeof response.data === 'object') {
            //response.data.results.splice(params[0][0]);
            //response.data.results.insert(params[0][0],params[0][1]);
            response.data.results.splice(params[0][0],1,params[0][1]);
            /*if(pageNumber == 1) {
              response.data.results[params[0][0]] = params[0][1];
            }*/
            return response.data.results;
          } else {
            // console.log('invalid response');
            return $q.reject(response.data);
          }
        }, function(response) {
          // console.log('something went wrong');
          return $q.reject(response.data);
        });
      }
    };

  }])
  .factory('dataFactory', ['$http', '$q', function($http, $q) {

    var dataFactory = {};

    dataFactory.getGlobalData = function (url) {
      // console.log('[00.2] dataFactory.getGlobalData');
      return $http.get(url)
      .then(function(response)
      {
        // console.log('[00.3] dataFactory.getGlobalData');
        if (typeof response.data === 'object')
        {
          // console.log('[00.4] dataFactory.getGlobalData',response.data);
          return response.data;
        }
        else
        {
          // console.log('[00.5] dataFactory.getGlobalData');
          return $q.reject(response.data);
        }
      },
      function(response)
      {
        // console.log('[00.6] dataFactory.getGlobalData');
        return $q.reject(response.data);
      });
    };

		dataFactory.getApiData = function (url) {
      // console.log('[00.2] dataFactory.getApiData');
      return $http.get(url)
      .then(function(response)
      {
        // console.log('[00.3] dataFactory.getApiData');
        if (typeof response.data === 'object')
        {
          // console.log('[00.4] dataFactory.getApiData',response.data);
          return response.data;
        }
        else
        {
          // console.log('[00.5] dataFactory.getApiData');
          return $q.reject(response.data);
        }
      },
      function(response)
      {
        // console.log('[00.6] dataFactory.getApiData');
        return $q.reject(response.data);
      });
    };

    dataFactory.getFirstDataSet = function (url) {

      return $http.get(url).then(function(response) {
        if (typeof response.data === 'object') {
          return response.data.results;
        } else {
          return $q.reject(response.data);
        }
      }, function(response) {
        return $q.reject(response.data);
      });
    };

    dataFactory.getPageDataSet = function (page) {
      // console.log('fac:getPageDataSet ->',page);
      return $http.get('https://api.import.io/store/connector/6cc86d93-9a64-4068-b9e2-8dc6c3239bfe/_query?input=webpage/url:http%3A%2F%2Fcoinmarketcap.com%2Fall%2F'+page+      '&&_apikey=1ecdbfaa5b6a4e99b4ac28e155faad363521bf2ee092218e5230734bd9af72c0a58ff2dcaeeefaf76b86d608e507439d2c4a387961de01947a6c9592f4d19bb23b47c25d666d1541bd6e7f892d7ac2c1').then(function(response) {
        if (typeof response.data === 'object') {
          if(page == 1)
            response.data.results.splice(params[0][0],1,params[0][1]);
          return response.data.results;
        } else {
          return $q.reject(response.data);
        }
      }, function(response) {
        return $q.reject(response.data);
      });
    };

      return dataFactory;
   }])
   .service('dataService', function (dataFactory) {

        this.setGlobalData = function() {
          // console.log('[00.0] dataService.setGlobalData');
          return dataFactory.getGlobalData('https://api.coinmarketcap.com/v1/global/');
        }

				this.apiData = function () {
					var url = "http://cors.io/?u=http://coinmarketcap.northpole.ro/api/v5/all.json";
					// console.log('[00.0] dataService.getCurrencyExchangeRates');
          // return dataFactory.getCurrencyExchangeRates('http://blockchain.info/ticker?cors=true');
          return dataFactory.getApiData(url);
				}

        this.firstDataSet = function(gulr) {
               return dataFactory.getFirstDataSet(gulr);
        }

        this.pageDataSet = function(page) {
          // console.log('ser:getPageDataSet ->',page);
          return dataFactory.getPageDataSet(page);
        }

        this.allData = function(data) {

            // var active_assets = data.active_assets;
            // var active_currencies = data.active_currencies;
            // var length = active_assets + active_currencies;
            // var lPage = Math.ceil(length/100);
            //
            // var defer = $q.defer();
            // var promises = [];
            //
            // angular.forEach(resources, function(value) {
            //     promises.push(MyApi.details(resources[i].key));
            // });
            // for (var i=1; i<lPage; i++) {
            //   promises.push(i);
            // }
            //
            // $q.all(promises).then(function() {
            //     $scope.total = $scope.results.reduce(function(a, b) { return a + b; }, 0);
            // })
            //
            // // console.log('allData');
            return dataFactory.getPageDataSet(data);
        }

    });
})(window.angular);