import generateMap from "./scripts/map";
import getData from "./scripts/data";
import generateBarChart from './scripts/barchart';
import generateLineChart from './scripts/linechart';


document.addEventListener("DOMContentLoaded", () => {
    var whole_data;
    // console.log(whole_data);
    getData()
        .then((data) => {
            whole_data = data;//console.log(data);
            
        });
    console.log(whole_data);
    generateMap();
    generateBarChart();
    generateLineChart();
    
});








