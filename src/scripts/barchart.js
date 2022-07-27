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
    // svg.scale(199);
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
                .classed('XAxis', true)
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



    var barblocks = document.getElementsByClassName("bar");
    //debugger

    for (let i = 0; i < barblocks.length; i++){
    let barblock = barblocks[i];
    barblock.addEventListener("mouseover", () => {
        let value = barblock.__data__.Qty.toFixed(2);
        let fullMessage = (value.toLocaleString() + "%");
        let domEle = document.getElementById("hover-tooltip");
        domEle.innerText = fullMessage;
        domEle.style.opacity = 1;
        })
    };

    // barblock.addEventListener("mouseleave", e => {
    //     document.getElementById("hover-tooltip").innerHTML = "";
    //     document.getElementById("hover-tooltip").style.opacity = 0;
    // })
    // }
}


export default generateBarChart;

