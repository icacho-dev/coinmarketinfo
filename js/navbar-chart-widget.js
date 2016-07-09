$(function () {

  var jsonUrl = 'https://blockchain.info/charts/market-price?format=json';
  var corsProxy = 'http://cors.io/?u=';
  var jsonPath = corsProxy + jsonUrl;

  $.getJSON(jsonPath, function (data) {

    var title = {
      text: 'BTCUSD Price (24h)',
      align: 'left',
      style: {
        'fontSize': '1em',
        'font-weight': 'bold',
        'color': 'rgba(100, 200, 247, 0.95);'
      }
    };
    var subtitle = {
      text: null
    };
    var xAxis = {
      categories: [],
      visible : false
    };

    var subdata = [];
    var subserie = [];
    for (var i = data.values.length - 10; i < data.values.length; i++) {
      subdata.push(data.values[i]);
    };
    for(var item in subdata) {

      xAxis.categories.push(moment.unix(subdata[item].x).format("D/M HH:mm"));
      var v2 = subdata[item].y;
      //var v2 = moment.unix(subdata[item].x).format("HH:mm:ss").toString();
      // subserie.push(moment.unix(v2).format("HH:mm:ss"));
      subserie.push(v2);
    }

    var yAxis = {
      title: {
        text: null
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#d10079'
      }]
    };

    var tooltip = {
      valueSuffix: ''
    }

    var legend = {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0,
      enabled: false
    };

    var series =  [
      {
        name: 'BTC-USD',
        data: subserie
      },
    ];

    var chart = {
      type: 'areaspline'
    };

    var plotOptions = {
      areaspline: {
        fillColor: 'rgba(99,199,247,.25)'
      }
    };

    var credits = {
      enabled: 0
    };

    var json = {};

    json.title = title;
    json.subtitle = subtitle;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.tooltip = tooltip;
    json.legend = legend;
    json.series = series;
    json.chart = chart;
    json.plotOptions = plotOptions;
    json.credits = credits;

    $('#container').highcharts(json);
  });
});