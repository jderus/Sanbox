/**
 * sandboxApp FiddleService module.
 * @module sandboxApp
 */
(function () {
    'use strict';

    angular
        .module('sandboxApp')
        .service('fiddleService', fiddleService);

    fiddleService.$inject = ['$http', '$resource'];

    /**  
     * @constructor
    */
    function fiddleService($http, $resource) {
        var service = {
            getData: getData
        };

        return service;
    
        function getData() {
        var url = "http://jsonplaceholder.typicode.com/posts";
        return $resource(url).query();
    }
    
    }
})();