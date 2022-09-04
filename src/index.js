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




        {
            // Open Information Modal
            document.getElementById("info-button").addEventListener("click",(event)=>{
                event.preventDefault();
                document.getElementsByClassName("info-modal")[0].style.display = "block";
            })
            
            // 'X' out of Information Modal
            document.getElementsByClassName("close-info")[0].addEventListener("click",(event)=>{
                event.preventDefault();
                document.getElementsByClassName("info-modal")[0].style.display = "none";
            })
    
            // 'X' out of Information Modal if the black backdrop is clicked
            document.getElementsByClassName("info-position")[0].addEventListener("click",(event)=>{
                event.preventDefault()
                event.stopPropagation();
                if (event.target === event.currentTarget){
                    document.getElementsByClassName("info-modal")[0].style.display = "none";
                }
            })
    
        }
});








