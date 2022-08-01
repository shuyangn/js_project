function generateTop15Race(data) {
    var raceData = [];

    data.forEach(ele => {
        let temp = {};
        temp.country = ele.country.value;
        temp.year = ele.date;
        temp.val = ele.value / 1000000000000;
        raceData.push(temp);
    });


}

export default generateTop15Race;