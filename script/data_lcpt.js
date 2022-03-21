/* ----------------------------------------- types chart --------------------------------------------------------- */
// load new types .csv file of a country and pass new data to patent types line chart
function getTypesCSV (country, file) { if (check(country)) {
    d3.csv( requestTypesCSV(file), (data) => {
        if ( resetDataTypes() ) { passDataToTypesChart(data, country); } }); } }

// return path of .csv file for patent types
function requestTypesCSV (file) { return getCSVTypesPath() + file + ".csv"; }

// pass new data to patent types line chart
function passDataToTypesChart (data, country) {
    getDataForLineChartTypes ( getCountryCode(country), data, getPatentTypes() ); }

// pass all data to patent types line chart
function passAllDataToTypesChart (data) {
    getAllDataForLineChartTypes (data, getPatentTypes() ); }