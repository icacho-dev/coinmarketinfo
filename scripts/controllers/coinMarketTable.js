angular.module('app.controllers')
.controller('coinMarketTable', [
  '$scope','$resource', '$filter', '$timeout', '$q' ,
  'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 'coinMarketFactory','dataService',
  function($scope, $resource, $filter, $timeout, $q ,
    DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, coinMarketFactory, dataService) {

    $scope.status;
    $scope.ilcoinTmp;
    $scope.calculated;
    $scope.ilcoinTmpIndex;
    $scope.pageNumber = 1;
    $scope.pageLength = 100;
    $scope.totalEl = 100;
    $scope.apiData;
    $scope.globalData;
    $scope.customCu=[];

    //$scope.globalData = setGlobalData();
    dataService.setGlobalData().then(function(result){

      $scope.globalData = result;
      $scope.globalData.tCoins = $scope.globalData.active_currencies + $scope.globalData.active_assets;
      $scope.globalData.tPages = Math.ceil($scope.globalData.tCoins/$scope.totalEl);

    });

    dataService.apiData().then(function(result){

      $scope.apiData = result;

      var options = {
        target: 'td.price',
        change: true,
        base:   'usd',
        symbols: {
          "usd" : "$",
          "jpy" : "¥",
          "cny" : "¥",
          "sgd" : "$",
          "hkd" : "$",
          "cad" : "$",
          "nzd" : "$",
          "aud" : "$",
          "clp" : "$",
          "gbp" : "£",
          "dkk" : "kr",
          "sek" : "kr",
          "isk" : "kr",
          "chf" : "CHF",
          "brl" : "R$",
          "eur" : "€",
          "rub" : "₽",
          "pln" : "zł",
          "thb" : "฿",
          "krw" : "₩",
          "twd" : "NT$",
          "USD" : "$",
          "JPY" : "¥",
          "CNY" : "¥",
          "SGD" : "$",
          "HKD" : "$",
          "CAD" : "$",
          "NZD" : "$",
          "AUD" : "$",
          "CLP" : "$",
          "GBP" : "£",
          "DKK" : "kr",
          "SEK" : "kr",
          "ISK" : "kr",
          "CHF" : "CHF",
          "BRL" : "R$",
          "EUR" : "€",
          "RUB" : "₽",
          "PLN" : "zł",
          "THB" : "฿",
          "KRW" : "₩",
          "TWD" : "NT$"
        }
      };
      // $scope.apiData.currencyExchangeRates
      angular.forEach($scope.apiData.currencyExchangeRates,
      function (values, key){
        var k = key.toUpperCase();

        $scope.customCu[k] = values;

        // console.log('customCurrency',options);

      });

      options.customCurrency = $scope.customCu;
      // console.info("options.customCurrency -> ",options.customCurrency);
      angular.element('.curry-1').curry(options);

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
      // .withBootstrap()
      ;

      vm.dtColumns = [
        DTColumnBuilder.newColumn('number/_source').withTitle('#'),
        DTColumnBuilder.newColumn('name_link/_text').withTitle('Name').renderWith(imgCellLabel).withClass('font-bold'),
        DTColumnBuilder.newColumn('marketcap_price').withTitle('Market Cap').withClass('no-wrap text-right price').renderWith(valCol).withOption('defaultContent', defaultValue()),
        DTColumnBuilder.newColumn('price_link/_text').withTitle('Price (USD)').withClass('no-wrap text-right text-bold price').renderWith(valCol).withOption('defaultContent', defaultValue()),
        DTColumnBuilder.newColumn('available_link/_text').withTitle('Avaiable Supply').withClass('no-wrap text-right').withOption('defaultContent', defaultValue()),
        DTColumnBuilder.newColumn('volume24h_link/_text').withTitle('Volume (24h)').withClass('no-wrap text-right price').renderWith(valCol).withOption('defaultContent', defaultValue()),
        DTColumnBuilder.newColumn('change24h_value').withTitle('% Change (24h)').renderWith(percentLabel).withClass('no-wrap text-right').withOption('defaultContent', defaultValue()),
        DTColumnBuilder.newColumn('pricegraph7d_image').withTitle('Price Graph (7d)').renderWith(imgCellGraph).withClass('no-wrap all').notSortable(),
      ];

      vm.newPromise = newPromise;
      vm.reloadData = reloadData;
      vm.nextPage = nextPage;
      vm.previousPage = previousPage;
      vm.dtInstance = {};

      function reloadData() {
        // console.info('vm -> reloadData');
        var resetPaging = true;
        vm.dtInstance.reloadData(callback, resetPaging);
      };

      function callback(json) {
        // console.info('vm -> callback');
        console.log(json);
      };

      function newPromise() {
        // console.info('vm -> newPromise');
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

    function setTempNode() {
      //console.log('[01] setTempNode');
      $scope.ilcoinTmpIndex = getRandomInt(7,12);
      /*
      {
    "marketcap_price/_currency": "USD",
    "available_link_numbers/_source": "15,696,425",
    "marketcap_price/_source": "$ 10,781,795,850",
    "number": 1.0,
    "name_link/_text": "Bitcoin",
    "name_link/_source": "/currencies/bitcoin/",
    "number/_source": "1",
    "price_link/_source": "/currencies/bitcoin/#markets",
    "available_link": "http://blockchain.info",
    "name_image/_source": "/static/img/coins/16x16/bitcoin.png",
    "price_link/_text": "$ 686.89",
    "pricegraph7d_link/_source": "/currencies/bitcoin/#charts",
    "available_link/_text": "15,696,425 BTC",
    "volume24h_link": "http://coinmarketcap.com/currencies/bitcoin/#markets",
    "name_link": "http://coinmarketcap.com/currencies/bitcoin/",
    "name_image": "http://coinmarketcap.com/static/img/coins/16x16/bitcoin.png",
    "marketcap_price": 1.078179585E10,
    "name_image/_alt": "Bitcoin",
    "available_link_numbers": 1.5696425E7,
    "pricegraph7d_image/_alt": "sparkline",
    "volume24h_link/_text": "$ 190,776,000",
    "pricegraph7d_link": "http://coinmarketcap.com/currencies/bitcoin/#charts",
    "price_link": "http://coinmarketcap.com/currencies/bitcoin/#markets",
    "pricegraph7d_image": "https://files.coinmarketcap.com/generated/sparklines/1.png",
    "volume24h_link/_source": "/currencies/bitcoin/#markets",
    "change24h_value": "2.22 %"
    }
    */
    var a = 0.635421417, b = 2500000000;
    var tmp_a = a + (getRandomInt(1,5)/100);
    a = tmp_a;
    var c = a * b;
    var tmp_b = 1 + (getRandomInt(0,10)/100);
    var d = tmp_b;

      $scope.calculated = {
        "marketcap_price" : a,
        "available_link_numbers" : b,
        "price_link" :  c,
        "change24h_value" : $filter('setDecimal')(d,2)
      };

      $scope.ilcoinTmp = {
        "marketcap_price/_currency": "USD",
        "available_link_numbers/_source": "2,500,000,000",
        "marketcap_price/_source": "$ 1,588,553,542",
        "number": $scope.ilcoinTmpIndex + 1,
        "name_link/_text": "ILCoin",
        "name_link/_source": "/currencies/ilcoin/",
        "number/_source": ($scope.ilcoinTmpIndex + 1).toString(),
        "price_link/_source": "/currencies/ilcoin/#markets",
        "available_link": "http://dogechain.info/chain/ILCoin",
        "name_image/_source": "/static/img/coins/16x16/ilcoin.png",
        "price_link/_text": $scope.calculated.marketcap_price,
        "pricegraph7d_link/_source": "/currencies/ilcoin/#charts",
        "available_link/_text": "2,500,000,000 ILC",
        "volume24h_link": "http://coinmarketcap.com/currencies/ilcoin/#markets",
        "name_link": "http://coinmarketcap.com/currencies/ilcoin/",
        "name_image": "http://coinmarketcap.com/static/img/coins/16x16/ilcoin.png",
        "marketcap_price": $scope.calculated.price_link,
        "name_image/_alt": "ILCoin",
        "available_link_numbers": 2500000000,
        "pricegraph7d_image/_alt": "sparkline",
        "volume24h_link/_text": "$ 1,592,390",
        "pricegraph7d_link": "http://coinmarketcap.com/currencies/ilcoin/#charts",
        "price_link": "http://coinmarketcap.com/currencies/ilcoin/#markets",
        "pricegraph7d_image": "https://files.coinmarketcap.com/generated/sparklines/833.png",
        "volume24h_link/_source": "/currencies/ilcoin/#markets",
        "change24h_value": $scope.calculated.change24h_value + " %"
      };
      coinMarketFactory.setTmpNode([$scope.ilcoinTmpIndex,$scope.ilcoinTmp]);
      return coinMarketFactory.getTmpNode;
    };

    function imgCellGraph(data, type, full, meta) {
      // console.info('full',full);
      var path = full['pricegraph7d_image'];
      return '<img class="sparkline" alt="sparkline" src="'+path+'">';
    };

    function percentLabel(data, type, full, meta) {
      var result = ( parseFloat(data) > 0 )? "pct-positive" : "pct-negative";
      var htmlStr = "<span class='"+result+"'>"+data+"</span>";
      return htmlStr ;
    };

    function valCol(data, type, full, meta) {
      // console.info('full',full);
      var unf = numeral().unformat(data);//Number(data.replace(/[^0-9\.]+/g,""));
      var result = numeral(unf).format('$ 0,0[.][0000000]')
      // var htmlStr = "<span my-col-val data-cp="+full.marketcap_price+" data-av='"+full.available_link_numbers+"'>"+data+"</span>";
      return result ;
    };

    function defaultValue() {
      var htmlStr = "<p class='text-center text-muted'> ? </p>";
      return htmlStr ;
    };

    function imgCellLabel(data, type, full, meta) {
      var path = full['name_image/_source'];
      return '<img src=".'+ path +'" alt="' + full['name_image/_alt'] + '-logo" class="currency-logo"/>' + ' ' + data;
    };

    function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };

  }])
  .directive('myColVal', function() {
    return {
      transclude: true,
      scope: {},
      template: '<p>Name: {{customer.name}} Address: {{customer.address}}</p>'
    };
  })
  .filter('setDecimal', function ($filter) {
  return function (input, places) {
      if (isNaN(input)) return input;
      // If we want 1 decimal place, we want to mult/div by 10
      // If we want 2 decimal places, we want to mult/div by 100, etc
      // So use the following to create that factor
      var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
      return Math.round(input * factor) / factor;
  };
});