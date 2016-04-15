
dataSet=[];
d3.csv("car.csv", function(data) {

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

});

var draw = function(values) {

	var svg = d3.select('svg')
	  .attr('width', 400)
	  .attr('height', 300);

	var circle = svg.selectAll("circle")
      .data(values)
	.enter()
	.append("circle")
	  .attr("cy", 60)
	  .attr("cx", function(d, i) { return i * 100 + 30; })
	  .attr("r", function(d) { return d; });
	

	//circle.exit().remove();
};

$(document).ready(function() {

	draw([1,2,3,4]);
});