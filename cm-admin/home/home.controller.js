(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', 'CurrencyService', '$rootScope'];
    function HomeController(UserService, CurrencyService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.allCurrencies = [];
        vm.deleteUser = deleteUser;
        vm.bsTableControl = {};

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
            loadAllCurrencies();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function loadAllCurrencies() {
            CurrencyService.GetAll()
                .then(function (currencies) {
                    vm.allCurrencies = currencies;
                    //vm.allCurrencies = [{ "pk": "6", "marketcap_price_currency": "1", "available_link_numbers_source": "2.00", "marketcap_price_source": "3.00", "number": "4", "name_link_text": "5", "name_link_source": "6", "numbe_source": "7", "price_link_source": "8", "available_link": "9", "name_image_source": "10", "price_link_text": "11", "pricegraph7d_link_source": "12", "available_link_text": "13", "volume24h_link": "14", "name_link": "15", "name_image": "16", "marketcap_price": "17.00", "name_image_alt": "18", "available_link_numbers": "19.00", "pricegraph7d_image_alt": "20", "volume24h_link_text": "21.00", "pricegraph7d_link": "22", "price_link": "23", "pricegraph7d_image": "24", "volume24h_link_source": "25", "change24h_value": "26" }, { "pk": "5", "marketcap_price_currency": "vv", "available_link_numbers_source": "0.00", "marketcap_price_source": "0.00", "number": "0", "name_link_text": "d", "name_link_source": "d", "numbe_source": "d", "price_link_source": "d", "available_link": "d", "name_image_source": "d", "price_link_text": "d", "pricegraph7d_link_source": "d", "available_link_text": "d", "volume24h_link": "d", "name_link": "d", "name_image": "d", "marketcap_price": "0.00", "name_image_alt": "d", "available_link_numbers": "0.00", "pricegraph7d_image_alt": "d", "volume24h_link_text": "0.00", "pricegraph7d_link": "d", "price_link": "d", "pricegraph7d_image": "d", "volume24h_link_source": "d", "change24h_value": "ds" }];
                    // docu - http://issues.wenzhixin.net.cn/bootstrap-table/#options/from-data.html
                    vm.bsTableControl = {
                      options: {
                          data: vm.allCurrencies,
                          rowStyle: function (row, index) {
                              return { classes: 'none' };
                          },
                          cache: false,
                          // height: 400,
                          striped: true,
                          pagination: true,
                          pageSize: 10,
                          pageList: [5, 10, 25, 50, 100, 200],
                          search: true,
                          showColumns: true,
                          showRefresh: false,
                          minimumCountColumns: 2,
                          clickToSelect: false,
                          showToggle: true,
                          maintainSelected: true,
                          sortName: 'pk',
                          columns: [
                            {
                              field: 'state',
                              checkbox: true
                            },
                            {
                                field: 'pk',
                                title: '#',
                                align: 'center',
                                valign: 'bottom',
                                sortable: true
                            }
                          // ,
                          // {
                          //     field: 'id',
                          //     title: 'Item ID',
                          //     align: 'center',
                          //     valign: 'bottom',
                          //     sortable: true
                          // }, {
                          //     field: 'name',
                          //     title: 'Item Name',
                          //     align: 'center',
                          //     valign: 'middle',
                          //     sortable: true
                          // }, {
                          //     field: 'workspace',
                          //     title: 'Workspace',
                          //     align: 'left',
                          //     valign: 'top',
                          //     sortable: true
                          // }
                          // , {
                          //     field: 'flag',
                          //     title: 'Flag',
                          //     align: 'center',
                          //     valign: 'middle',
                          //     clickToSelect: false,
                          //     formatter: flagFormatter,
                          //     // events: flagEvents
                          // }
                        ]
                      }
                  };
                });
        }

        // delete - currency record
        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();