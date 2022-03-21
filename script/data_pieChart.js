/* ---------------------------------------------  pie chart  ---------------------------------------------------- */

// load new types .csv file of a country and pass new data to pie chart
function getTypesCSVPie (country, file) { if (check(country)) {
    d3.csv(requestTypesCSV(file), (data) => {
        if (resetTypesData()) { passDataToPieChart(country, data); } }); }
else { loadAllCountriesPie(); }
}

// pass new data to pie chart
function passDataToPieChart (country, data) {
    getDataForPieChart ( getCountryCode(country), data, getPatentTypes(), getDate() ); }

// load all data of all counties and pass to pie chart
function loadAllCountriesPie () {
    d3.csv(requestTypesCSV( getAllPatentsAmount() ), (data) => {
        if ( resetTypesData() ) { passAllCountriesToPieChart(data); } });
}

// pass new data to pie chart
function passAllCountriesToPieChart (data) {
    getAllCountriesDataForPieChart ( data, getPatentTypes(), getDate() ); }