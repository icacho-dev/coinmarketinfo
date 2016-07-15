(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterCurrencyController', RegisterCurrencyController);

    RegisterCurrencyController.$inject = ['CurrencyService', '$location', '$rootScope', 'FlashService'];
    function RegisterCurrencyController(CurrencyService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            CurrencyService.Create(vm.user)
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
