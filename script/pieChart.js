// all patent types which will be displayed on y-axis
let pieChartLabels = [];


// pie chart title
let pieChartTitle = "Distribution of patent applications in " + getDate();

// label for selected country dataset
let datasetLabel = "choose country";

// list [int] of all patents of the current / selected year of all countries but the selected one
let pieChartDataOtherCountries = [];

// list [int] of all patents of the current / selected year of the selected country
let pieChartDataCountry = [];

// dataset of other countries
const datasetOtherCountries = {
    label: 'average',
    data: pieChartDataOtherCountries,
    backgroundColor: ['rgb(119, 165, 165)',
        'rgb(139, 214, 254)',
        'rgb(56, 176, 255)',
        'rgb(41, 140, 227)',
        'rgb(30, 107, 178)',
        'rgb(20, 76, 132)',
        'rgb(125, 140, 221)',
        'rgb(94, 105, 170)',
        'rgb(64, 71, 121)'],
    weight: 1,

}

// dataset of current / selected country
const datasetCountry = {
    label: datasetLabel,
    data: pieChartDataCountry,
    backgroundColor: ['rgb(89, 145, 145)',
        'rgb(119, 194, 254)',
        'rgb(36, 156, 255)',
        'rgb(21, 120, 207)',
        'rgb(10, 87, 158)',
        'rgb(0, 56, 112)',
        'rgb(105, 120, 201)',
        'rgb(74, 85, 150)',
        'rgb(44, 51, 101)'
    ],
    weight: 4,


}

// dataset
const data = [ datasetOtherCountries ];

// pie chart displayed below line chart
const pieChart = new Chart("myPieChart",{

    type: 'pie',
    data: {
        labels: pieChartLabels,
        datasets: data
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: { display: true, text: pieChartTitle},
            legend: {position: 'bottom', align: 'start'},
        },
        radius: 200,
    }
});

// add all labels to pie chart
function initPieChartLabel (types) { for (let type of types) { pieChartLabels.push( getDefinition(type.class) ); } }

// update label of dataset of selected country
function updatePieDatasetLabel () { datasetLabel = getCurrentCountry(); datasetCountry.label = datasetLabel; }

// update pie chart title based on selected year
function updatePieChartTitle () { pieChartTitle = "Distribtion of patent applications in " + getDate();
    pieChart.options.plugins.title.text = pieChartTitle;

}

// push values of a data set to a pie chart list that will be displayed in pie chart
function initPieChartData (data, chart) { data.forEach((element) => { chart.push(element.value) }); }

// return a list of a data set that was sorted out by year
function initPieData (data, types, year) {
    let selectedData = [];
    types.forEach((type) => {selectedData.push( countType(data, type.class, year) )})
    return selectedData;
}

// return a list of a data set that was sorted out by year and country
function initPieDataCountry (data, types, year, country) {
    let selectedData = [];
    data.forEach((element) => { if (element.country === country) { selectedData.push(element); }});
    return initPieData(selectedData, types, year);
}

// remove types with amount = 0 of a country
function removeEmptyTypes () {
    for (let i = 0; i < pieChartDataCountry.length; i++) {
        if (pieChartDataCountry[i] === 0) {
            pieChartDataCountry.splice(i,1); pieChartDataOtherCountries.splice(i,1);
            pieChartLabels.splice(i,1); i -= 1; } }
}

// average of patents of a type
function calculateAverage () {
    let countiesAmountWithoutSelected = getAmountCountries();
    for (let i = 0; i < pieChartDataOtherCountries.length; i++) {
        pieChartDataOtherCountries[i] =
            Math.round(pieChartDataOtherCountries[i] / countiesAmountWithoutSelected);
    }
}

// calculate percentage of all types even though they are not shown
function calculatePercentage () {
    percentage(sum(pieChartDataCountry), pieChartDataCountry);
    percentage(sum(pieChartDataOtherCountries), pieChartDataOtherCountries);
}

// summarise all values of an array
function sum (array) { let amount = 0; array.forEach((value) => { amount += value; }); return amount; }

// calculate percentage of a dataset
function percentage (sum, data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i] > 0) { data[i] = (data[i] * 100 / sum).toFixed(2); } }
}

// data received from requested .csv
function getDataForPieChart (country, data, types, year) {
    // update title and label
    updatePieChartTitle(); updatePieDatasetLabel();
    // init data
    initPieChartLabel (types);
    initPieChartData ( initPieData(data, types, year), pieChartDataOtherCountries );
    initPieChartData ( initPieDataCountry(data, types, year, country), pieChartDataCountry );
    // correct data, calculate percentage & average -> remove type with amount = 0
    calculateAverage(); calculatePercentage(); removeEmptyTypes();
    pieChart.update();

}

// data received from all countries .csv
function getAllCountriesDataForPieChart (data, types, year) {
    // update title and label
    updatePieChartTitle(); updatePieDatasetLabel();
    // init data
    initPieChartLabel (types);
    initPieChartData ( initPieData(data, types, year), pieChartDataOtherCountries );
    // calculate percentage & average
    calculateAverage(); calculatePercentage();
    pieChart.update();

}

// check data and return {class: String, value: int} of requested type and year
function countType (data, type, year) {
    let amount = 0;
    for (let element of data) {
        if (element.class === type && parseInt(element.year, 10) === year) {
            amount += parseInt(element.amount);} }
    return {class: type, value: amount};
}

// load new data based on selected year
function updatePieChartData () { getTypesCSVPie( getCurrentCountry(), getAllPatentTypes() ); }

// remove or add dataset if a listed / not listed country was clicked
function shiftUnshiftDataset (country) { data.length = 0;
    if ( check(country) ) { data.push( datasetOtherCountries,datasetCountry ); }
    else { data.push(datasetOtherCountries); }
}

// reset of all data
function resetTypesData () {
    pieChartLabels.length = 0;
    pieChartDataCountry.length = 0;
    pieChartDataOtherCountries.length = 0;
    pieChart.update();

    return true;
}