var width = 350,
    height = 250,
    margin = 30;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#svg4")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var data111 = {a: 9, b: 20, c:30, d:8, e:12};

// set the color scale
var color = d3.scaleOrdinal()
  .range(["#88e3d1", "#d1e6a8", "#fddd9e", "#f5897c", "#cbaddb"]);

// Compute the position of each group on the pie:
var pie = d3.pie()
.value(function(d) {return d[1]});

var data_ready = pie(Object.entries(data111));
// // shape helper to build arcs:
var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('slices')
  .data(data_ready)
  .join('path')
  .attr('d', arcGenerator)
  .attr('fill', function(d){ return(color(d.data[1])) })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

  //add annotation
  svg.selectAll('slices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return + d.value})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 10)