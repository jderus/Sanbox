/**
 * sandboxApp toyController
 * @module sandboxApp
 */
(function () {
    'use strict';

    angular.module('sandboxApp')
           .controller('toyController', toyController);

    toyController.$inject = ['$scope', '$location', '$filter', 'fiddleService'];

    function toyController($scope, $location, $filter, fiddleService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = null;
        vm.text = null;
        vm.fakedata = [];
        
        // grid functionality default.
        vm.sortType    = 'id';
        vm.sortReverse = false;
        vm.searchGrid  = '';

        activate();

        function activate() {
            vm.title = "Sandbox";
            vm.text  = ""
            
            fiddleService.getData().$promise.then(
                function (value) { 
                    vm.fakedata = value;
                    console.log("done"); 
                },
                function (error) { console.error('epic fail. :('); }
            );
        }        
    }
})();