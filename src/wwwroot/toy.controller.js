(function () {
    'use strict';

    angular.module('sandboxApp')
           .controller('toyController', toyController);

    toyController.$inject = ['$scope', '$location', '$filter'];

    function toyController($scope, $location, $filter) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = null;
        vm.text = null;

        activate();

        function activate() {
            vm.title = "Sandbox some text:";
        }
    }
})();