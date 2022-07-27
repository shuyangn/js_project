function generateLollipop(draw_data){
    var lolData = [];
    var top15 = ['USA','CHN','JPN','DEU','IND','GBR','FRA','ITA','BRA','CAN','KOR','RUS','AUS','ESP','MEX'];
            draw_data.forEach(ele => {
            if (ele.date === '2021' && (top15.includes(ele.countryiso3code))){
                let temp = {};
                temp.country = ele.country.value;
                temp.val = ele.value / 1000000000000;
                lolData.push(temp);
            }
            });

    var margin = {top: 50, right: 25, bottom: 18, left: 25},
            width = 450 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
    var svg = d3.select("#svg4")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    
    lolData.sort(function(b, a) {
        return a.val - b.val;
        });
    //console.log(lolData)

    var x = d3.scaleLinear()
              .domain([0,d3.max(lolData, function(d){return d.val})+3])
              .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    

    var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(lolData.map(function(d) { return d.country; }))
    .padding(1);
    svg.append("g")
    .call(d3.axisLeft(y))
    
    //line
  svg.selectAll("myline")
    .data(lolData)
    .enter()
    .append("line")
        .attr("x1", x(0))
        .attr("x2", x(0))
        .attr("y1", function(d) { return y(d.country); })
        .attr("y2", function(d) { return y(d.country); })
        .attr("stroke", "#575757")

    svg.selectAll("mycircle")
    .data(lolData)
    .join("circle")
        .attr("cx", x(0))
        .attr("cy", function(d) { return y(d.country); })
        .attr("r", "7")
        .style("fill", "#b3de69")
        .attr('class','lol-circle')
        

    svg.selectAll("circle")
    .transition()
    .duration(2000)
    .attr("cx", function(d) { return x(d.val); })
    
    svg.selectAll("line")
    .transition()
    .duration(2000)
    .attr("x1", function(d) { return x(d.val); })
    
    svg.append('text')
        .attr('y',-20)
        .attr('x', 45)
        .text('World GDP Ranking 2021 TOP 15 ($trillion)')
        .style('font-size', 15)
        .style('font-weight', 900)
}

export default generateLollipop;