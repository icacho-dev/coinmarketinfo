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