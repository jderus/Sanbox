(function () {
    'use strict';

    angular.module('sandboxApp')
           .controller('d3Controller', d3Controller);

    function d3Controller($scope, $location, $filter) {
        /* jshint validthis:true */
        var vm = this;
        vm.d3dataset = [ 5, 10, 15, 20, 25 ];

        activate();

        function activate() {
            drawStuff();
            drawBarStuff();
            drawBarAxisStuff();
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
                 height = 20;
 
             var x = d3.scale.linear()
                 .domain([0, d3.max(data)])
                 .range([0, width]);
 
             var chart = d3.select(".chart")
                 .attr("width", width)
                 .attr("height", height * data.length);
 
             var bar = chart.selectAll("g")
                 .data(data)
                 .enter().append("g")
                 .attr("transform", function(d, i) { return "translate(0," + i * height + ")"; });
 
             bar.append("rect")
                 .attr("width", x)
                 .attr("height", height - 1);
 
             bar.append("text")
                 .attr("x", function(d) { return x(d) - 3; })
                 .attr("y", height / 2)
                 .attr("dy", ".35em")
                 .text(function(d) { return d; });
             
         }
        
        function drawBarAxisStuff() {
            var data = [4, 8, 15, 16, 23, 42];

            var width = 420,
                height = 20;
            var padding = 20;

			//Create scale functions
			var xScale = d3.scale.linear()
								 .domain([0, d3.max(data)])
								 .range([padding, width - padding * 2]);


                
			//Define X axis
			var xAxis = d3.svg.axis()
							  .scale(xScale)
							  .orient("bottom");
                              
             var chart = d3.select(".axischart")
                 .attr("width", width)
                 .attr("height", height * data.length);

			//Create labels
			chart.selectAll("text")
			   .data(data)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("x", function(d) {
			   		return xScale(d);
			   })
			//    .attr("y", function(d) {
			//    		return yScale(d[1]);
			//    })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "red");

			//Create X axis
			chart.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0," + (height - padding) + ")")
				.call(xAxis);            
        }

    }

})();