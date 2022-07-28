function generateBarChart(draw_data, draw_id) {
    var barData = [];
            draw_data.forEach(ele => {
            if (ele.countryiso3code === draw_id){
                let temp = {};
                temp.year = ele.date;
                temp.Qty = ele.value / 1000000000000;
                barData.push(temp);
            }
            });

    barData.reverse();

    var svg = d3.select("#svg2");
    var padding = {top:50, right:0, bottom:18, left:50};

    var chartArea = {
        "width":parseInt(svg.style("width"))-padding.left - padding.right,
        "height":parseInt(svg.style("height"))-padding.top - padding.bottom
    };

    var yScale = d3.scaleLinear()
                .domain([0, d3.max(barData, function(d,i){return d.Qty})])
                .range([chartArea.height, 0]).nice();
    var xScale = d3.scaleBand()
                .domain(barData.map(function(d){return d.year}))
                .range([0, chartArea.width]).padding(.2);
    var xAxis = svg.append('g')
                .classed('xAxis', true)
                .attr(
                    'transform', 'translate('+padding.left+','+(chartArea.height+padding.top)+')'
                )
                .call(d3.axisBottom(xScale));

    var yAxisFn = d3.axisLeft(yScale);
    var yAxis = svg.append('g')
                .classed('yAxis', true)
                .attr(
                    'transform', 'translate('+padding.left+','+padding.top+')'
                );
    yAxisFn(yAxis);


    // //hover information
    // var tooltip = d3.select("#svg2")
    // .append("div")
    // .style("opacity", 0)
    // .attr("class", "tooltip")
    // .style("background-color", "white")
    // .style("border", "solid")
    // .style("border-width", "1px")
    // .style("border-radius", "5px")
    // .style("padding", "10px")

    // // Three function that change the tooltip when user hover / move / leave a cell
    // var mouseover = function(d) {
    //     Tooltip
    //       .style("opacity", 1)
    //     d3.select(this)
    //       .style("stroke", "black")
    //       .style("opacity", 1)
    //   }
    //   var mousemove = function(d) {
    //     Tooltip
    //       .html("The exact value of<br>this cell is: " + d.Qty)
    //       .style("left", (d3.mouse(this)[0]+70) + "px")
    //       .style("top", (d3.mouse(this)[1]) + "px")
    //   }
    //   var mouseleave = function(d) {
    //     Tooltip
    //       .style("opacity", 0)
    //     d3.select(this)
    //       .style("stroke", "none")
    //       .style("opacity", 0.8)
    //   }



    //bar
    var rectGrp = svg.append('g').attr(
        'transform', 'translate('+padding.left+','+padding.top+')'
    );

    rectGrp.selectAll('rect').data(barData).enter()
        .append('rect')
        .attr('width',xScale.bandwidth())
        .attr('height', function(d,i){
            return chartArea.height-yScale(0);
        })
        .attr('x', function(d,i){
            return xScale(d.year);
        })
        .attr('y', function(d,i){
            return yScale(0);
        })
        .attr('class','bar');
        // .on("mouseover", mouseover)
        // .on("mousemove", mousemove)
        // .on("mouseleave", mouseleave)
        


    rectGrp.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d) { return yScale(d.Qty); })
        .attr("height", function(d) { return chartArea.height - yScale(d.Qty); })
       // .delay(function(d,i){console.log(i) ; return(i*100)})
       .delay(function(d,i){return(i*100)})



    rectGrp.append('text')
       .attr('y',-20)
       .attr('x', 50)
       .text('GDP (current us$)(trillion)');
    


}


export default generateBarChart;

