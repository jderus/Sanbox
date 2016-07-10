(function () {
    'use strict';

    angular.module('sandboxApp')
           .controller('d3Controller', d3Controller);

    function d3Controller($scope, $location, $filter) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() {
            console.log('woot');
        }
    }

})();