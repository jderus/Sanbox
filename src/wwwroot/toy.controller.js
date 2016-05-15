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
        
        vm.d3dataset = [ 5, 10, 15, 20, 25 ];
        
        // grid functionality default.
        $scope.sortType    = 'id';
        $scope.sortReverse = false;
        $scope.searchGrid  = '';

        activate();

        function activate() {
            vm.title = "Sandbox";
            vm.text  = ""
            drawStuff();
            
            fiddleService.getData().$promise.then(
                function (value) { 
                    vm.fakedata = value;
                    console.log("done"); 
                },
                function (error) { console.error('epic fail. :('); }
            );
        }
        
        function drawStuff() {
            var w = 500;
            var h = 50;
            var svg = d3.select("#d3loc")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);
                        
            var circles = svg.selectAll("circle")
                             .data(vm.d3dataset)
                             .enter()
                             .append("circle");
            
            circles.attr("cx", function(d, i) { return (i * 50) + 25; })
                   .attr("cy", h/2)
                   .attr("r", function(d) { return d; });
            
        }
        
    }
})();