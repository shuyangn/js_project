function generateLineChart(draw_data, draw_id) {
    var lineData = [];
            draw_data.forEach(ele => {
            if (ele.countryiso3code === draw_id){
                let temp = {};
                temp.year = ele.date;
                temp.Qty = ele.value;
                lineData.push(temp);
            }
            });

    // svg.scale(199);
    var margin = {top: 50, right: 25, bottom: 18, left: 25},
        width = 330 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;
    ;
    var svg = d3.select("#svg3")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
                .domain([d3.min(lineData, function(d){return d.year;}), d3.max(lineData, function(d){return d.year;})])  //d3.extent(lineData, function(d) { return d.year; })
                .range([0, width]);
    svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
            .domain([d3.min(lineData, function(d){return d.Qty;})-5, d3.max(lineData, function(d){return d.Qty;})+5])
            .range([height, 0]);

    svg.append('g')               
    .call(d3.axisLeft(y));



    //line

    svg.append('path')
    .datum(lineData)
    .attr('fill','none')
    .attr('stroke','steelblue')
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
                    .x(function(d) { return x(d.year) })
                    .y(function(d) { return y(d.Qty) })
            )

    svg.append('text')
        .attr('y',-20)
        .attr('x', 85)
        .text('GDP growth (annual %)');
}
export default generateLineChart;
