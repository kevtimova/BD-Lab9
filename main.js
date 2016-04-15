var dataSet=[];

var sel = d3.select("#sel-x")
  	.on("change", function() {

    key = this.selectedIndex;
	console.log(key);
});


var draw = function(values,key1,key2) {

	xScale.domain(d3.extent(values, function(d) { return d[key1]; }));
    yScale.domain([0, d3.max(values, function(d) { return d[key2]; })]);


	console.log(values);
	var svg = d3.select('svg')
	  .attr('width', 400)
	  .attr('height', 300);

	var circles = svg.selectAll('circle').data(values);
	
	circles.enter()
	.append("circle")
	  .attr("cy", function(d){return yScale(d[key2]);})
	  .attr("cx", function(d, i) { return xScale(d[key1]); })
	  .attr("r", function(d, i) { return 3; })
	  .attr("alpha",function(d){return.3;});
	

	//circle.exit().remove();
};

$(document).ready(function() {
	
	d3.csv("car.csv", function(data) {

		var columnNames = Object.keys(data[0]);
		var key1 = "";
		var key2 = "";
		console.log(columnNames);

		d3.select("select")
	      .on("change", function() {

	      key1 = columnNames[this.selectedIndex];
	      console.log(key1);
		  

		});

	 
		
		var listX = d3.select("#sel-x").selectAll("option").data(columnNames).enter().append("option").text(function(d){return d;})
  		  .attr("value",function(d){return d;});

  		var listY = d3.select("#sel-Y").selectAll("option").data(columnNames).enter().append("option").text(function(d){return d;})
  		  .attr("value",function(d){return d;});

	xScale = d3.scale.linear().range([400,0]);
	yScale = d3.scale.linear().range([0,300]);

	data.forEach(function(d){
		d.mpg = +d.mpg
		d.acceleration +d.acceleration
		d.cylinders = +d.cylinders
		d.displacement = +d.displacement
		d.horsepower = +d.horsepower
		//d.model.year = +d.model.year
		d.weight = +d.weight
	});
  console.log(data[0]);
  dataSet=data;
  console.log(key1);
  console.log(key2);

  draw(data, key1, key2);
  
});

	
});