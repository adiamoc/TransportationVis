function graph2(country,arr, container, data, selection, func){

  var width = window.innerWidth - 180;
  var height = window.innerHeight;

	var svg = d3.selectAll('#area2')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g');

	var categories = d3.keys(d3.nest().key(function(d) { return d.State; }).map(data));
	var fontSize = d3.scalePow().exponent(5).domain([0,1]).range([40,80]);

this.update = function(country,arr, data, selection, func) {
  console.log(this)
  svg.selectAll('g').remove();

	var layout =  d3.layout.cloud()
      .size([width, height])
      .timeInterval(20)
      .words(data)
      .rotate(function(d) {return 0; })
      .fontSize(function(d,i) {
        return d.Size;
        })
      .fontWeight(["bold"])
        
      .text(function(d) { return d.Team_CN; })
      .spiral("rectangular") 
      .on("end", draw)
      .start();

   var wordcloud = svg.append("g")
      .attr('class','wordcloud')
      .attr("transform", "translate(" + width/2 + "," + height/2 + ")");



   svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .selectAll('text')
      .style('font-size','20px')
      .style('font','sans-serif');


  var legendText = ["Countries Selected","Countries Unselected","Cities Selected"];
  var legendColor = ['#FF837B', '#E8E8E7', '#FFD25A'];

  
  var legend = d3.select("#area2").append("svg")
           .attr("class", "legend")
           .attr("width", 180)
           .attr("height", height)
           .selectAll("g")
           .data(legendColor)
           .enter()
           .append("g")
         .attr("transform", function(d, i) { 
          var y = height/2 + i *30;
          return "translate(10," + y + ")"; });

      legend.append("rect")
          .data(legendColor)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", function(d) { return d; });

      legend.append("text")
          .data(legendText)
          .attr("x", 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .text(function(d) { return d; });



function draw(words) {
  words.forEach(function(d){
    d.Note = 0;

  })
    
    wordcloud.selectAll("text")
        .data(words)
        .enter().append("text")
        .attr('class','word')
        .style("fill", function(d, i) {
         for(var i = 0; i < selection.length; i++) {
            if(d.State == selection[i])
              return legendColor[0];
         }
          return legendColor[1]; })
        // mouse interaction
        .on('click', (function(d){
              console.log('clicked');
              var cityy = d.Team_CN;
              var countryy = d.State;
              console.log(d.Note)

              for(var i = 0; i < selection.length; i++) {
                if(d.State == selection[i]) {
                  if(d.Note == 1) {
                    arr.delete(d.Team_CN);
                    country.delete(d.State);
                    d.Note = parseInt(0);
                  } else {
                    d.Note = parseInt(1);
                  }
                }
              }

              var sum = d3.sum(data.map(function(d){return d.Note}))
              console.log(sum)
              if(sum > 2)
                d.Note = parseInt(0);

              
              for(var i = 0; i < selection.length; i++) {
                if(d.State == selection[i]) {
                  if(sum <= 2){
                    if(d.Note == 1 && sum <= 2) {
                      country.add(d.State)
                      arr.add(d.Team_CN)
                      d3.select(this).style('fill', legendColor[2]);
                    }
                  }
                    if(d.Note == 0) {
                      d3.select(this).style('fill', legendColor[0]);
                    }

                }                
              }
              
              func(arr);
              //if(d.Note == 0)
                //d.Note = parseInt(1);
              //else
                //d.Note = parseInt(0);

              console.log('before')
              console.log('after')
                

        }))
        .on('mouseover', function(d) {

               
                var tooltip = d3.select('#Mytooltip');
                console.log('hreee')

                // make sure our tooltip is going to be displayed
                tooltip.style('display', 'block');

                // set the initial position of the tooltip
                tooltip.style('left', d3.event.pageX);
                tooltip.style('top', d3.event.pageY);                                           
               
                // set our tooltip to have the values for the 
                // element that we're mousing over
                // tooltip.html('Country: ' + d.data.Country + ' population: ' + d.data.population + ' Percent: ' + percent + '%');
               tooltip.html("<table><tr><td>City Name: " + d.Team_CN + "</td></tr></table>" + "<table><tr><td>Country: " + d.State + "</td></tr></table>"+ "<table><tr><td>Line Total Length: " + d.Length + "km</td></tr></table>");
                //tooltip.html('<table><tr>Country: </tr>'  + d.data.Country + '</table>';     
                tooltip.style('display', 'block');        
            })

            .on('mousemove', function(d, index, nodes) {
                    // select our tooltip
                    var tooltip = d3.select('#myTooltip');

                    // update the position if the user's moved the mouse 
                    //in the element
                    tooltip.style('left', d3.event.pageX);
                    tooltip.style('top', d3.event.pageY);
            })
            .on('mouseleave', function(d, index, nodes) {
                    // select our tooltip 
                    var tooltip = d3.select('#myTooltip');

                    // hide tooltip if we leave the element we've been 
                    // mousing over
                    tooltip.style('display', 'none');
            })
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", function(d) { return d.font; })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
        .text(function(d) { return d.text; });
	
  }; // draw
}; // update
this.update(country,arr, data, selection, func);
};


