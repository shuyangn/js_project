async function getGDP(gdp_url = 'https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?per_page=3000&date=2012:2021&format=json') {
    const response = await fetch(gdp_url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const gdp = await response.json();
    return gdp;
}


async function getGDPGrowth(gdp_growth_url = 'https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.KD.ZG?per_page=3000&date=2012:2021&format=json') {
    const response = await fetch(gdp_growth_url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const gdp_growth = await response.json();
    return gdp_growth;
}

async function getPopulationGrowth(pop_growth_url = 'https://api.worldbank.org/v2/country/all/indicator/SP.POP.GROW?per_page=3000&date=2012:2021&format=json') {
    const response = await fetch(pop_growth_url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const pop_growth = await response.json();
    return pop_growth;
}

async function getGDPPerCapita(gdp_per_capita_url = 'https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?per_page=3000&date=2012:2021&format=json') {
    const response = await fetch(gdp_per_capita_url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const gdp_per_capita = await response.json();
    return gdp_per_capita;
}

async function getData() {
    const data = {};
    data['gdp'] = await getGDP();
    data['gdp_growth'] = await getGDPGrowth();
    data['pop_growth'] = await getPopulationGrowth();
    data['gdp_per_capita'] = await getGDPPerCapita();
    // return await data;
    return data;
}

export default getData;
