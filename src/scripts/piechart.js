function generatePieChart() {
var width = 310,
    height = 300,
    margin = 20;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#pic1")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var data111 = {"United States": 24.67, "China":17.39, "Japan":5.97,"Germany":4.54,"United Kindom":3.26,"countries 6-10": 12.35, "countries 11-15":7.81, "countries 16-25":7.96, "168 rest": 16.04};

// set the color scale
var color = d3.scaleOrdinal()
  .range(["#88e3d1", "#d1e6a8","#fc7419", "#fddd9e",  "#cbaddb","#768cce","#ffc6d0","#e9d3a8","#f17173","#f5897c"]);

// Compute the position of each group on the pie:
var pie = d3.pie()
.value(function(d) {return d[1]});

var data_ready = pie(Object.entries(data111));
// shape helper to build arcs
var arcGenerator = d3.arc()
  .innerRadius(80)
  .outerRadius(radius)


// Build the pie chart
svg
  .selectAll('slices')
  .data(data_ready)
  .join('path')
  .attr('d', arcGenerator)
  .attr('fill', function(d){ return(color(d.data[1])) })
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
  .attr("class", "pie-slice")


  //add annotation
  svg.selectAll('slices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return d.value + " %"})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 10)
  .attr("cursor","default")


  var svg2 = d3.select("#pic1")
           .append("svg")
           .attr("width", 150)
           .attr("height", 300)
           svg2.append("circle").attr("cx",10).attr("cy",50).attr("r", 6).style("fill", "#88e3d1")
           svg2.append("circle").attr("cx",10).attr("cy",80).attr("r", 6).style("fill", "#d1e6a8")
           svg2.append("circle").attr("cx",10).attr("cy",110).attr("r", 6).style("fill", "#fc7419")
           svg2.append("circle").attr("cx",10).attr("cy",140).attr("r", 6).style("fill", "#fddd9e")
           svg2.append("circle").attr("cx",10).attr("cy",170).attr("r", 6).style("fill", "#cbaddb")
           svg2.append("circle").attr("cx",10).attr("cy",200).attr("r", 6).style("fill", "#768cce")
           svg2.append("circle").attr("cx",10).attr("cy",230).attr("r", 6).style("fill", "#ffc6d0")
           svg2.append("circle").attr("cx",10).attr("cy",260).attr("r", 6).style("fill", "#e9d3a8")
           svg2.append("circle").attr("cx",10).attr("cy",290).attr("r", 6).style("fill", "#f17173")
           svg2.append("text").attr("x", 30).attr("y", 50).text("United States").style("font-size", "15px").attr("alignment-baseline","middle")
           svg2.append("text").attr("x", 30).attr("y", 80).text("China").style("font-size", "15px").attr("alignment-baseline","middle")
           svg2.append("text").attr("x", 30).attr("y", 110).text("Japan").style("font-size", "15px").attr("alignment-baseline","middle")
           svg2.append("text").attr("x", 30).attr("y", 140).text("Germany").style("font-size", "15px").attr("alignment-baseline","middle")
           svg2.append("text").attr("x", 30).attr("y", 170).text("United Kindom").style("font-size", "15px").attr("alignment-baseline","middle")
           svg2.append("text").attr("x", 30).attr("y", 200).text("TOP 6-10").style("font-size", "15px").attr("alignment-baseline","middle")
           svg2.append("text").attr("x", 30).attr("y", 230).text("TOP 11-15").style("font-size", "15px").attr("alignment-baseline","middle")
           svg2.append("text").attr("x", 30).attr("y", 260).text("TOP 16-25").style("font-size", "15px").attr("alignment-baseline","middle")
           svg2.append("text").attr("x", 30).attr("y", 290).text("168 rest").style("font-size", "15px").attr("alignment-baseline","middle")
}

export default generatePieChart;