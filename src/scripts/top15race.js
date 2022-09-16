function generateTop15Race(data) {
    var raceData = [];

    data.forEach(ele => {
        let temp = {};
        temp.country = ele.country.value;
        temp.year = ele.date;
        temp.val = (ele.value / 1000000000).toFixed(2);
        raceData.push(temp);
    });

    data = d3.group(data, d => d.country)
    // console.log(data)

}

export default generateTop15Race;