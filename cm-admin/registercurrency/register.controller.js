(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterCurrencyController', RegisterCurrencyController);

    RegisterCurrencyController.$inject = ['CurrencyService', '$location', '$rootScope', 'FlashService'];
    function RegisterCurrencyController(CurrencyService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.scoped = {
            format: 'YYYY-MM-DD HH:mm',
            useCurrent: true,
            toolbarPlacement: 'top',
            showTodayButton: true,
            showClose: true,
            icons: {
                next: 'glyphicon glyphicon-arrow-right',
                previous:'glyphicon glyphicon-arrow-left',
                up:'glyphicon glyphicon-arrow-up',
                down:'glyphicon glyphicon-arrow-down'
            }
        };

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            console.log;
            CurrencyService.Create(vm.currency)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
