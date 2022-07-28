import generateMap from "./scripts/map";
import getData from "./scripts/data";
import generateLollipop from './scripts/lollipop';
import generatePieChart from './scripts/piechart';
document.addEventListener("DOMContentLoaded", () => {
    getData()
        .then((data) => {
            //debugger
            generateLollipop(data.gdp[1]);
            generatePieChart();
            generateMap(data);   //data.gdp[1]   all gdp elements
            
            // const claire = [];
            // data.gdp[1].forEach(ele => {
            //     if (ele.countryiso3code === 'AFE'){
            //         claire.push(ele.value);
            //     }
            // });

            //generateBarChart(data.gdp[1],);
            //generateLineChart();
        });
   
    
});








