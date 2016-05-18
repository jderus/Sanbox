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
            drawBarStuff();
            
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
        
        function drawBarStuff() {
            var data = [4, 8, 15, 16, 23, 42];

            var width = 420,
                barHeight = 20;
            var padding = 20;

			//Create scale functions
			var xScale = d3.scale.linear()
								 .domain([0, d3.max(data, function(d) { return d[0]; })])
								 .range([padding, width - padding * 2]);

			var yScale = d3.scale.linear()
								 .domain([0, d3.max(data, function(d) { return d[1]; })])
								 .range([barHeight - padding, padding]);

            //drawing actual chart
            var x = d3.scale.linear()
                .domain([0, d3.max(data)])
                .range([0, width]);

            var chart = d3.select(".chart")
                .attr("width", width)
                .attr("height", barHeight * data.length);
                
			//Define X axis
			var xAxis = d3.svg.axis()
							  .scale(xScale)
							  .orient("bottom");

			//Create labels
			chart.selectAll("text")
			   .data(data)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d[0] + "," + d[1];
			   })
			   .attr("x", function(d) {
			   		return xScale(d[0]);
			   })
			   .attr("y", function(d) {
			   		return yScale(d[1]);
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "red");

			//Create X axis
			chart.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0," + (barHeight - padding) + ")")
				.call(xAxis);


            var bar = chart.selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

            bar.append("rect")
                .attr("width", x)
                .attr("height", barHeight - 1);

            bar.append("text")
                .attr("x", function(d) { return x(d) - 3; })
                .attr("y", barHeight / 2)
                .attr("dy", ".35em")
                .text(function(d) { return d; });
            
        }
        
    }
})();