/* --------------------------------------- country chart --------------------------------------------------------- */
// country name and iso 2 code
let countryCSV = "";
function getCurrentCountry () { return countryCSV; }
let countryCSVCode = "";
//function getCurrentCountryCode () { return countryCSVCode; }

// a list of all country codes {country: String, code: String}
const country_code = [];
//function getAllCountriesCodes () { return country_code; }

// path to folder of all .csv files of all countries
const csvRequestCountries = "./data/csv/country/from/";
function getCSVCountriesPath () { return csvRequestCountries; }

// return iso 2 code of a country / return "" if not found
function getCountryCode (country) {
    for (let c of country_code) { if (c.country === country) { return c.code; } } return ""; }

// return whether a country was added or not
function check (country) {
    for (let c of country_code) { if (c.country === country) { return true; } } return false; }

// initialise country label of chart and updates country name and code
function initChartCountryLabel (country) {
    countryCSV = country; countryCSVCode = getCountryCode(country); }

/* ----------------------------------------- types chart --------------------------------------------------------- */
// number of listed counties in loaded dataset
let amountCountries = 0;
function getAmountCountries () { return amountCountries; }

// a list of all patent types {class: String, definition: String}
const patent_types = [];
function getPatentTypes () { return patent_types; }

// file name of all patent years, counties, types and amount
const allPatentTypes = "year_country_class_amount";
function getAllPatentTypes () { return allPatentTypes; }

// file name of all patent years, types and amount
const allPatentsAmount = "year_class_amount";
function getAllPatentsAmount () { return allPatentsAmount; }

// path to folder of all .csv files of all patent types
const csvRequestTypes = "./data/csv/types/from/";
function getCSVTypesPath () { return csvRequestTypes; }

// adds {class: String, definition: String} to patent types list
function initPatentTypes (data) {
    for (let d of data) { patent_types.push( {class: d.class, definition: d.definition} ); } }

// return definition of a patent type
function getDefinition (type) {
    for (let patent of patent_types) { if (type === patent.class) { return patent.definition; } }
    return "not found"; }

/* ------------------------------------- country & types chart --------------------------------------------------- */

// adds {country, code} to country code list + count amount of added countries
function initDataConst (data) {
    for (let d of data) { if (d.added === "true") {
        country_code.push( {country: d.country, code: d.code} ); amountCountries += 1; } } }

// gets all data of all countries and patent types and passes it to both line charts
function passAllData () { d3.csv(getCSVTypesPath() + getAllPatentsAmount() + ".csv", (data) => {
        if ( resetAllData() ) { passDataToChart( data , "All countries");
            passAllDataToTypesChart(data); } }); }

// resets all data of line chart countries & line chart patent types
function resetAllData () { if ( resetDataCountries() ) { return resetDataTypes(); } return false; }