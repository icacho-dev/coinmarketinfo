angular
.module('app.controllers')
.controller('coinMarketController', [
  '$scope','$resource', '$filter', '$timeout', '$q' ,
  'DTOptionsBuilder', 'DTColumnBuilder', 'coinMarketFactory','dataService',
  function($scope, $resource, $filter, $timeout, $q ,
    DTOptionsBuilder, DTColumnBuilder, coinMarketFactory, dataService) {

      $scope.status;
      $scope.ilcoinTmp;
      $scope.ilcoinTmpIndex;
      $scope.pageNumber = 1;
      $scope.pageLength = 100;
      $scope.totalEl = 100;

      dataService.setGlobalData().then(function(result){

        $scope.globalData = result;
        $scope.globalData.tCoins = $scope.globalData.active_currencies + $scope.globalData.active_assets;
        $scope.globalData.tPages = Math.ceil($scope.globalData.tCoins/$scope.totalEl);

      });

      $scope.ilcoinTmpParams = setTempNode();


      initTable(this);

      function initTable(vm) {
        //var vm = this;
        vm.authorized = false;
        vm.dtInstance = {};
        vm.dtOptions = DTOptionsBuilder.fromFnPromise(
          coinMarketFactory.getPage(1)
        )
        .withOption('responsive', true)
        .withOption('sDom', '<"toolbar">rt<"bottom"i><"clear">')
        .withOption('pageLength', $scope.pageLength)
        .withOption('authorized', true)
        ;

        vm.dtColumns = [
          DTColumnBuilder.newColumn('number/_source').withTitle('#'),
          DTColumnBuilder.newColumn('name_link/_text').withTitle('Name').renderWith(imgCellLabel).withClass('font-bold'),
          DTColumnBuilder.newColumn('marketcap_price/_source').withTitle('Market Cap').withClass('no-wrap text-right').withOption('defaultContent', defaultValue()),
          DTColumnBuilder.newColumn('price_link/_text').withTitle('Price').withClass('no-wrap text-right text-bold').withOption('defaultContent', defaultValue()),
          DTColumnBuilder.newColumn('available_link/_text').withTitle('Avaiable Supply').withClass('no-wrap text-right').withOption('defaultContent', defaultValue()),
          DTColumnBuilder.newColumn('volume24h_link/_text').withTitle('Volume (24h)').withClass('no-wrap text-right').withOption('defaultContent', defaultValue()),
          DTColumnBuilder.newColumn('change24h_value').withTitle('% Change (24h)').renderWith(percentLabel).withClass('no-wrap text-right').withOption('defaultContent', defaultValue()),
          DTColumnBuilder.newColumn('pricegraph7d_image').withTitle('Price Graph (7d)').renderWith(imgCellGraph).withClass('no-wrap').notSortable(),
        ];

        vm.newPromise = newPromise;
        vm.reloadData = reloadData;
        vm.nextPage = nextPage;
        vm.previousPage = previousPage;
        vm.dtInstance = {};

        function reloadData() {
          console.info('vm -> reloadData');
          var resetPaging = true;
          vm.dtInstance.reloadData(callback, resetPaging);
        };

        function callback(json) {
          console.info('vm -> callback');
          console.log(json);
        };

        function newPromise() {
          console.info('vm -> newPromise');
          return coinMarketFactory.getPage($scope.pageNumber+1);//$resource(coinMarketFactory.getPage($scope.pageNumber+1)).query().$promise;
        };

        function nextPage () {
          vm.dtInstance.changeData(dataService.pageDataSet(++$scope.pageNumber));
          vm.dtInstance.rerender();
        };

        function previousPage () {
          if($scope.pageNumber == 2)
          vm.dtInstance.changeData(coinMarketFactory.getPage(--$scope.pageNumber));
          else
          vm.dtInstance.changeData(dataService.pageDataSet(--$scope.pageNumber));

          vm.dtInstance.rerender();
        };

      }



      // -------------------------------------------------
      function setTempNode() {
        console.log('[01] setTempNode');
        $scope.ilcoinTmpIndex = getRandomInt(5,15);
        $scope.ilcoinTmp = {
          "marketcap_price/_currency": "USD",
          "available_link_numbers/_source": "1,588,553,542",
          "marketcap_price/_source": "$ 1,588,553,542",
          "number": $scope.ilcoinTmpIndex + 1,
          "name_link/_text": "ILCoin",
          "name_link/_source": "/currencies/ilcoin/",
          "number/_source": ($scope.ilcoinTmpIndex + 1).toString(),
          "price_link/_source": "/currencies/ilcoin/#markets",
          "available_link": "http://dogechain.info/chain/ILCoin",
          "name_image/_source": "/static/img/coins/16x16/ilcoin.png",
          "price_link/_text": "$ 0.635421417",
          "pricegraph7d_link/_source": "/currencies/ilcoin/#charts",
          "available_link/_text": "2,500,000,000 ILC",
          "volume24h_link": "http://coinmarketcap.com/currencies/ilcoin/#markets",
          "name_link": "http://coinmarketcap.com/currencies/ilcoin/",
          "name_image": "http://coinmarketcap.com/static/img/coins/16x16/ilcoin.png",
          "marketcap_price": 0.635421417,
          "name_image/_alt": "ILCoin",
          "available_link_numbers": 2500000000,
          "pricegraph7d_image/_alt": "sparkline",
          "volume24h_link/_text": "$ 1,592,390",
          "pricegraph7d_link": "http://coinmarketcap.com/currencies/ilcoin/#charts",
          "price_link": "http://coinmarketcap.com/currencies/ilcoin/#markets",
          "pricegraph7d_image": "https://files.coinmarketcap.com/generated/sparklines/74.png",
          "volume24h_link/_source": "/currencies/ilcoin/#markets",
          "change24h_value": "15.60 %"
        };
        coinMarketFactory.setTmpNode([$scope.ilcoinTmpIndex,$scope.ilcoinTmp]);
        return coinMarketFactory.getTmpNode;
      };

      // function setGlobalData (){
      //   console.log('[00] setGlobalData');
      //   return dataService.setGlobalData('https://api.coinmarketcap.com/v1/global/');
      // };

      function imgCellGraph(data, type, full, meta) {
        var path = full['pricegraph7d_image'];
        return '<img class="sparkline" alt="sparkline" src="'+path+'">';
      };

      function percentLabel(data, type, full, meta) {
        var result = ( parseFloat(data) > 0 )? "pct-positive" : "pct-negative";
        var htmlStr = "<span class='"+result+"'>"+data+"</span>";
        return htmlStr ;
      };

      function defaultValue() {
        var htmlStr = "<p class='text-center text-muted'> ? </p>";
        return htmlStr ;
      };

      function imgCellLabel(data, type, full, meta) {
        var path = full['name_image/_source'];
        console.info('full',full);
        return '<img src=".'+ path +'" alt="' + full['name_image/_alt'] + '-logo" class="currency-logo"/>' + ' ' + data;
      };

      function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };

    }]);