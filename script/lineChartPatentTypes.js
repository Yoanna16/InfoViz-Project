// title of line chart
let typesChartTitle = "Patent applications in % of all countries";

// data that will be displayed {x: year, y: amount}
let dataType_A = [];
let dataType_B = [];
let dataType_C = [];
let dataType_D = [];
let dataType_E = [];
let dataType_F = [];
let dataType_G = [];
let dataType_H = [];

// whole data of each patent class {year, amount}
let allDataType_A = [];
let allDataType_B = [];
let allDataType_C = [];
let allDataType_D = [];
let allDataType_E = [];
let allDataType_F = [];
let allDataType_G = [];
let allDataType_H = [];

// list of data that will be displayed
const allDataTypesList = [ dataType_A, dataType_B, dataType_C,
    dataType_D, dataType_E, dataType_F, dataType_G, dataType_H ];

// list of all data; on year change new data will be picked from here
const allDataList = [ allDataType_A, allDataType_B, allDataType_C,
    allDataType_D, allDataType_E, allDataType_F, allDataType_G, allDataType_H ];

// all new datasets are being created here
const dataTypes = [
    createDataType("A", dataType_A, ['rgb(119, 165, 165)']),
    createDataType("B", dataType_B, ['rgb(139, 214, 254)']),
    createDataType("C", dataType_C, ['rgb(56, 176, 255)']),
    createDataType("D", dataType_D, ['rgb(41, 140, 227)']),
    createDataType("E", dataType_E, ['rgb(30, 107, 178)']),
    createDataType("F", dataType_F, ['rgb(20, 76, 132)']),
    createDataType("G", dataType_G, ['rgb(125, 140, 221)']),
    createDataType("H", dataType_H, ['rgb(94, 105, 170)']) ];

// line chart for all patent types
const lineChartPatentTypes = new Chart("lineChartPatentTypes",{
    type: 'line',
    data: {
        labels: getLabel(),
        datasets: dataTypes
    },
    options: {
        display: true,
        responsive: true,
        maintainAspectRatio: false,
        plugins: { title: { display: true, text: typesChartTitle} }
    }
});

// return object {label, data, borderColor}; used for line chart datasets
function createDataType (labelType, dataType, color) {
    return { label: labelType, data: dataType, borderColor: color }; }

// change title of line chart on update / country select
function setPatentTypesTitle (country) {
    typesChartTitle = "Patent applications in % of " + country;
    lineChartPatentTypes.options.plugins.title.text = typesChartTitle; }

/* ------------------------------------------- filter data ------------------------------------------------------ */

// return data of selected country
function filterDataByCountry (data, country) {
    return data.filter( (d) => { return d.country === country; } ); }

// return data of a specific patent type
function filterDataByType (data, type) {
    return data.filter( (d) => { return d.class === type; } ); }

// push {x: year, y: amount} of years that should be displayed to each data type array
function filterByYearAll (data, target) {
    for (let d of data) {
        for (let i = 0; i <= 10; i++) { let date = getLabel()[i];
            if (date === d.year) { target.push( {x: d.year, y: d.amount} ); } } } }

/* --------------------------------------------- get data ------------------------------------------------------- */

// calculate percentage of all patent types and adjust data of all types
function calculatePercentageTypes () {
    allDataTypesList.forEach((data) => {
        for (let i = 0; i < data.length; i++) {
            data[i].y = (data[i].y * 100 / getCountryValues()[i].y).toFixed(2); } }); }

// push {year, amount} of all years to whole data types arrays
function pasteAllData (data, target) {
    data.forEach((element) => { target.push(
        {year: parseInt(element.year, 10), amount: parseInt(element.amount, 10)} ); }); }

// fill up all datasets with {year: year, amount: 0} if no patents were applied in a specific year
function fillUpYears (target, years) {
    years.forEach((year) => {
        for (let i = 0; i < target.length; i++) {
            if (target[i].year === year) { break; }
            if (target[i].year > year) { target.splice(i, 0, {year: year, amount: 0} ); break; } } }); }

// init datasets & calculate percentage
function setupData (data, types) {

    let dataType = 0;
    types.forEach((type) => {
        pasteAllData( filterDataByType(data, type.class), allDataList[dataType] );
        dataType += 1; });

    for (let dataElement of allDataList) { fillUpYears(dataElement, getYears()); }

    for (let i = 0; i < allDataList.length; i++) {
        filterByYearAll(allDataList[i], allDataTypesList[i]); }

    calculatePercentageTypes();
}

// get and set datasets of a selected country & update line chart
function getDataForLineChartTypes (country, data, types) {
    setPatentTypesTitle( getCurrentCountry() );
    let filteredCountry = filterDataByCountry(data, country);
    setupData(filteredCountry, types);
    lineChartPatentTypes.update();
}

// get and set datasets of all countries & update line chart
function getAllDataForLineChartTypes (data, types) {
    setPatentTypesTitle("all countries");
    setupData(data, types);
    lineChartPatentTypes.update();
}

/* ------------------------------------------- update data ----------------------------------------------------- */

// updates data of a patent type; already loaded data is being picked from corresponding whole dataset
function updateDataType (data, allValues, yearPosition, space) {
    for (let i = 0; i <= 10; i++) {
        data[i].x = allValues[yearPosition - 5 + i + space].year;
        data[i].y = allValues[yearPosition - 5 + i + space].amount; } }

// updates data of all patent type datasets that should be displayed
function updatePatentTypesData (date, space) {
    for (let i = 0; i < allDataTypesList.length; i++) {
        updateDataType(allDataTypesList[i], allDataList[i], getYearPosition (date), space); } }

// datasets are being updated, percentage calculated & line chart updated
function updatePatentTypes (date) {
    let space = setSpace (date);
    updatePatentTypesData (date, space);
    calculatePercentageTypes();
    lineChartPatentTypes.update(); }

/* ------------------------------------------- reset data ------------------------------------------------------- */

// reset of all data
function resetDataTypes () {
    for (let dataTypes of allDataTypesList) { dataTypes.length = 0; }
    for (let allData of allDataList) { allData.length = 0; }
    return true; }