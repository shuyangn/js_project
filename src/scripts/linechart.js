var salesData = [
    {year:'2012',Qty:12},
    {year:'2013',Qty:14},
    {year:'2014',Qty:16},
    {year:'2015',Qty:20},
    {year:'2016',Qty:25},
    {year:'2017',Qty:30},
    {year:'2018',Qty:20},
    {year:'2019',Qty:14},
    {year:'2020',Qty:9},
    {year:'2021',Qty:5},
];


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
               .domain([d3.min(salesData, function(d){return d.year;}), d3.max(salesData, function(d){return d.year;})])  //d3.extent(salesData, function(d) { return d.year; })
               .range([0, width]);
svg.append('g')
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(x));

var y = d3.scaleLinear()
          .domain([0, d3.max(salesData, function(d){return d.Qty;})])
          .range([height, 0]);

svg.append('g')               
   .call(d3.axisLeft(y));



//line

svg.append('path')
   .datum(salesData)
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

