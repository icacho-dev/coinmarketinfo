(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'bsTable', 'datetimepicker'])
        .constant("myConfig", {
        "url": "http://coinmarketinfo.com/",
        "api": "http://coinmarketinfo.com/api/v1/",
        "port": "80"
        })
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider','$logProvider'];
    function config($routeProvider, $locationProvider, $logProvider) {
        $logProvider.debugEnabled(true);
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm',
                resolve: {
                  meta: ['$rootScope', function ($rootScope) {
                    var title = "Dashboard";
                    $rootScope.meta = {title: title};
                  }]
                }
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm',
                resolve: {
                  meta: ['$rootScope', function ($rootScope) {
                    var title = "Login";
                    $rootScope.meta = {title: title};
                  }]
                }
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm',
                resolve: {
                  meta: ['$rootScope', function ($rootScope) {
                    var title = "Register";
                    $rootScope.meta = {title: title};
                  }]
                }
            })

            .when('/registercurrency', {
                controller: 'RegisterCurrencyController',
                templateUrl: 'registercurrency/register.view.html',
                controllerAs: 'vm',
                resolve: {
                    meta: ['$rootScope', function ($rootScope) {
                        var title = "Register Currency";
                        $rootScope.meta = {title: title};
                    }]
                }
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();