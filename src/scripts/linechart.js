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
//     var lineData = [];
//             draw_data.forEach(ele => {
//                 debugger
//             if (ele.countryiso3code === draw_id){
//                 if (ele.indicator.id === 'NY.GDP.MKTP.KD.ZG'){
//                         lineData.filter((ld ,i) => {
//                                 if (ld.year === ele.year){
//                                         lineData[i].gdp_val = ele.value;
//                                 } else {
//                                         let temp = {};
//                                         temp.year = ele.date;
//                                         temp.gdp_val = ele.value;
//                                         lineData.push(temp);
//                                 }
//                         })
                        
//                 };
//                 if (ele.indicator.id === 'SP.POP.GROW'){
//                         lineData.forEach((ld ,i) => {
//                                 if (ld.year === ele.year){
//                                         lineData[i].pop_val = ele.value;
//                                 } else {
//                                         let temp = {};
//                                         temp.year = ele.date;
//                                         temp.pop_val = ele.value;
//                                         lineData.push(temp);
//                                 }
//                         })
                        
//                 };
                
//             }
//             });
//             debugger
//             console.log(lineData);


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
                .range([0, width]);
    var xAxis = d3.axisBottom(x);

    svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .attr('class','xxAxis');
    

    var y = d3.scaleLinear()
            .range([height, 0]);

    var yAxis = d3.axisLeft(y);

    svg.append('g')
       .attr('class','yyAxis');          




    //line
    function update(data) {

        // Create the X axis:
        x.domain([d3.min(data, function(d){return d.year;}), d3.max(data, function(d){return d.year;})])  //d3.extent(lineData, function(d) { return d.year; })
        svg.selectAll(".xxAxis").transition()
          //.duration(3000)
          .call(xAxis);
      
        // create the Y axis
        y.domain([d3.min(lineData, function(d){return d.Qty;})-5, d3.max(lineData, function(d){return d.Qty;})+5])
        svg.selectAll(".yyAxis")
          //.transition()
          //.duration(3000)
          .call(yAxis);
      
        // Create a update selection: bind to the new data
        var u = svg.selectAll(".lineTest")
          .data([data], function(d){ return d.year });
      
        // Updata the line
        u
          .enter()
          .append("path")
          .attr("class","lineTest")
          .merge(u)
          .transition()
          .duration(800)
          .attr("d", d3.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(d.Qty); }))
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2.5)
        
        svg.append('text')
        .attr('y',-20)
        .attr('x', 85)
        .text(current_country + ' GDP growth (annual %)');
      }
      

      update(lineData)






}
export default generateLineChart;
