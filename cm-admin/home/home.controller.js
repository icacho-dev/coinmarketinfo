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
                          columns: [
                            {
                              field: 'state',
                              checkbox: true
                            },
                            {
                                field: 'pk',
                                title: '#',
                                align: 'right',
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

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();