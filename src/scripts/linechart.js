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

var svg = d3.select("#svg3");
var padding = {top:50, right:0, bottom:18, left:50};

var chartArea = {
    "width":parseInt(svg.style("width"))-padding.left - padding.right,
    "height":parseInt(svg.style("height"))-padding.top - padding.bottom
};

var yScale = d3.scaleLinear()
               .domain([0, d3.max(salesData, function(d,i){return d.Qty})])
               .range([chartArea.height, 0]).nice();
var xScale = d3.scaleBand()
               .domain(salesData.map(function(d){return d.year}))
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


