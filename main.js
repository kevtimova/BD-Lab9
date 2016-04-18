var dataset = [];		


$(document).ready(function() {

//Width and height
var w = 400;
var h = 300;
var padding = 40;
 
d3.csv("car.csv", function(data) {
		
	columnNames = Object.keys(data[0]).splice(1,7);
	var key1 = "mpg";
	var key2 = "mpg";
	//console.log(data);
	
	var listX = d3.select("#sel-x").selectAll("option").data(columnNames).enter().append("option").text(function(d){return d;})
  	  .attr("value",function(d){return d;});

  	var listY = d3.select("#sel-Y").selectAll("option").data(columnNames).enter().append("option").text(function(d){return d;})
  	  .attr("value",function(d){return d;});


	data.forEach(function(d){
		d.mpg = +d.mpg;
		d.acceleration +d.acceleration;
		d.cylinders = +d.cylinders;
		d.displacement = +d.displacement;
		d.horsepower = +d.horsepower;
		//d[model.year] = +d[model.year]
		d.acceleration = + d.acceleration;
		d.weight = +d.weight;
	});

	dataset = data.map(function(d){ return [ d[key1] , d[key2], d.mpg ,d.name];} ) ;
	//console.log(dataset);
 
	//Create scale functions
	var xScale = d3.scale.linear().range([padding, w - padding * 2]);

	var yScale = d3.scale.linear().range([h - padding, padding]);

	xScale.domain(d3.extent(dataset, function(d) { return d[0]; }));

	yScale.domain(d3.extent(dataset, function(d) { return d[1]; }));


	//Define X axis
	var xAxis = d3.svg.axis()
				  .scale(xScale)
				  .orient("bottom")
				  .ticks(5);

	//Define Y axis
	var yAxis = d3.svg.axis()
				  .scale(yScale)
				  .orient("left")
				  .ticks(5);

	// Define the div for the tooltip
	var div = d3.select("body").append("div")	
	    .attr("class", "tooltip")				
	    .style("opacity", .5);

	//Create SVG element
	var svg = d3.select(".plot")
			.append("svg")
			.attr("width", w)
			.attr("height", h);


	//Create circles
	svg.selectAll("circle")
	.data(dataset)
	.enter()
	.append("circle")
	.attr("cx", function(d) {
			return xScale(d[0]);
	})
	.attr("cy", function(d) {
			return yScale(d[1]);
	})
	.attr("r", 5)
	.attr("opacity",.5)
	.attr("fill", "blue")
	.on("mouseover", function(d) {
				$("#hovered").html(d[3]);
	            div.transition()		
	                .duration(200)		
	                .style("opacity", .9);	
	            div	.html( d[3])	
	                .style("left", (d3.event.pageX) + "px")		
	                .style("top", (d3.event.pageY - 28) + "px");	
	            })					
	        .on("mouseout", function(d) {	
	        	$("#hovered").html("No car selected...");	
	            div.transition()		
	                .duration(500)		
	                .style("opacity", 0);	
	        });

	//Create X axis
	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + (h - padding) + ")")
	.call(xAxis);

	// label for x-axis
	svg.append("text")
	    .attr("class", "xLabel")
	    .attr("text-anchor", "end")
	    .attr("x", w - 50)
	    .attr("y", h - padding -5)
	    .text("mpg");

	//Create Y axis
	svg.append("g")
	.attr("class", "y axis")
	.attr("transform", "translate(" + padding + ",0)")
	.call(yAxis);

	// label for y axis
	svg.append("text")
	    .attr("class", "yLabel")
	    .attr("text-anchor", "end")
	    .attr("y", 40)
	    .attr("x",-65)
	    .attr("dy", ".75em")
	    .attr("transform", "rotate(-90)")
	    .text("mpg");

	//On click, update with new data
	d3.select("#sel-y")
	.on("change", function() {

		key2 = columnNames[this.selectedIndex];

		dataset = data.map(function(d){ return [ d[key1] , d[key2] ,d.mpg, d.name ];} ) 
		//console.log(dataset);
		
		 d3.select('.yLabel').text(key2);
		
		//Update scale domains
		//xScale.domain(d3.extent(dataset, function(d) { return d[0]; }));

		yScale.domain(d3.extent(dataset, function(d) { return d[1]; }));

		//Update all circles
		svg.selectAll("circle")
		   .data(dataset)
		   .transition()
		   .duration(1000)		
		   .attr("cy", function(d) {
		   		return yScale(d[1]);
		   });
		
		//Update Y axis
		svg.select(".y.axis")
	    	.transition()
	    	.duration(1000)
			.call(yAxis);

	});

  //On click, update with new data	
  d3.select("#sel-x")
    .on("change", function() {

	key1 = columnNames[this.selectedIndex];

	dataset = data.map(function(d){ return [ d[key1] , d[key2] ,d.mpg , d.name ];} )
	//console.log(dataset);
	

	d3.select('.xLabel').text(key1);

	
	//Update scale domains
	xScale.domain(d3.extent(dataset, function(d) { return d[0]; }));


	//Update all circles
	svg.selectAll("circle")
	   .data(dataset)
	   .transition()
	   .duration(1000)		
	   .attr("cx", function(d) {
	   		return xScale(d[0]);
	   });
	   
	//Update X axis
	svg.select(".x.axis")
    	.transition()
    	.duration(1000)
		.call(xAxis);
  });


	d3.select("#update")
	.on("click", function() {
     	max = $("#mpg-max").val();
        min = $("#mpg-min").val();

        var filt =  dataset.filter(function(d){return d[2] > min && d[2] < max});
        //console.log(filt);

    	//Update scale domains
		xScale.domain(d3.extent(filt, function(d) { return d[0]; }));

		yScale.domain(d3.extent(filt, function(d) { return d[1]; }));

		//Update all circles
		svg.selectAll("circle")
		.data(filt)
		.enter()
		.append("circle")
		.attr("cx", function(d) {
				return xScale(d[0]);
		})
		.attr("cy", function(d) {
				return yScale(d[1]);
		})
		.attr("r", 5)
		.attr("opacity",.5)
		.attr("fill", "blue")
		.on("mouseover", function(d) {
					$("#hovered").html(d[3]);
		            div.transition()		
		                .duration(200)		
		                .style("opacity", .9);	
		            div	.html( d[3])	
		                .style("left", (d3.event.pageX) + "px")		
		                .style("top", (d3.event.pageY - 28) + "px");	
		            })					
		        .on("mouseout", function(d) {	
		        	$("#hovered").html("No car selected...");	
		            div.transition()		
		                .duration(500)		
		                .style("opacity", 0);	
		        });
		


		svg.selectAll("circle")
			.data(filt)		    
			.exit()
			.transition()
			.duration(1000)
		    .attr("r",0)
		   	.remove();
	});
 	 
});

});