/* --------------------------------------- country chart --------------------------------------------------------- */
// load new .csv file of a country and pass new data to country line chart
function getCSV (country) { if ( check(country) ) {
    d3.csv( requestCSV(country), (data) => {
        if ( resetDataCountries() ) { passDataToChart(data, country) } } ); }
    else { passAllData(); } }

// return path + name of new .csv file
function requestCSV (country) { return getCSVCountriesPath() + getCountryCode (country) + ".csv"; }

// pass new data to country line chart
function passDataToChart (data, country) { getDataForCountriesChart (data, country); }