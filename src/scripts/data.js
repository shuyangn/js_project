async function getGDP(gdp_url = 'https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?date=2012:2021&format=json') {
    const response = await fetch(gdp_url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const gdp = await response.json();
    return gdp;
}


// async function getGDPGrowth(gdp_growth_url = 'https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.KD.ZG?date=2012:2021&format=json') {
//     const response = await fetch(gdp_growth_url);
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     const gdp_growth = await response.json();
//     return gdp_growth;
// }

export default getGDP;

// invoking our getData funciton

