(function () {
    'use strict';

    var app = angular.module('sandboxApp', ['ngRoute', 'ngResource'])
        .config(function ($routeProvider, $locationProvider) {

            $routeProvider.when('/', {
                templateUrl: 'index.html'
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });
        });
 })();