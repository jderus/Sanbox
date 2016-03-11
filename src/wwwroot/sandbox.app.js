/**
 * sandboxApp Angular App
 * @module sandboxApp
 */
(function () {
    'use strict';

    var app = angular.module('sandboxApp', ['ngRoute', 'ngResource', 'sand.widgets'])
        .config(function ($routeProvider, $locationProvider) {

            $routeProvider.when('/', {
                templateUrl: 'index.html'
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });
        });
 })();;