
// import {select, json, geoPath, geoMercator, tsv, zoom, event} from 'd3';
// import { feature } from 'topojson';
import generateLollipop from './lollipop';
import generatePieChart from './piechart';

import generateBarChart from "./barchart";
import generateLineChart from "./linechart";
function generateMap(data) {
     const svg = d3.select('div.map').append('svg');
     svg
      .attr("width", 800)
      .attr("height", 500)
;

    const projection = d3.geoMercator().scale(140).translate([370,260]);
    const pathGenerator = d3.geoPath().projection(projection);

    const g = svg.append('g');


    // zoom
    svg.call(d3.zoom().scaleExtent([1,5])
        .on("zoom", zoomed));

    function zoomed({transform}) {
    g.attr("transform", transform);
    }


    // generate map and 光标停留时有country name
    Promise.all([
        d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
        d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    ]).then(([tsvData, topoJSONdata]) => {
        const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);
        const countryName = {};
        const countryISO3 = [];
        tsvData.forEach(ele => {
            countryISO3[ele.iso_n3] = ele.adm0_a3;// countryISO3[ele.iso_n3] = ele.adm0_a3;
            countryName[ele.iso_n3] = ele.name;   //id is 'iso3', title is 'name'
        });

        g.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('class','country')
        .attr('d', d => pathGenerator(d))
        .append('title')
        .text(ele => countryName[ele.id])
        .attr('class', 'country-name-text');


        // const claire = [];                                         // only 167/177 can match
        // countryISO3.forEach((countrycode) => {
        //     data.gdp[1].forEach(ele => {
        //         if (ele.countryiso3code === countrycode){
        //             claire.push(countrycode);
        //         }
        //     });

        // });
        //debugger;
         //console.log(d3.selectAll('.country')._groups[0][1]);//.__data__.id
        d3.selectAll('.country')._groups[0].forEach(ele => {
            ele.addEventListener("click", () => {
                d3.selectAll('#pic1').remove();
                d3.select('body').select('div.charts').append('div').attr('width', 500).attr('height', 300).attr('id', 'pic1');
                d3.selectAll('#pic2').remove();
                d3.select('body').select('div.charts').append('div').attr('width', 500).attr('height', 300).attr('id', 'pic2');
                
                //alert(countryISO3[ele.__data__.id]);
                const worldDataButton = document.getElementById('world-data');
                worldDataButton.style.opacity = 1;
                worldDataButton.style.visibility = 'visible';
                generateBarChart(data.gdp[1],countryISO3[ele.__data__.id]);
                generateLineChart(data.gdp_growth[1],countryISO3[ele.__data__.id]);  //.concat(data.pop_growth[1])
            })
        })



    });

    document.getElementById('world-data').addEventListener('click', e => {
        d3.selectAll('#pic1').remove();
        d3.select('body').select('div.charts').append('div').attr('width', 500).attr('height', 300).attr('id', 'pic1');
        d3.selectAll('#pic2').remove();
        d3.select('body').select('div.charts').append('div').attr('width', 500).attr('height', 300).attr('id', 'pic2');
        
        const worldDataButton = document.getElementById('world-data');
        // worldDataButton.style.opacity = 0;
        // worldDataButton.style.visibility = 'hidden';

        generateLollipop(data.gdp[1]);
        generatePieChart();
    })
}

export default generateMap;