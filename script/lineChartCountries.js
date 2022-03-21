// title of line chart
let countriesTitle = "All countries";

// current values {x: year, y: amount} for chart
let countryValues = [];
function getCountryValues () { return countryValues; }

// {year, amount} for all years
let countryAllValues = [];

// ChartJS graphic
const lineChartCountries = new Chart("lineChartCountries", {
    type: "line",
    data: {
        labels: getLabel(),
        datasets: [{
            borderColor: "#599191",
            data: countryValues,
            label: "all countries"
        }]
    },
    options: {
        display: true,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: { display: true, text: countriesTitle},
            legend: { display: false }
        }
    }
});

/* --------------------------------------------- set data ------------------------------------------------------- */

// change title of line chart on update / country select
function setCountriesTitle (country) {
    countriesTitle = country;
    lineChartCountries.options.plugins.title.text = countriesTitle; }

// return index of year from all values
function getYearPosition (year) {
    for (let element of countryAllValues) {
        if (element.year === year) { return countryAllValues.indexOf(element); } } }

// picks years to display and initialise xyValues
function setXYValues (startDate) {
    let yearPosition = getYearPosition (startDate);
    for (let j = 0; j <= 10; j++) {
        countryValues.push(
            {x: countryAllValues[yearPosition + j].year, y: countryAllValues[yearPosition + j].amount} ); } }

// initialise chart on first load
function setAllValues (data) {
    for (let i in data) { countryAllValues.push( {year: data[i].year, amount: data[i].amount} ); }
    setXYValues ( getLabel()[0] ); }

// set label of countries line chart & set chart data (country name and code)
function setCountryLabel (country) {
    setCountriesTitle(country);
    lineChartCountries.data.datasets[0].label = country; initChartCountryLabel(country); }

/* --------------------------------------------- get data ------------------------------------------------------- */

// returns {year, amount}
function filterDataByYear(data, year) {
    let amount = 0; for (let item of data) {
        if (item.year.includes(year)) { amount = amount + parseInt(item.amount, 10); } }
    return {year: year, amount: amount}; }

// returns an array with all years & amount of patents
function checkAllYears (data) { let array = [];
    getYears().forEach((year) => { array.push(filterDataByYear(data, year)); }); return array; }

// data received from requested .csv and gets filtered by year and amount; allValues are being filled
function getDataForCountriesChart (data, country) {
    setCountryLabel ( country );
    setChartLabel ( getDate() );
    setAllValues ( checkAllYears(data) );
    lineChartCountries.update(); }

/* ------------------------------------------- update data ----------------------------------------------------- */

// update chart for selected date
function updateData (date) {
    let space = setSpace (date);
    updateChartLabel (date, space);
    updateChartData (date, space);
    lineChartCountries.update(); }

// update chart data y-axis
function updateChartData (date, space) {
    let yearPosition = getYearPosition (date);
    for (let i = 0; i <= 10; i++) {
        countryValues[i].x = countryAllValues[yearPosition - 5 + i + space].year;
        countryValues[i].y = countryAllValues[yearPosition - 5 + i + space].amount; } }

/* ------------------------------------------- reset data ------------------------------------------------------- */

// reset all data of lineChartCountries chart
function resetDataCountries () {
    countryValues.length = 0;
    countryAllValues.length = 0;
    return resetDataLineCharts(); }