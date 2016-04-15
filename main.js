var dataSet=[];

var draw = function(values) {

	xScale.domain(d3.extent(values, function(d) { return d.mpg; }));
    yScale.domain([0, d3.max(values, function(d) { return d.displacement; })]);


	console.log(values);
	var svg = d3.select('svg')
	  .attr('width', 400)
	  .attr('height', 300);

	var circles = svg.selectAll('circle').data(values);
	
	circles.enter()
	.append("circle")
	  .attr("cy", function(d){return yScale(d.displacement);})
	  .attr("cx", function(d, i) { return xScale(d.mpg); })
	  .attr("r", function(d, i) { return 10; })
	  .attr("alpha",function(d){return.3;});
	

	//circle.exit().remove();
};

$(document).ready(function() {
	
	d3.csv("car.csv", function(data) {

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

  draw(data);

});

	
});