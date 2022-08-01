import generateMap from "./scripts/map";
import getData from "./scripts/data";
import generateLollipop from './scripts/lollipop';
import generatePieChart from './scripts/piechart';
import generateTop15Race from './scripts/top15race';

document.addEventListener("DOMContentLoaded", () => {
    getData()
        .then((data) => {
            // debugger
            generateLollipop(data.gdp[1]);
            generatePieChart();
            generateMap(data);   //data.gdp[1]   all gdp elements
            generateTop15Race(data.gdp_top_15[1]);
        });
   
    
});








