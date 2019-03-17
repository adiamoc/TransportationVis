function graph1(selected) {

this.selected = selected
var selection = [];

var width = window.innerWidth;
var height = window.innerHeight;

var map = new worldmap(selected);

function worldmap(selected){

	var svg = d3.select("#area1")
				.append("svg")
		        .attr("width", width - 180)
		        .attr("height", height)
		        .append("g");

	var projection = d3.geoMercator()
		              	.translate([(width - 180) / 2, height / 1.5]);

	var path = d3.geoPath().projection(projection);

	var zoom = d3.zoom()
		.scaleExtent([1, 8])
		.on("zoom", zoomed);
		
		zoom(svg);
		function zoomed() {
		 	svg.attr("transform", d3.event.transform);
		}

	var color = ["#FF837B","#57B196","#E8E8E7","#FFD25A"];

	var legendText = ["Countries Selected","Countries Unselected","Countries Invalid","Cities Located"];
	
	var legend = d3.select("#area1").append("svg")
	  			 .attr("class", "legend")
	  			 .attr("width", 180)
	  			 .attr("height", height)
   				 .selectAll("g")
   				 .data(color)
   				 .enter()
   				 .append("g")
	 			 .attr("transform", function(d, i) { 
	 			 	var y = height/2 + i *30;
	 			 	return "translate(10," + y + ")"; });

	  	legend.append("rect")
	  		  .data(color)
	   		  .attr("width", 18)
	   		  .attr("height", 18)
	   		  .style("fill", function(d) { return d; });

	  	legend.append("text")
	  		  .data(legendText)
		  	  .attr("x", 24)
		  	  .attr("y", 9)
		  	  .attr("dy", ".35em")
		  	  .text(function(d) { return d; });
	
		
	d3.select("#myButton").on("click", function()
	{
		d3.csv("citiess.csv", function(data) {
			data.forEach(function(datum) {
				if(selection.indexOf(datum.country) == -1){
					selection.push(datum.country);
				}		    
			});
			map.update(selected);
			this.graph1_data = [];
			this.graph1_data = selection;
			selected(selection);
		});
	});
	this.update = function(selected){
		svg.selectAll("*").remove();
		d3.csv("citiess.csv", function(data) {		

			// Load GeoJSON data
			d3.json("world_countries.json", function(json) {

				for (var i = 0; i < data.length; i++) {
					var dataCountry = data[i].country;
					for (var j = 0; j < json.features.length; j++)  {
						var jsonCountry = json.features[j].properties.name;
						if (dataCountry == jsonCountry) {
							json.features[j].properties.valid = 1; 
							break;
						}
					}
					//check missing

				}

				//create one path for each state
				svg.selectAll("path")
					.data(json.features)
					.enter()
					.append("path")
					.attr("d", path)
					.style("stroke", "#fff")
					.style("stroke-width", "1")
					.style("fill", function(d) {
						//fill with desired color
						var value = d.properties.valid;

						if (value==1) {
							if(selection.indexOf(d.properties.name) == -1){
								return color[1];
							}
							else{
								return color[0];
							}
						} 
						else {
							return color[2];
						}
					})
					.on("mouseover", function(d) {
						var tooltip = d3.select("#myTooltip");
						tooltip.style("display", "block");
						tooltip.style("left", d3.event.pageX);
						tooltip.style("top", d3.event.pageY);

						tooltip.html(d.properties.name);
					})
					.on("mousemove", function() {
						var tooltip = d3.select("#myTooltip");

						tooltip.style("left", d3.event.pageX);
						tooltip.style("top", d3.event.pageY);
					})
					.on("mouseleave", function() {
						var tooltip = d3.select("#myTooltip");
						tooltip.style("display", "none");
					})
					.on("click", function(d){
						var userchoice = d.properties.name;
						if(d.properties.valid==1)
						{
							if(selection.indexOf(userchoice) == -1) 
							{
								selection.push(userchoice);
								map.update(selected);
							}
							else 
							{ 
								selection.splice(selection.indexOf(userchoice), 1);
								map.update(selected);
							}
						}
						
						this.graph1_data = [];
						this.graph1_data = selection;
						selected(selection);
						//console.log(selection);
					});

				svg.selectAll("circle")
					.data(data)
					.enter()
					.append("circle")
					.attr("cx", function(d) {
						return projection([d.lon, d.lat])[0];
					})
					.attr("cy", function(d) {
						return projection([d.lon, d.lat])[1];
					})
					.attr("r", 2.5)
						.style("fill", color[3])
					.on("mouseover", function(d) {
						var tooltip = d3.select("#myTooltip");
						tooltip.style("display", "block");
						tooltip.style("left", d3.event.pageX);
						tooltip.style("top", d3.event.pageY);

						tooltip.html(d.city);
					})
					.on("mousemove", function(d) {
						var tooltip = d3.select("#myTooltip");

						tooltip.style("left", d3.event.pageX);
						tooltip.style("top", d3.event.pageY);
					})
					.on("mouseleave", function(d) {
						var tooltip = d3.select("#myTooltip");
						tooltip.style("display", "none");
					});


			});
		});
	}

	this.update(selected);
	
}
}
