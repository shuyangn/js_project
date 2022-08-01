function generateLineChart(draw_data, draw_id) {
        var lineData = [];
        var current_country;
            draw_data.forEach(ele => {
            if (ele.countryiso3code === draw_id){
                let temp = {};
                temp.year = ele.date;
                temp.Qty = ele.value;
                lineData.push(temp);
                current_country = ele.country.value;
            }
            });


    var margin = {top: 50, right: 25, bottom: 18, left: 25},
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
    ;
    var svg = d3.select("#pic2")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
      .domain([d3.min(lineData, function(d){return d.year;}), d3.max(lineData, function(d){return d.year;})])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
      .domain([d3.min(lineData, function(d){return d.Qty;}) - 3, d3.max(lineData, function(d){return d.Qty;}) + 3])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
    .datum(lineData)
    .transition()
    .attr("fill", "none")
    .attr("stroke", "#69b3a2")
    .attr("stroke-width", 1.3)
    .attr("d", d3.line()
      .x(function(d) { return x(d.year) })
      .y(function(d) { return y(d.Qty) })
      )

    // Add the points
    svg
    .append("g")
    .selectAll("dot")
    .data(lineData)
    .enter()
    .append("circle")
      .attr("class", "lineCircle")
      //.transition()
      .attr("cx", function(d) { return x(d.year) } )
      .attr("cy", function(d) { return y(d.Qty) } )
      .attr("r", 5)
      .attr("fill", "#69b3a2")

    // add head
    svg.append('text')
    .attr('y',-20)
    .attr('x', 85)
    .text(current_country + ' GDP growth (annual %)');




  const lineCircles = Array.from(document.getElementsByClassName("lineCircle"));
  lineCircles.forEach(circle => {
      circle.addEventListener('mouseover', e => {
        debugger
          const tip_year = e.target.__data__.year;
          const tip_value = e.target.__data__.Qty;
          const message = "year: ".concat(tip_year, "<br>" , "Growth rate: " , tip_value.toFixed(2) , " %");
          const hoverpos = document.getElementById("hover-tooltip");
          hoverpos.innerHTML = message;
          hoverpos.style.opacity = 1;
      })

      circle.addEventListener("mousemove", e => {
          document.getElementById("hover-tooltip").style.left = e.pageX + 10 + "px";
          document.getElementById("hover-tooltip").style.top = e.pageY - 35 + "px";
      })


      circle.addEventListener("mouseleave", e => {
          document.getElementById("hover-tooltip").innerHTML = "";
          document.getElementById("hover-tooltip").style.opacity = 0;
      })
  })






}
export default generateLineChart;
